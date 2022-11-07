import { makeAutoObservable } from "mobx";
class Global {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export default new Global();
