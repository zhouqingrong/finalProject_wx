// pages/myInfo/bind/bind.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp();
import {
  bindStu,modifyBind,login,deleteBind
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
    address: '',
    dormitory: '',
    teacher: '',
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
  modifyBind() {
    // 修改
    console.log("修改绑定信息，待完善")
    let param = {
      "address": this.data.address,
      "id": app.globalData.allInfo.student.id,
      "phone": this.data.phone,
      "urgentPhone": this.data.urgentPhone
    }
    console.log("修改传参===", param)
    modifyBind(param).then(res => {
      console.log(res)
      Toast.success("修改成功")
      login(app.globalData.openId).then(res=>{
        app.globalData.allInfo = res.data.data.user
      })
    }).catch(err => {
      console.log("修改报错", err)
      Toast.fail("修改失败")
    })
  },
  // 绑定学生调接口 首先绑定
  confirmBind() {
    let param = {}
    param['openId'] = app.globalData.openId // 获取openId
    param['stuNo'] = this.data.usernum
    param['username'] = this.data.username
    console.log("1.usernum", this.data.usernum)
    console.log("绑定数据", param)

    bindStu(param).then(res => {
      console.log("bind success: ", res)
      //这里在调一个接口展示信息，并弹窗
      Toast.success('绑定成功');
      app.globalData.hasBind = true
      app.globalData.allInfo = res.data.data.user
      app.globalData.bindStatus = 1
      let user = res.data.data.user.student
      this.setData({
        phone: user.phone,
        urgentPhone: user.urgentPhone,
        department: user.departmentName,
        marjor: user.majorName,
        dormitory: user.dormitory.roomName,
        address: user.address,
        canChange: false
      })
    }).catch(err => {
      Toast.fail(err.data.message)
      console.log("bind err: ", err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("绑定后存储的app.globalData.allInfo",user);
    // 当绑定以后，将全局存储的allinfo展示出来
    if (app.globalData.hasBind) {
      let user = app.globalData.allInfo.student
      this.setData({
        username: user.username,
        usernum: user.stuNo,
        phone: user.phone,
        urgentPhone: user.urgentPhone,
        department: user.departmentName,
        address: user.address,
        marjor: user.majorName,
        dormitory: user.dormitory.roomName,
        canChange: false
      })
    }
    this.setData({
      avatar: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName,
    })
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