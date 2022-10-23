import "./App.css";
import Menu from "../../../src/view/menu/menu";

function App() {
  useEffect(() => {
    const viewer = new Cesium.Viewer("cesiumContainer", {
      infoBox: false,
      // terrainProvider: Cesium.createWorldTerrain()
    });
    let wyoming = viewer.entities.add({
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          -109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596,
          -104.053011, 43.002989, -104.053011, 41.003906, -105.728954,
          40.998429, -107.919731, 41.003906, -109.04798, 40.998429, -111.047063,
          40.998429, -111.047063, 42.000709, -111.047063, 44.476286, -111.05254,
          45.002073,
        ]),
        height: 100,
        material: Cesium.Color.RED.withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      },
    });
    wyoming.polygon.height = 0;
    wyoming.polygon.extrudedHeight = 250000;
    viewer.flyTo(wyoming);
    /*        var entity = viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
                    ellipse : {
                        semiMinorAxis : 250000.0,
                        semiMajorAxis : 400000.0,
                        material : Cesium.Color.BLUE.withAlpha(0.5)
                    }
                });
                viewer.zoomTo(viewer.entities);

                var ellipse = entity.ellipse; // For upcoming examples
                ellipse.material = new Cesium.GridMaterialProperty({
                    color : Cesium.Color.YELLOW,
                    cellAlpha : 0.2,
                    lineCount : new Cesium.Cartesian2(8, 8),
                    lineThickness : new Cesium.Cartesian2(2.0, 2.0)
                });*/

    /*        var entity = viewer.entities.add({
                    polyline : {
                        positions : Cesium.Cartesian3.fromDegreesArray([-77, 35,
                            -77.1, 35]),
                        width : 5,
                        material : Cesium.Color.RED
                    }});
                viewer.zoomTo(viewer.entities);

                var polyline = entity.polyline
                polyline.material = new Cesium.PolylineGlowMaterialProperty({
                    glowPower : 0.2,
                    color : Cesium.Color.BLUE
                });*/

    return () => {
      viewer.destroy();
    };
  }, []);
  return (
    <div className="App flex">
      <Menu></Menu>
      <div id="cesiumContainer"></div>
    </div>
  );
}

export default App;
