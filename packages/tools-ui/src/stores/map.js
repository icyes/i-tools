import { makeAutoObservable } from "mobx";
class Map {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  viewer = null;

  setViewer(viewer) {
    this.viewer = viewer;
  }

  clear() {
    this.viewer.entities.removeAll();
  }
}

export default new Map();
