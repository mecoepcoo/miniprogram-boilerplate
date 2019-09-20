//logs.js
const util = require('../../utils/util.js');
import { states as userStates, types as userTypes, dispatch as userDispatch } from '../../stores/user';

Page({
  data: {
    logs: [],
    motto: '',
  },
  onLoad: function () {
    userStates.user$$.subscribe(data => {
      console.log(data);
      this.setData({
        motto: data
      });
    });
    setTimeout(() => {
      userDispatch(userTypes.UPDATE_USER_INFO);
    }, 3000);
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log));
      })
    });
  }
});
