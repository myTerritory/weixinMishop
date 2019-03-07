// 1.导入fetch函数
const fetch =require('./fetch.js').fetch;
// 2.导入API对象
const API = require('./api.js');



// 1.获取首页的数据
const getHomeBean=()=>{
  // console.log(API.HOME)
  return fetch({ url: API.HOME }); //promise

}


// 2.获取商品详情页面的数据
const getDetailBean = (goodId) => {
  let detailUrl = API.DETAIL + "?goodId=" + goodId;
  return fetch({ url: detailUrl});  //promise
}


//声明导出
module.exports = {
  getHomeBean: getHomeBean,
  getDetailBean: getDetailBean
}