// 載入 express 框架
const express = require('express')
const app = express()
const port = 3000


// 設定路由: 首頁
app.get('/', (rep,res)=>{
  res.send(`測試 express 伺服器 成功建立`)
})


// 啟動並監聽伺服器
app.listen(port, ()=>{
  console.log(`Express is running on http://localhost:${port}`)
})