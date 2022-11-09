import CesiumBox from "./cesium-box";
import CanvasBox from "@/view/stage/canvas-box";
import DefaultBox from "@/view/stage/default-box";
import useStore from "@/stores";
import { observer } from "mobx-react";

function Stage() {
  const { stage } = useStore();
  const isShowDef = !["cesium", "canvas"].includes(stage.codeType);

  return [
    <CesiumBox show={stage.codeType === "cesium"} />,
    <CanvasBox show={stage.codeType === "canvas"} />,
    <DefaultBox show={isShowDef} />,
  ];
}

export default observer(Stage);
