import { MenuUnfoldOutlined, ProfileOutlined } from "@ant-design/icons";
import { Menu } from "i-antd";
import React from "react";
import "./menu.css";
import useStore from "@/stores/index.js";
import { Cesium } from "@/cesium-tools";
import { isObject, getIconByName, getFileName, getUuid } from "@/utils";

/**
 * 遍历srcx下目标文件夹下的所有文件
 *
 * @param {Object} dirContext
 * @param {String} targetDir 目标文件夹名
 * @param {Object} [options]
 * @returns {Object} { [fileName]: { name, key, icon, menuType } }
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

    pathLevel.forEach((fullFileName, i) => {
      const [fileName, suffix] = getFileName(fullFileName);
      // 如果是文件
      if (i === pathLevel.length - 1) {
        if (!currentLevel[fieldValue]) {
          currentLevel[fieldValue] = [];
        }
        let filePath = `${targetDir}/${subPath}`;
        let resData, res;
        resData = require(`@/${filePath}`);
        // 当前目录配置文件
        if (fullFileName === "config.json") {
          // 将配置文件中的数据合并到当前目录对象中
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
        if (!currentLevel[fullFileName]) {
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

// 获取code文件夹下的所有文件结构

function getItem(label, key, icon_, children, type, codeType) {
  const icon = typeof icon_ === "string" ? getIconByName(icon_) : icon_;
  return {
    key: key || getUuid(),
    icon,
    children,
    label,
    type,
    "code-type": codeType,
  };
}

function setMenu(tree) {
  const result = [];

  function recurveTree(tree, result) {
    let children = (result.children = []);
    let rootCodeType = tree.codeType;

    // 目录
    if (isObject(tree) && tree.type === "dir") {
      const {
        name,
        key,
        icon = <MenuUnfoldOutlined />,
        menuType,
        codeType,
      } = tree;
      result.push(
        getItem(name, key, icon, children, menuType, codeType || rootCodeType)
      );
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
            const {
              name,
              key,
              icon = <ProfileOutlined />,
              menuType,
              codeType,
            } = item;
            children.push(
              getItem(name, key, icon, null, menuType, codeType || rootCodeType)
            );
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
  const { map, codeEdit, stage } = useStore();
  const onMenuClick = (menu) => {
    const { key, item } = menu;
    // 设置代码类型
    stage.setCodeType(item.props["code-type"]);
    try {
      const reqItem = require(`@/${key}`).default;
      if (reqItem && reqItem.fn) {
        const { fn } = reqItem;
        const viewer = map.viewer;
        const args = { viewer, Cesium };

        // 保存当前编辑的代码
        codeEdit.setCode(fn.toString());
        // 保存当前编辑的代码的参数
        codeEdit.setArgs(args);
        // 清楚地图上的所有图层
        map.clear();

        // 执行代码
        typeof fn === "function" && fn(args);
      }
    } catch (e) {
      console.error(e);
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
