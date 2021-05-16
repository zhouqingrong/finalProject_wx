// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // const appId = 'wx6ee743d570d519a2'
    // const appSecret = 'ad6d4977570b9adfab015bb35c07ac28'





    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           console.log("-----------",this.globalData.userInfo)
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },

  globalData: {
    userInfo: null,//微信头像、昵称
    allInfo: null,//微信用户的信息
    openId: null,
    haslogin: false,//是否允许获取微信头像、昵称
    hasBind: false,//是否绑定用户信息
    hasUserInfo: false,//是否获取微信头像、昵称,同haslogin，在home里起判断作用
    bindStatus:0,//0是未绑定，1是绑定了学生，2是绑定了老师
   
  }
})