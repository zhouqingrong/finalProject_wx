// pages/home/home.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp();
import {
  openId,
  login
} from '../../api/user.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        app.globalData.hasUserInfo = true;
        app.globalData.userInfo = res.userInfo;
        app.globalData.haslogin = true;
        console.log('home.js-getUserProfile-haslogin', app.globalData.haslogin)
      }

    })
  },
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
    } else {
      console.log("e.currentTarget", e.currentTarget)
      let route = e.currentTarget.dataset.route;
      wx.navigateTo({
        url: route,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        openId(res.code).then(res => {
          console.log("openid: ", res.data.data.openid)
          app.globalData.userOpenId = res.data.data.openid
        }).catch(err => {
          console.log("err: ", err)
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})