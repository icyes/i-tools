import { makeAutoObservable } from "mobx";
class Stage {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  codeType = "";

  setCodeType(codeType) {
    this.codeType = codeType;
  }
}

export default new Stage();
