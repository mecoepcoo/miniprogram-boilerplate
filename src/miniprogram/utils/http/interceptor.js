// 两个拦截器用于处理请求和响应，已经封装到http库中，直接在这个文件写逻辑即可
import config from '../../common/config';
import { genJwtAppToken } from './tokenGenerator';

export function interceptRequest(data, options) {
  // 请求拦截器
  let interceptedData = data;
  let interceptedOptions = options;

  // 请求拦截器逻辑写在这里
  interceptedOptions.header = genHeader();

  // 如果你要修改返回值，你必须明白你在做什么!
  return {
    data: interceptedData,
    options: interceptedOptions
  };
}

export function interceptResponse(res) {
  // 响应拦截器
  let interceptedRes = Object.assign({}, res);
  interceptedRes = Object.assign({}, interceptedRes.data);

  // 响应拦截器逻辑写在这里

  // 如果你要修改返回值，你必须明白你在做什么!
  return interceptedRes;
}

function genHeader() {
  const { env, prdVer } = config;
  const header = {};
  header['Authorization'] = genJwtAppToken(env);
  // 根据具体情况替换token
  return header;
}
