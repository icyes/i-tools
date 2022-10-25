import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "i-antd";
import React, { useLayoutEffect, useState } from "react";
import { Cesium } from "@/Cesium";
import "./menu.css";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("基本图形", "base", <MailOutlined />, [
    getItem("清空", "test"),
    getItem("画立方体", "drawCube"),
    getItem("画椭圆网格线", "drawEllipseLine"),
    getItem("画线", "drawLine"),
  ]),
];

// submenu keys of first level
const App = () => {
  const [viewer, setViewer] = useState();
  useLayoutEffect(() => {
    const viewer = new Cesium.Viewer("cesiumContainer", {
      infoBox: false,
      // terrainProvider: Cesium.createWorldTerrain()
    });
    setViewer(viewer);
    return () => viewer.destroy();
  }, []);

  const onMenuClick = ({ key }) => {
    viewer.entities.removeAll();
    try {
      const fn = require(`@/code/${key}`).default({ viewer });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Menu
      mode="inline"
      style={{
        width: 256,
      }}
      items={items}
      onClick={onMenuClick}
    />
  );
};
export default App;
