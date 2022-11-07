import { MenuUnfoldOutlined, ProfileOutlined } from "@ant-design/icons";
import * as Icons from "@ant-design/icons";
import { Menu } from "i-antd";
import React, { useLayoutEffect, useState } from "react";
import "./menu.css";
import useStore from "@/stores/index.js";
import { Cesium } from "@/cesium-tools";

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

/**
 * 遍历srcx下目标文件夹下的所有文件
 *
 * @param {Object} dirContext
 * @param {String} targetDir 目标文件夹名
 * @param {Object} [options]
 */
function traversalDirectory(dirContext, targetDir, options) {
  if (!dirContext) {
    throw new Error("targetDir is required");
  }
  const DEFAULT_OPTIONS = {
    fieldValue: "value",
  };

  const { fieldValue } = Object.assign({}, DEFAULT_OPTIONS, options);

  const fileList = dirContext.keys();
  const fileTree = {};

  fileList.forEach((item) => {
    let path = dirContext.resolve(item);
    let subPath = path.replace(`./src/${targetDir}/`, "");
    let pathLevel = subPath.split("/");
    let currentLevel = fileTree;

    pathLevel.forEach((m, i) => {
      const fileName = getFileName(m);
      // 如果是文件
      if (i === pathLevel.length - 1) {
        if (!currentLevel[fieldValue]) {
          currentLevel[fieldValue] = [];
        }
        let filePath = `${targetDir}/${subPath}`;
        let resData, res;
        resData = require(`@/${filePath}`);
        // 当前目录配置文件
        if (m.includes("json")) {
          Object.assign(currentLevel, resData);
        } else {
          res = resData && resData.default;
          const item = {
            [fileName]: subPath,
            key: filePath,
            fileName,
            name: fileName,
          };
          if (isObject(res)) {
            Object.assign(item, res);
          }
          currentLevel[fieldValue].push(item);
        }
      } else {
        // 如果是目录
        if (!currentLevel[m]) {
          currentLevel[fileName] = {
            type: "dir",
            name: fileName,
          };
        }
        currentLevel = currentLevel[fileName];
      }
    });
  });

  return fileTree;
}

// 去除文件名后缀
function getFileName(fileStr) {
  return fileStr && fileStr.split(".")[0];
}

function getIconByName(name) {
  return name && Icons[name] && React.createElement(Icons[name]);
}

// 获取code文件夹下的所有文件结构

function getItem(label, key, icon_, children, type) {
  const icon = typeof icon_ === "string" ? getIconByName(icon_) : icon_;
  return {
    key: key || getUuid(),
    icon,
    children,
    label,
    type,
  };
}

function getUuid(length = 8) {
  return Number(
    Math.random().toString().substr(3, length) + Date.now()
  ).toString(36);
}

function setMenu(tree) {
  const result = [];

  function recurveTree(tree, result) {
    let children = (result.children = []);
    if (isObject(tree) && tree.type === "dir") {
      const { name, key, icon = <MenuUnfoldOutlined />, menuType } = tree;
      result.push(getItem(name, key, icon, children, menuType));
    }

    isObject(tree) &&
      Object.keys(tree).map((keyName) => {
        const item = tree[keyName];
        // 目录
        if (isObject(item) && item.type === "dir") {
          recurveTree(item, children);
        }
        // 文件
        if (keyName === "value") {
          item.forEach((item) => {
            const { name, key, icon = <ProfileOutlined />, menuType } = item;
            children.push(getItem(name, key, icon, null, menuType));
          });
        }
      });

    return result;
  }

  return recurveTree(tree, result);
}

const dirContext = require.context("@/code", true, /\.js|json$/);
const dirTree = traversalDirectory(dirContext, "code");
const items = setMenu(dirTree);

const App = (props) => {
  const { map, codeEdit } = useStore();
  const onMenuClick = ({ key }) => {
    try {
      const reqItem = require(`@/${key}`).default;
      const { fn } = reqItem;
      const viewer = map.viewer;
      map.clear();
      typeof fn === "function" && fn({ viewer, Cesium });
      codeEdit.setCode(fn.toString());
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Menu
        mode="inline"
        className="menu"
        defaultOpenKeys={["root"]}
        items={items}
        onClick={onMenuClick}
      />
    </div>
  );
};
export default App;
