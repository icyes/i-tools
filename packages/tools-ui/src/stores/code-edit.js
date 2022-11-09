import { makeAutoObservable } from "mobx";

class CodeEdit {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  originCode = "";
  code = "";
  args = {};
  map = null;

  setMap(map) {
    this.map = map;
  }

  setArgs(args) {
    this.args = args;
  }
  layout() {
    setTimeout(() => {
      this.editor && this.editor.layout();
    }, 0);
  }

  run() {
    try {
      this.clear();
      let fn = () => {};
      eval(" fn = " + this.editor.getValue());
      fn(this.args);
    } catch (e) {
      console.log(e);
    }
  }

  setCode(code) {
    this.code = code;
    this.originCode = code;
  }
  updateCode(code) {
    this.code = code;
  }

  reset() {
    this.code = this.originCode;
    this.setValue();
    this.run();
  }

  setValue() {
    if (this.editor) {
      this.editor.setValue(this.code);
      this.format();
    }
  }

  format() {
    this.editor.trigger("anyString", "editor.action.formatDocument"); //自动格式化代码
    // this.editor.getAction('editor.action.formatDocument').run();//自动格式化代码
    this.editor.setValue(this.editor.getValue()); //再次设置
  }

  clear() {
    this.code = "";
    this.map && this.map.clear();
  }

  editor = null;

  setEditor(editor) {
    this.editor = editor;
  }

  dispose() {
    if (this.editor) {
      this.editor.dispose();
      this.editor = null;
    }
  }
}

export default new CodeEdit();
