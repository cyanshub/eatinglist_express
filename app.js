// 載入 express 框架
const express = require('express')
const app = express()
const port = 3000

// 載入樣板引擎
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({'defaultLayout':'main'})   )
app.set('view engine','handlebars')


// 載入外部JSON檔案: 餐廳清單
const restaurant = require('./restaurant.json')



// 載入靜態檔案
app.use(express.static('public'))



// 設定路由: 首頁
app.get('/', (rep,res)=>{
  console.log(restaurant.results[0])
  res.render('index')
})


// 啟動並監聽伺服器
app.listen(port, ()=>{
  console.log(`Express is running on http://localhost:${port}`)
})