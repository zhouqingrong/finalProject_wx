// pages/myInfo/bind/bind.js
const app = getApp();
import {
  bindStu
} from '../../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    nickName: '',
    username: '',
    usernum: '',
    phone: '',
    urgentPhone: '',
    department: '',
    marjor: '',
    dormitory: '',
    teacher: ''
  },
  confirmBind() {
    let data = {}
    data['openId'] = app.globalData.userOpenId
    data['stuNo'] = this.usernum
    data['username'] = this.username
    bindStu(data).then(res => {
      console.log("bind success: ", res)
      app.globalData.hasBind = true
    }).catch(err => {
      console.log("bind err: ", err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.setData({
      avatar: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
    })
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