import { useCallback, useLayoutEffect, useState } from "react";
import { Cesium } from "@/cesium-tools";

export default function App() {
  const [viewer, setViewer] = useState();

  useLayoutEffect(() => {
    const viewer = new Cesium.Viewer("cesiumContainer", {
      infoBox: false,
      // terrainProvider: Cesium.createWorldTerrain()
    });
    setViewer(viewer);
    return () => viewer.destroy();
  }, []);

  const removeEntity = useCallback((entity) => {
    viewer.entities.removeAll();
  }, []);

  return <div id="cesiumContainer" className={"flex-1"}></div>;
}
