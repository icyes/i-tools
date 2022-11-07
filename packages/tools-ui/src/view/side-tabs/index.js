import { Tabs } from "i-antd";
import { useCallback, useRef, useState } from "react";
import "./index.scss";
import Menu from "@/view/menu/menu";
import Edit from "@/view/edit";
import useStore from "@/stores";
import { Resizable } from "re-resizable";

export default function App() {
  const { codeEdit } = useStore();

  const resizable = useRef(null);

  const [width, setWidth] = useState({
    code: 500,
    menu: 300,
  });
  const [activeKey, setActiveKey] = useState("menu");
  const onChange = useCallback((val) => {
    setActiveKey(val);
    if (val === "code") {
      codeEdit.setValue();
      resizable.current.updateSize({ width: width.code });
      codeEdit.layout();
    } else {
      resizable.current.updateSize({ width: width.menu });
    }
  }, []);
  const onResizeStop = useCallback(
    (e) => {
      width[activeKey] = e.clientX;
      setWidth(width);
      codeEdit.layout();
    },
    [activeKey]
  );
  return (
    <Resizable
      ref={resizable}
      defaultSize={{ width }}
      minWidth={300}
      onResizeStop={onResizeStop}
    >
      <Tabs
        className={"tabs-side"}
        defaultActiveKey={activeKey}
        onChange={onChange}
        items={[
          {
            label: `菜单`,
            key: "menu",
            children: <Menu />,
          },
          {
            label: `代码`,
            key: "code",
            children: <Edit />,
          },
        ]}
      />
    </Resizable>
  );
}
