import "./index.scss";
import { ReloadOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import * as Monaco from "monaco-editor/esm/vs/editor/editor.main.js";
import useStore from "@/stores";
import { Button } from "i-antd";

export default function (props) {
  const [monaco, setMonaco] = useState();
  const { codeEdit } = useStore();

  useEffect(() => {
    const monacoInstance = Monaco.editor.create(
      document.getElementById("monacoEdit"),
      {
        height: "100%",
        width: 200,
        value: props.code,
        language: "javascript",
        theme: "vs-light",
      }
    );
    setMonaco(monacoInstance);
    codeEdit.setEditor(monacoInstance);
    return () => {
      codeEdit.dispose(); //使用完成销毁实例
    };
  }, []);

  useEffect(() => {
    const value = typeof props.code === "string" ? props.code : "";
    monaco && monaco.setValue(value);
  }, [props.code]);

  const doRun = useCallback(() => {
    codeEdit.run();
  }, []);

  const doFormat = useCallback(() => {
    codeEdit.format();
  }, []);

  return (
    <div className={"edit-container"}>
      <div className={"edit-tools"}>
        <Button type="primary" icon={<RightCircleOutlined />} size={"mini"}>
          运行
        </Button>
        <Button type="primary" icon={<ReloadOutlined />} size={"mini"}>
          格式化
        </Button>
      </div>
      <div id={"monacoEdit"}></div>
    </div>
  );
}
