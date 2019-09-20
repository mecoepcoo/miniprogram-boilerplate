/**
 * 获取运行环境，用于判断是否为车机
 * @param {object} systemInfo 系统信息，通过小程序接口getSystemInfo获取
 */
export function getRuntimeType(systemInfo) {
  if (systemInfo.device === 'wecar') {
    return 'wecar';
  } else {
    return 'wechat';
  }
}

/**
 * json对象转换为查询字符串
 * @param {json} json json对象
 */
export function json2query(json) {
  if (!json) {
    return '';
  }
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) {
      return '';
    }
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key]);
  })).join('&');
}

/**
 * 对于有expired属性的storage，如果未过期，则返回data的值，否则返回null
 * @param {string} key 缓存的key
 */
export function getStorage(key) {
  let storage = wx.getStorageSync(key);
  if (storage.expired < new Date().getTime()) {
    return null;
  } else {
    return storage.data;
  }
}

/**
 * 清理storage
 */
export function clearStorageBeforeFull() {
  // TODO: 清理可有可无的storage
  let keysList = [
    'logs'
    // 需要补充
  ];
  keysList.forEach((key) => {
    wx.removeStorage({ key: key });
  });
}

/**
 * 清理缓存文件
 */
export function clearFileList() {
  wx.getSavedFileList({
    success: info => {
      let list = info.fileList;
      for (let i = 0; i < list.length; i++) {
        wx.removeSavedFile({
          filePath: list[i].filePath
        });
      }
    }
  });
}

export const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}