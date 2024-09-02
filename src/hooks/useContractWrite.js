import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import { useEffect } from "react";
import { toast } from "react-toastify";

import {
  notifyError,
  notifyInfo,
  notifySuccess,
} from "../componets/swap_components/Toasts.jsx";
import { contracts } from "../utils/blockchain.js";
import { mainnet } from "viem/chains";
import { structuralSharing } from "wagmi/query";

const { XDAO, erc20Abi } = contracts;

export const useContractWrite = ({ address, abi, functionName, args }) => {
  const config = {
    address,
    abi,
    functionName,
    args,
    // chain: mainnet,
    
    __mode: 'prepared',

  };
  const chainId = useChainId();

  const { data, status, error, isPending, isSuccess, writeContract } =
    useWriteContract(config);

  const { status: txStatus } = useWaitForTransactionReceipt({
    // confirmations: 0n, 
    hash: data,
  });



  const write = async () => {
    // console.log("writeContract", config, chainId);
    writeContract(config);
  };

  useEffect(() => {
    if (error) {
      const message = error.message.includes("User rejected")
        ? "Транзакция отклонена"
        : error.message.includes("The total cost")
        ? "Недостаточно средств на балансе"
        : error.message.includes("Connector not connected")
        ? "Требуется подключение кошелька"
        : error.message.includes("allowance")
        ? "Необходимо одобрить токен"
        : error.message.includes("unknown error")
        ? "Неизвестная ошибка"
        : error.message;
      toast.dismiss();
      notifyError(message);
      console.error(error);
      console.debug(data);
      return;
    }

    const timeout = setTimeout(() => {
      if (isPending) {
        toast.dismiss();
        notifyInfo("Подпишите транзакцию в кошельке");
      }
    }, 500);

    if (isSuccess && txStatus !== "success") {
      toast.dismiss();
      notifySuccess("Транзакция отправлена на обработку");
    }

    if (txStatus === "success") {
      toast.dismiss();
      notifySuccess("Транзакция успешно завершена");
    }

    return () => clearTimeout(timeout);
  }, [error, isPending, isSuccess, txStatus]);

  return {
    data,
    status,
    txStatus,
    error,
    write,
  };
};

export const useBuyWrite = ({ crowdModule, tokenAddress, amount }) =>
  useContractWrite({
    address: crowdModule,
    abi: XDAO.abi,
    functionName: "buy",
    args: [tokenAddress, amount, false],
  });

export const useApproveWrite = ({ tokenAddress, spender, amount }) =>
  useContractWrite({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "approve",
    args: [spender, amount],
    // chainId: 1,
    // structuralSharing: false

  });
