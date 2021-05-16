import Toast from '../miniprogram_npm/@vant/weapp/toast/toast';
import {
  login
} from '../api/user'
const app = getApp();

// function isValidPhone(str) {
//   var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
//   if (!myreg.test(str)) {
//     return false;
//   } else {
//     return true;
//   }
// }
// wx获取用户信息：头像、昵称
export const wxlogin = (e) => {
  return new Promise(function (resolve, reject) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // console.log("wx获取用户信息公共方法",res)
        app.globalData.hasUserInfo = true; //是否同意微信登录
        app.globalData.userInfo = res.userInfo; //微信的用户信息
        app.globalData.haslogin = true;
        login(app.globalData.openId).then(res => {
          console.log("getUserProfile:", res)
          // 判断是否绑定
          app.globalData.allInfo = res.data.data.user
          // status：0未绑定  1学生  2老师
          app.globalData.hasBind = res.data.data.user.status != 0
          app.globalData.bindStatus = res.data.data.user.status
          Toast.success('登录成功');
          resolve(res) //把结果往成功分支传，可以解决异步问题
        }).catch(err => {
          console.log(err)
          Toast.fail('登录失败');
          reject(err) //把err往catch传
        })
        // console.log('home.js-getUserProfile-haslogin', app.globalData.haslogin)
      }
    })
  })
}


// module.exports = {
//   isValidPhone,
// }