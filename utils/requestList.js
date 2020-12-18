import { Request } from "../utils/request.js"
let app = getApp();
let json = { 'Content-Type': 'application/json' }
let usal = { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" }

class RequestModel extends Request {

  // 登录
  toLogin(passwd,phone) {
    return this.getData({
      url: '/merchant/login',
      method: 'POST',
      data: {
        passwd,
        phone
      },
      header: json
    })
  }

  //获取验证码
  getCode(phone,phoneMd){
    return this.getData({
      url: '/code',
      method: 'POST',
      data: {
        phone,
        phoneMd
      }
    })
  }

  //验证验证码
  testCode(code,phone){
    return this.getData({
      url: '/code',
      method: 'get',
      data: {
        phone,
        code
      }
    })
  }

  //修改面膜
  changePass(phone,newPassword){
    return this.getData({
      url: '/merchant/users/'+phone+'/pwd',
      method: 'put',
      data: {
        newPassword
      }
    })
  }

  //创建订单--收款
  createOrder(data){
    return this.getData({
      url: '/order',
      method: 'post',
      data: data,
      header: json
    })
  }

  //请求二维码返回的地址
  getCodeInfo(url,id){
    return this.getData({
      url: url+'?merchantBranchId='+id,
      method: 'get'
    })
  }

  //账单
  fillList(merchantBranchId,month){
    return this.getData({
      url: '/order/bill',
      method: 'get',
      data:{
        merchantBranchId,
        month
      }
    })
  }

  //交易流水详情
  getFillXq(id){
    return this.getData({
      url: '/order/bill/order/'+id,
      method: 'get'
    })
  }

  //订单详情
  getOrderXq(id){
    return this.getData({
      url: '/order/'+id,
      method: 'get'
    })
  }

  //核销
  clearOrder(orderInfoId){
    return this.getData({
      url: '/order/writeoff',
      method: 'put',
      data:{
        orderInfoId
      }
    })
  }

  //今日交易额
  todayFill(id){
    return this.getData({
      url: '/merchant/transactionvalue/'+id,
      method: 'get'
    })
  }

}
export { RequestModel }