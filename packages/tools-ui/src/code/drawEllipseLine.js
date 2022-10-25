import { Cesium } from "@/Cesium";

export default function fn({ viewer }) {
  var entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
    ellipse: {
      semiMinorAxis: 250000.0,
      semiMajorAxis: 400000.0,
      material: Cesium.Color.BLUE.withAlpha(0.5),
    },
  });
  viewer.flyTo(viewer.entities);

  var ellipse = entity.ellipse; // For upcoming examples
  ellipse.material = new Cesium.GridMaterialProperty({
    color: Cesium.Color.YELLOW,
    cellAlpha: 0.2,
    lineCount: new Cesium.Cartesian2(8, 8),
    lineThickness: new Cesium.Cartesian2(2.0, 2.0),
  });
  return fn;
}
