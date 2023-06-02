// 載入 express 框架
const express = require('express')
const app = express()
const port = 3000

// 載入樣板引擎
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({'defaultLayout':'main'})   )
app.set('view engine','handlebars')


// 載入外部JSON檔案: 餐廳清單
const restaurants = require('./restaurant.json')



// 載入靜態檔案
app.use(express.static('public'))


// 設定路由: 首頁(使用 index.handlebars)
app.get('/', (rep,res)=>{
  console.log(restaurants.results[0])

  // 測試餐廳變數
  const restaurant = restaurants.results[0]

  res.render('index', {restaurant:restaurant} )
})


// 設定路由: 分頁呈現個別餐廳(使用 show.handlebars)
// 參考 a 元素的 href 設定路由(應用動態路由的概念)
app.get('/restaurants/:restaurant_id', (req,res)=>{
  console.log('restaurant_id: ',req.params.restaurant_id)  
  res.render('show')
})



// 啟動並監聽伺服器
app.listen(port, ()=>{
  console.log(`Express is running on http://localhost:${port}`)
})