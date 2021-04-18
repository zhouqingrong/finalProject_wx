const baseURL = 'http://139.9.140.136:9090';

const request = (options) => {
  return new Promise(function(resolve, reject) {
    let header = {
      'content-type': 'application/json',
    };
    wx.request({
      url: baseURL + options.url,
      method: options.method,
      data: options.data ? JSON.stringify(options.data) : "",
      header: header,
      success(res) {
        if (res.data.status == "SUCCESS") {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export default request