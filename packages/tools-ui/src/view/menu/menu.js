import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "i-antd";
import React, { useLayoutEffect, useState } from "react";
import { Cesium } from "@/Cesium";
import "./menu.css";

const file = require.context("@/code", true, /\.js|json$/);
const fileList = file.keys();
const fileTree = {};

fileList.forEach((item) => {
  let path = file.resolve(item);
  let subPath = path.replace("./src/code/", "");
  let pathLevel = subPath.split("/");
  let currentLevel = fileTree;
  pathLevel.forEach((m, i) => {
    if (i === pathLevel.length - 1) {
      if (!currentLevel.value) {
        currentLevel.value = [];
      }
      const resData = require(`@/code/${subPath}`);

      let res = resData.default;
      // 当前目录配置文件
      if (m.includes("json")) {
        res = resData;
        currentLevel.name = res && res.name;
        return;
      }
      const item = { [m]: subPath };
      if (res) {
        item.name = res.name;
        item.code = res.code;
      }
      currentLevel.value.push(item);
    } else {
      if (!currentLevel[m]) {
        currentLevel[m] = {};
      }
      currentLevel = currentLevel[m];
    }
  });
  // console.log('[mLog] fileTree -->2',fileTree)
});

// 获取code文件夹下的所有文件结构

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
