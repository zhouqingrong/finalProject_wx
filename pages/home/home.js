// pages/home/home.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import {wxlogin} from '../../utils/check.js'
import {
  openId,
  login
} from '../../api/user.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindStatus: 0,
  },
  getUserProfile(e) {
    wxlogin(e).then(res =>{
      this.getBindStatus()
    }).catch(err => {

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
          confirmButtonText:"学生",
          cancelButtonText:"辅导员"
        })
        .then(() => {
          //确认--学生
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
        // 获取openId
        openId(res.code).then(res => {
          console.log("openid: ", res.data.data.openid)
          app.globalData.openId = res.data.data.openid
        }).catch(err => {
          console.log("err: ", err)
        })
      }
    })
    
  },

  getBindStatus() {
    this.setData({
      bindStatus: app.globalData.bindStatus
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
    this.getBindStatus()
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