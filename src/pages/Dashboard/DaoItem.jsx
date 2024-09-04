import { useAccount } from "wagmi"
import { DAOs_DATA, STRATEGI_KEYS } from "../../constants/strategis"
import { useDaoPrice } from "../../hooks/useDaoPrice"
import { useTokenBalance } from "../../hooks/useTokenBalances"
import { toOptionalFixed } from "../../utils/converter"

export const DaoBalanceItem = ({ daoKey }) => {
    const isBtcDao = daoKey === STRATEGI_KEYS.btcdao

    const { address } = useAccount()

    const { daoPrice } = useDaoPrice(DAOs_DATA[daoKey].currentDaoAddress, DAOs_DATA[daoKey].lpAddress, DAOs_DATA[daoKey].chainId)

    const { balance } = useTokenBalance(DAOs_DATA[daoKey].lpAddress, address, DAOs_DATA[daoKey].chainId)

    return (
        <div className="content_item">
            <img src={DAOs_DATA[daoKey].img} alt="" />
            <h3>{DAOs_DATA[daoKey].symbol}: {daoPrice && balance !== undefined ? toOptionalFixed(daoPrice * Number(balance) / 10 ** 18, isBtcDao ? 6 : 2) : "-"}{isBtcDao ? "BTC" : "$"}</h3>
        </div>
    )
}