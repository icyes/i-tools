import { useLayoutEffect } from "react";
import { Cesium } from "@/cesium-tools";
import useStore from "@/stores/index.js";
import classnames from "classnames";
import "../index.css";

export default function App(props) {
  const { map, codeEdit } = useStore();
  useLayoutEffect(() => {
    const viewer = new Cesium.Viewer("cesiumContainer", {
      infoBox: false,
    });
    map.setViewer(viewer);
    codeEdit.setMap(map);
    return () => viewer.destroy();
  }, []);

  return (
    <div
      id="cesiumContainer"
      className={classnames({ hidden: !props.show }, "flex-1")}
    ></div>
  );
}
