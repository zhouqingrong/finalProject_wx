// pages/myInfo/admin/admin.js
import {
  bindAdmin,deleteBind
} from '../../../api/user.js'
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    nickName: '',
    username: '',
    password: '',
    phone: '',
    adminName: '',
    classes: [],
    canChange: true
  },
//解除绑定
deleteBind(){
  Dialog.confirm({
    message: '确认解绑？',
  })
  .then(() => {
    //确认
    let openId = app.globalData.openId;
    deleteBind(openId).then(res=>{
      Toast.success("已解绑");
      console.log("解绑成功res",res)
      app.globalData.allInfo = res.data.data.user;
      app.globalData.hasBind = false;
      app.globalData.bindStatus = 0;
      wx.navigateBack({
        delta: 1,
      })
    }).catch(err=>{
      console.log("解绑失败err",err)
    })
  })
  .catch(() => {
    // 取消
  });
},
  // 绑定辅导员调接口 首先绑定
  confirmBind() {
    let param = {}
    param['openId'] = app.globalData.openId // 获取openId
    param['password'] = this.data.password
    param['username'] = this.data.username
    console.log("绑定辅导员数据", param)

    bindAdmin(param).then(res => {
      console.log("bindAdmin success: ", res)
      //这里在调一个接口展示信息，并弹窗
      Toast.success('绑定成功');
      app.globalData.hasBind = true
      app.globalData.allInfo = res.data.data.user
      app.globalData.bindStatus = 2
      let user = res.data.data.user.webUser
      this.setData({
        phone: user.phone,
        classes: user.classes,
        canChange: false
      })
    }).catch(err => {
      Toast.success('账号不存在或密码错误');
      console.log("bind err: ", err)
    })
  },

  initData(){
     // 当绑定以后，将全局存储的allinfo展示出来
     if (app.globalData.hasBind) {
      let user = app.globalData.allInfo.webUser
      this.setData({
        username:user.account,//账号
        password:'******',
        phone: user.phone,
        adminName: user.adminName,
        classes: user.classes,
        canChange: false
      })
    }
    this.setData({
      avatar: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   this.initData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})