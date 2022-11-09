import { useContext, createContext } from "react";
import global from "./global";
import map from "./map";
import codeEdit from "./code-edit";
import stage from "./stage";

const storesContext = createContext({
  global,
  map,
  codeEdit,
  stage,
});

export default function useStore() {
  return useContext(storesContext);
}
