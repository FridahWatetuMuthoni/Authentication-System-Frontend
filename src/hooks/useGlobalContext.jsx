import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

//global context
function useGlobalContext() {
  return useContext(GlobalContext);
}

export default useGlobalContext;
