import { useCallback, useLayoutEffect, useState } from "react";
import { Cesium } from "@/cesium-tools";
import useStore from "@/stores/index.js";

export default function App() {
  const { map, codeEdit } = useStore();
  const [viewer, setViewer] = useState();

  useLayoutEffect(() => {
    const viewer = new Cesium.Viewer("cesiumContainer", {
      infoBox: false,
    });
    map.setViewer(viewer);
    codeEdit.setMap(map);
    setViewer(viewer);
    return () => viewer.destroy();
  }, []);

  const removeEntity = useCallback((entity) => {
    viewer.entities.removeAll();
  }, []);

  return <div id="cesiumContainer" className={"flex-1"}></div>;
}
