import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      // hasBind:false,
      // haslogin:false,
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),//用于getUserInfo
      canIUseGetUserProfile: false,  //获取7项用户信息，弹窗提示
      canIUseOpenData:false  //直接获取昵称头像
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
  this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: app.globalData.hasUserInfo
  })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        // 在这里，发送openId和userInfo，插入一条数据，成功回调把haslogin设为true
        //   haslogin:true,
        })
        //把变量全部转为全局
        app.globalData.hasUserInfo=true;
        app.globalData.userInfo = res.userInfo;
        app.globalData.haslogin=true;
      }
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
  goBind(){
    if(!app.globalData.haslogin){
      Dialog.confirm({
        message: '微信授权登录',
      }).then(() => {
        // on confirm
        this.getUserProfile()
      }).catch(() => {
          // on cancel
      });
    }else{
      wx.navigateTo({
        url: "/pages/myInfo/bind/bind"
      });
    }
  },

  goPages(e){
    if(!app.globalData.haslogin){
      Dialog.confirm({
        message: '微信授权登录',
      }).then(() => {
        // on confirm
        this.getUserProfile()
      }).catch(() => {
          // on cancel
      });
    }else if(!app.globalData.hasBind){
      Dialog.confirm({
        message: '去完善信息',
      })
        .then(() => {
          // on confirm
          wx.navigateTo({
            url: "/pages/myInfo/bind/bind"
          });
        })
        .catch(() => {
          // on cancel
        });   
    }else{
      console.log("e.currentTarget",e.currentTarget)
      let route = e.currentTarget.dataset.route;
      wx.navigateTo({
              url: route,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
      // wx.navigateTo({
      //   url: "/pages/myInfo/bind/bind"
      // });
    }
  }
 
  // goOrderIndex(e) {
  //   if (this.data.hasLogin) {
  //     let tab = e.currentTarget.dataset.index
  //     let route = e.currentTarget.dataset.route
  //     try {
  //       wx.setStorageSync('tab', tab);
  //     } catch (e) {

  //     }
  //     wx.navigateTo({
  //       url: route,
  //       success: function (res) { },
  //       fail: function (res) { },
  //       complete: function (res) { },
  //     })
  //   } else {
  //     wx.navigateTo({
  //       url: "/pages/auth/login/login"
  //     });
  //   };
  // },
  // goAfterSale: function () {
  //   wx.showToast({
  //     title: '目前不支持',
  //     icon: 'none',
  //     duration: 2000
  //   });
  // }
})