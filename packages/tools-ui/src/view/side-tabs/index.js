import { Tabs } from "i-antd";
import { useCallback } from "react";
import "./index.scss";
import Menu from "@/view/menu/menu";
import Edit from "@/view/edit";
import useStore from "@/stores";

export default function App() {
  const { codeEdit } = useStore();
  const onChange = useCallback((val) => {
    if (val === "code") {
      codeEdit.setValue();
    }
  }, []);
  return (
    <Tabs
      className={"tabs-side"}
      defaultActiveKey="1"
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
  );
}
