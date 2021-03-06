// pages/my/index/index.js
const sdk = require('../../../vendor/wafer2-client-sdk/index')
const config = require('../../../config')
const util = require('../../../utils/util.js')

// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    tt.hideShareMenu({
      success(res) {
        console.log(`hideShareMenu 调用成功`);
      },
      fail(res) {
        console.log(`hideShareMenu 调用失败`);
      }
    });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    }

    setTimeout(() => {
      if (!this.data.userInfo.id) {
        this.getUserInfo();
      }
    }, 1000);
  },

  getUserInfo: function (e) {
    const that = this;
    sdk.login({
      method: "POST",
      success: res => {
        app.globalData.userInfo = res;

        that.setData({
          userInfo: res
        })
      },
      fail: err => {
        util.showModel('温馨提示', err.message)
      }
    })
  },
  onClick0: function () {
    tt.chooseAddress({
      success(res) {
        console.log(res.userName);
        console.log(res.provinceName);
        console.log(res.cityName);
        console.log(res.countyName);
        console.log(res.detailInfo);
        console.log(res.telNumber);
      }
    });
  },
  onClick1: function () {
    tt.scanCode({
      success(res) {
        console.log(`${res.result}`);
      },
      fail(res) {
        console.log(`scanCode调用失败`);
      }
    });
  },
  onClick2: function () {
    tt.showLoading({
      title: "请求中，请稍后...",
      success(res) {
        console.log(`${res}`);
      },
      fail(res) {
        console.log(`showLoading调用失败`);
      }
    });
  },
  onClick3: function () {
    tt.showInteractionBar({
      success(res) {
        console.log(`${res}`);
      },
      fail(res) {
        console.log(`showInteractionBar 调用失败`);
      }
    });
  }
})