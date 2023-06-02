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
app.get('/', (req,res)=>{
  console.log(restaurants.results[0])

// 將外部JSON檔案: 餐廳清單傳入局部頁面引擎
  res.render('index', {restaurants:restaurants.results} )
})


// 設定路由: 在首頁應用 query 系統打造搜尋功能
app.get('/search', (req,res)=>{
  console.log(req.query.keyword)
  const keyword = req.query.keyword

  // 依餐廳名稱篩選(使用filter陣列方法)
  const restaurants_filter = restaurants.results.filter( restaurant => 
    restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || 
    restaurant.category.toLowerCase().includes(keyword.toLowerCase())  
  )

  res.render('index', { restaurants:restaurants_filter, keyword:keyword})
})


// 設定路由: 分頁呈現個別餐廳(使用 show.handlebars)
// 參考 a 元素的 href 設定路由(應用動態路由的概念)
app.get('/restaurants/:restaurant_id', (req,res)=>{
  console.log('restaurant_id: ',req.params.restaurant_id)
  const restaurant_id = Number(req.params.restaurant_id)

  // 使用 find 陣列方法, 依動態路由 id 找出對應點擊的餐廳
  const restaurant = restaurants.results.find(restaurant => restaurant.id === restaurant_id  )

  // 將外部JSON檔案: 餐廳清單傳入局部頁面引擎
  res.render('show', {restaurant:restaurant})
})


// 啟動並監聽伺服器
app.listen(port, ()=>{
  console.log(`Express is running on http://localhost:${port}`)
})