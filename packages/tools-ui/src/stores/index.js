import { useContext, createContext } from "react";
import global from "./global";
import map from "./map";
import codeEdit from "./code-edit";

const storesContext = createContext({
  global,
  map,
  codeEdit,
});

export default function useStore() {
  return useContext(storesContext);
}
