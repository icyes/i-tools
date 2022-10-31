import "./index.scss";
import { useCallback, useEffect, useState } from "react";
import * as Monaco from "monaco-editor/esm/vs/editor/editor.main.js";

export default function (props) {
  const [monaco, setMonaco] = useState();

  const options = {
    selectOnLineNumbers: true,
  };

  const onChange = useCallback((val) => {
    console.log("[mLog] val -->", val);
  }, []);

  const editorDidMount = useCallback((back) => {
    console.log("[mLog] back -->", back);
  }, []);

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
    return () => {
      monacoInstance.dispose(); //使用完成销毁实例
    };
  }, []);

  useEffect(() => {
    const value = typeof props.code === "string" ? props.code : "";
    monaco && monaco.setValue(value);
  }, [props.code]);

  return <div className={"edit-container"} id={"monacoEdit"}></div>;
}
