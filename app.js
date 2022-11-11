// Include express from node_modules and define server related variables
const express = require('express')
const app = express()
const port = 3000


// require express-handlebars here
const exphbs = require('express-handlebars')

//載入餐廳JSON
const restaurantList = require("./restaurant.json")

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// setting static files
//設定Express路由以提供靜態檔案: bootstrap
app.use(express.static('public'))
app.use("/public/stylesheets/style.css", express.static("stylesheets"))


// setting the route and corresponding response
app.get('/', (req, res) => {
  res.render("index", { restaurants: restaurantList.results })
  // res.send(`This is my first Express Web App bigbear`)
})


// 透過req.query取得網址 ? 後面的keyword
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    //注意includes會比較大小寫，必須處理掉，兩者都轉成小寫再比對最方便
    //回傳值依照餐廳名稱以及類別搜尋皆可
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })

  res.render('index', { restaurants: restaurants, keyword: keyword })
})


//獲取show頁面
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant })
})





// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})