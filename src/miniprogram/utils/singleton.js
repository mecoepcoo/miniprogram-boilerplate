import keys from '../common/constantKeys';

export function getSingle(fn) {
  let result;
  return function () {
    return result || ( result = fn.apply(this, arguments) );
  };
}

export function getSystemInfo() {
  let systemInfoConstructor = getSingle(() => wx.getSystemInfoSync());
  return systemInfoConstructor();
}

export function getEnv() {
  let envConstructor = getSingle(() => wx.getStorageSync(keys.ENV) || '/* @echo NODE_ENV */');
  return envConstructor();
}
