import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import {
  wxlogin
} from '../../../utils/check.js';
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp();
const user = require("../../../api/user.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // hasBind:false,
    // haslogin:false,
    registerDate: null, //注册时间
    userInfo: {},
    bindStatus:0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'), //用于getUserInfo
    canIUseGetUserProfile: false, //获取7项用户信息，弹窗提示
    canIUseOpenData: false //直接获取昵称头像
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({//userInfo是微信的信息
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo,
      bindStatus:app.globalData.bindStatus
    })
    if (app.globalData.allInfo) {//绑定了信息了再赋值给注册时间
      this.setData({
        registerDate: app.globalData.allInfo.registerDate
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wxlogin().then(res => {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: app.globalData.hasUserInfo
      })
    }).catch(err => {
      console.log("promise:err", err)
    })

  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goBind() { //弃用方法
    if (!app.globalData.haslogin) {
      Dialog.confirm({
        message: '微信授权登录',
      }).then(() => {
        // on confirm
        this.getUserProfile()
      }).catch(() => {
        // on cancel
      });
    } else {
      wx.navigateTo({
        url: "/pages/myInfo/bind/bind"
      });
    }
  },
//绑定图标、弹窗跳转，我的信息均用此方法
  goPages(e) {
    if (!app.globalData.haslogin) {
      Dialog.confirm({
        message: '微信授权登录',
      }).then(() => {
        // on confirm
        this.getUserProfile()
      }).catch(() => {
        // on cancel
      });
    } else if (!app.globalData.hasBind) {
      Dialog.confirm({
          message: '去完善信息',
          confirmButtonText:"学生",
          cancelButtonText:"辅导员"
        })
        .then(() => {
          // on confirm----学生
          wx.navigateTo({
            url: "/pages/myInfo/bind/bind"
          });
        })
        .catch(() => {
          // 取消--辅导员
          wx.navigateTo({
            url: "/pages/myInfo/admin/admin"
          });
        });
    } else {
      console.log("e.currentTarget", e.currentTarget)
      let route = e.currentTarget.dataset.route;
      if(route=='../bind/bind'){
        if(app.globalData.bindStatus==2){
          route = '../admin/admin'
        }
      }
      wx.navigateTo({
        url: route,
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    }
  }
})