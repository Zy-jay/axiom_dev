import { useAccount } from "wagmi"
import { DAOs_DATA, STRATEGI_KEYS } from "../../constants/strategis"
import { useDaoPrice } from "../../hooks/useDaoPrice"
import { useTokenBalance } from "../../hooks/useTokenBalances"
import { toOptionalFixed } from "../../utils/converter"
import { useEffect, useState, useRef } from "react"
import { useStore } from "../../hooks/useStore"

export const DaoBalanceItem = ({ daoKey }) => {
    const isBtcDao = daoKey === STRATEGI_KEYS.btcdao
    const store = useStore()

    const { address } = useAccount()

    const { daoPrice } = useDaoPrice(DAOs_DATA[daoKey].currentDaoAddress, DAOs_DATA[daoKey].lpAddress, DAOs_DATA[daoKey].chainId)

    const { balance } = useTokenBalance(DAOs_DATA[daoKey].lpAddress, address, DAOs_DATA[daoKey].chainId)

    const [isHovered, setIsHovered] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;

        // Обработчики событий
        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        if (element) {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        }

        // Очистка обработчиков при размонтировании
        return () => {
            if (element) {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    useEffect(() => {
        store.setHoveringKey(isHovered ? daoKey : "")
    }, [isHovered])

    useEffect(() => {
        if (balance !== undefined) store.setDaoBalance(daoKey, balance)
    }, [balance])
    useEffect(() => {
        if (daoPrice !== undefined) store.setDaoPrice(daoKey, daoPrice)
    }, [daoPrice])

    const daoBalance = store.daoBalances[daoKey] ?? balance

    return (
        <div ref={elementRef} className="content_item">
            <img src={DAOs_DATA[daoKey].img} alt="" />
            <h3>{DAOs_DATA[daoKey].symbol}: {daoPrice && daoBalance !== undefined ? toOptionalFixed(daoPrice * Number(daoBalance) / 10 ** 18, isBtcDao ? 6 : 2) : "-"}{isBtcDao ? "BTC" : "$"}</h3>
        </div>
    )
}