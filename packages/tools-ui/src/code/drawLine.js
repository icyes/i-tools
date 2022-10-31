import { Cesium } from "@/cesium-tools";

function fn({ viewer }) {
  var entity = viewer.entities.add({
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([-77, 35, -77.1, 35]),
      width: 5,
      material: Cesium.Color.RED,
    },
  });
  viewer.flyTo(viewer.entities);

  var polyline = entity.polyline;
  polyline.material = new Cesium.PolylineGlowMaterialProperty({
    glowPower: 0.2,
    color: Cesium.Color.BLUE,
  });
  return fn;
}

export default {
  name: "画线",
  fn,
  fnText: `
  var entity = viewer.entities.add({
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([-77, 35, -77.1, 35]),
      width: 5,
      material: Cesium.Color.RED,
    },
  });
  viewer.flyTo(viewer.entities);

  var polyline = entity.polyline;
  polyline.material = new Cesium.PolylineGlowMaterialProperty({
    glowPower: 0.2,
    color: Cesium.Color.BLUE,
  });
  return fn;`,
};
