//app.js
App({
  data: {
    baseUrl: 'http://t.yushu.im'
  },
  handleRequest (url) {
    return new Promise(function(resolve,reject){
      wx.request({
        url: url,
        success (res) {
          resolve(res);
        },
        fail (err) {
          reject(err);
        }
      });
    })
  }
})