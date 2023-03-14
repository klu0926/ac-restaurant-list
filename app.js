// get restaurant data
const restaurantList = require('./restaurant.json').results

// get express and create express app
const express = require('express')
const app = express()

// get express-handlebars
const handlebars = require('express-handlebars')

// app setup
// create and set view engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('./public')) //set up static folder

// port
const port = 3000

// set route and response
// index page
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList })
})
// show page
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.find(rest => rest.id.toString() === req.params.id)
  res.render('show', { restaurant })
})
// search page
app.get('/search', (req, res) => {
  const searchInput = req.query.keyword.trim()
  const restaurants = restaurantList.filter(restaurant => {
    return (restaurant.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      restaurant.category.includes(searchInput))
  })

  res.render('index', { restaurants, searchInput })
})

// server start and listen 
app.listen(port, () => {
  console.log(`server live on http://localhost:${port}`)
})