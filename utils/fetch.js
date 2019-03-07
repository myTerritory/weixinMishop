
// 1.定义一个fetch函数
let fetch =(options)=>{

  return new Promise(function(resolve,reject){
   //1.这里写异步的代码
    wx.request({
      url: options.url || '',
      data: options.data || '',  
      header: options.header || { 'content-type': 'application/json' },
      method: options.method || 'GET',
      dataType: options.dataType || 'json',
      success: function (res) {
        resolve(res);
      },
      fail: function (error) {
        reject(error);
      }
    })   

  })

}

// 2.声明导出fetch函数
module.exports ={
  fetch: fetch
}




