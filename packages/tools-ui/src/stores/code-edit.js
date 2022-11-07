import { makeAutoObservable } from "mobx";

class CodeEdit {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  code = "";

  setCode(code) {
    this.code = code;
  }

  setValue() {
    this.editor && this.editor.setValue(this.code);
    this.format();
  }

  format() {
    this.editor.trigger("anyString", "editor.action.formatDocument"); //自动格式化代码
    this.editor.setValue(this.editor.getValue()); //再次设置
  }

  clear() {
    this.code = "";
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
