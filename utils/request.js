class Request {
  // baseUrl = 'https://www.yueyilan.com/api/merchant'
  baseUrl = 'http://192.168.5.175:8085'
  // baseUrl = 'https://www.yueyilan.com/test/api/merchant'

  getData({ url, method = 'GET', data = {}, header = { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" }, toReject = false }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url.indexOf('www.yueyilan.com')>0?url:this.baseUrl + url,
        method: method,
        data: data,
        header:header,
        success: res => {
          if (res.data.code == 0) {
            resolve(res.data);
          } else {
              if (toReject){
                reject(res.data);
              }else{
                wx.hideLoading();
                this._showError(res.data.msg)
              }
          }
        },
        fail: err => {
          if (reject){
            reject(err.msg)
          }else{
            wx.hideLoading();
            this._showError('请求出错！')
          }
        }
      })
    })
  }
  _showError(msg) {
    wx.showToast({
      title: msg,
      icon: "none"
    })
  }
}

export { Request }
