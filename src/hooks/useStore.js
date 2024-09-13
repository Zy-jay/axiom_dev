import { useContext } from "react";
import { Context } from "../App";

export const useStore = () => {
  const { store } = useContext(Context);
  return store;
};
