import React from "react";
import * as Icons from "@ant-design/icons";

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function getIconByName(name) {
  return name && Icons[name] && React.createElement(Icons[name]);
}

// 去除文件名后缀
export function getFileName(fileStr) {
  if (!fileStr) return "";
  return fileStr.split(".");
}

export function getUuid(length = 8) {
  return Number(
    Math.random().toString().substr(3, length) + Date.now()
  ).toString(36);
}
