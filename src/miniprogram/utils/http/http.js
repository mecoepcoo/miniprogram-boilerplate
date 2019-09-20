// 含拦截器的网络请求
import { json2query } from '../util';
import { interceptRequest, interceptResponse } from './interceptor';

export const http = {
  /**
   * get
   * @param {string} url 请求地址
   * @param {object} [data] 请求body对象，会自动转为query字符串
   * @param {object} [options] 其他选项
   */
  get: function (url, data = {}, options = {}) {
    let intercepted = interceptRequest(data, options);
    let promise = new Promise((resolve, reject) => {
      let query = json2query(intercepted.data);
      let requestUrl = query ? `${url}?${query}` : url;
      wx.request({
        url: requestUrl,
        success: (res) => {
          if (res.statusCode < 200 || res.statusCode >= 400) {
            reject(res);
          }
          let interceptedRes = interceptResponse(res);
          resolve(interceptedRes);
        },
        ...intercepted.options
      });
    });
    return promise;
  },

  /**
   * post
   * @param {string} url 请求地址
   * @param {object} [data] 请求body对象
   * @param {object} [options] 其他选项
   */
  post: function (url, data = {}, options = {}) {
    let intercepted = interceptRequest(data, options);
    let promise = new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${url}`,
        data: data,
        success: (res) => {
          if (res.statusCode < 200 || res.statusCode >= 400) {
            reject(res);
          }
          let interceptedRes = interceptResponse(res);
          resolve(interceptedRes);
        },
        ...intercepted.options
      });
    });
    return promise;
  },
};
