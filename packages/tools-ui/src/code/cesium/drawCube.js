function fn({ viewer, Cesium }) {
  let entities = viewer.entities.add({
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        -109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596,
        -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429,
        -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429,
        -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073,
      ]),
      height: 100,
      material: Cesium.Color.BLACK.withAlpha(0.3),
      outline: true,
      outlineColor: Cesium.Color.WHITE,
    },
  });
  entities.polygon.height = 0;
  entities.polygon.extrudedHeight = 250000;
  viewer.flyTo(entities);
  return fn;
}

export default {
  name: "画立方体",
  fn,
};
