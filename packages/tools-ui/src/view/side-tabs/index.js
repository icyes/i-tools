import { Tabs } from "i-antd";
import { useCallback } from "react";
import "./index.scss";
import Menu from "@/view/menu/menu";
import Edit from "@/view/edit";

export default function App() {
  const onChange = useCallback((val) => {
    console.log("[mLog] val -->", val);
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
