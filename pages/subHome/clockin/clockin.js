// pages/clockin/clockin.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
import {
  addRecord,
  hasRecord
} from '../../../api/record'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasRecord: false, //今日是否打卡
    viewWidth: 0, //设置图片样式
    viewHeight: 0, //设置图片样式
    loading: false, //加载中
    token: "", //用于打卡记录传参
    students: [
      // {stuNo:'170950212',username:'周庆荣'},
      // {stuNo:'170950212',username:'周庆荣'},
      // {stuNo:'170950212',username:'周庆荣'},
      // {stuNo:'170950212',username:'周庆荣'}
    ], //打卡人员
    isClockIn: 0, //0不显示确认按钮 1显示确认打卡 2打卡成功
    show: true, //上拉菜单
    aimgurl: "", // //临时图片的路径
    canDel: false, //是否出现红叉
    countIndex: 1, // 可选图片剩余的数量
    imageData: [], // 所选上传的图片数据
    imgurl: '', //打卡成功的图片
    imgList: [],
    modalName: 'bottomModal'
  },
  // 图片样式

  imageLoad: function (e) {
    var width = e.detail.width,
      height = e.detail.height,
      ratio = width / height;
    var maxHeight = e.target.dataset.maxheight;
    var maxWidth = e.target.dataset.maxwidth;
    if (ratio > 1) {
      width = maxWidth;
      height = width / ratio;
    } else {
      height = maxHeight;
      width = height * ratio;
    }
    this.setData({
      viewHeight: height,
      viewWidth: width
    })
  },
  /*图片浏览及上传 */
  browse: function (e) {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album');
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera');
          }
        }
      }
    })
  },
  /*打开相册、相机 */
  chooseWxImage: function (type) {
    let that = this;
    wx.chooseImage({
      count: that.data.countIndex,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        // 选择图片后的完成确认操作
        that.setData({
          aimgurl: res.tempFilePaths,
          canDel: true
        });
        console.log("aimgurl", that.data.aimgurl);
        that.upLoadImgFun(res.tempFilePaths[0]);
      }
    })
  },
  //重新上传
  initdata() {
    this.setData({
      aimgurl: '',
      canDel: false,
      isClockIn: 0,
      students: []
    });
  },
  //确认打卡按钮
  confirm() {
    // 调用添加记录的接口
    let data = {}
    let records = []
    let students = this.data.students
    for (var i = 0; i < students.length; i++) {
      let record = {
        classId: students[i].classId,
        photoUrl: this.data.imgurl,
        studentId: students[i].id,
        studentNo: students[i].stuNo,
        username: students[i].username,
      }
      records.push(record)
    }
    data["records"] = records
    data["token"] = this.data.token
    console.log("添加记录的data:", data)
    addRecord(data).then(res => {
      console.log("添加打卡记录res", res)
      Toast.success({
        message: '打卡成功',
        position: 'top'
      });
      this.setData({
        isClockIn: 2, //打卡完毕
      });
    }).catch(err => {
      Toast.error({
        message: '打卡失败',
        position: 'top'
      });
      console.log("添加打卡记录err", err)
    })

    // console.log("上传的aimgurl", this.data.aimgurl[0]);
    // this.upLoadImgFun(this.data.aimgurl[0]);
  },
  /**上传：图片到服务器 */
  // 调上传图片的接口
  upLoadImgFun(tempFilePathsData) {
    let that = this;
    let orderCommentMaterial = []; // 每次选择添加的图片并上传到服务器后的图片信息
    console.log("tempFilePathsData----", tempFilePathsData)
    if (tempFilePathsData == '' || tempFilePathsData == undefined) {
      Toast.fail({
        message: '请上传图片',
        position: 'top'
      });
    } else {
      wx.showLoading({
        title: '识别中',
      })
      wx.uploadFile({
        url: 'http://139.9.140.136:9090/weChat/photo', // 上传服务器的后台请求接口地址
        filePath: tempFilePathsData, // 要上传的图片数据对象
        name: 'photo', //参数名
        header: {
          'content-Type': 'multipart/form-data' // 此处加上，用form表单的格式             
        },
        // 要携带的参数
        // formData: {
        //   "systemCode": "aaa",
        //   "belongCode": "cccccc",
        //   "belongID": "123456"
        // },
        success(res) {
          var resJSON = JSON.parse(res.data);
          console.log("上传图片res", resJSON)
          // 获取到上传到云端的url，保存在imgurl中
          if (resJSON.status == 'SUCCESS') {
            that.setData({
              token: resJSON.data.token,
              imgurl: resJSON.data.url,
              students: resJSON.data.students,
              isClockIn: 1, //显示确认打卡按钮、重新上传按钮
              canDel: false
            })
          } else {
            console.log("res message==", resJSON.message)
            Notify({
              message: resJSON.message,
              duration: 3000,
              onClose: () => {
                that.initdata()
              }
            });
          }
        },
        fail(err) {
          Toast.fail({
            message: '请上传图片',
            position: 'top'
          });
          console.log('err:', err);
        },
        complete(all) {
          wx.hideLoading()
          // console.log('all',all);
        }
      });
      // });
    }
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgurl,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.setData({
            aimgurl: '',
            canDel: false
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.ctx = wx.createCameraContext()
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
    //检测今日是否打卡
    let studentId = app.globalData.allInfo.studentId
    if (studentId == 0) {
      return
    }
    hasRecord(studentId).then(res => {
      console.log("has record res==", res)
      if (res.data.data.status == true) {
        this.setData({
          isClockIn: 2,
          aimgurl: res.data.data.record.photoUrl
        })
      }
    }).catch(err => {
      console.log("has record err==", err)
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