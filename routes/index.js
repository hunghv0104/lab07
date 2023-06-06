var express = require('express')
const MobileModel = require('../models/MobileModel')
var router = express.Router()

router.get('/', async(req, res)=>{
  var mobiles = await MobileModel.find({}) //await: cho den khi co dc du lieu thi moi chay async (bao gom request va response)
  // res.send(mobiles)
  var total = await MobileModel.count()
  res.render('index', {mobiles: mobiles, total:total})
})

router.get('/list', async(req, res)=>{ //giao dien khach hang
  var mobiles = await MobileModel.find({})
  res.render('list', {mobiles: mobiles})
})

router.get('/delete/:id', async(req, res)=>{
  var id = req.params.id //lay id o tren url
  var mobile = await MobileModel.findById(id)
  await MobileModel.deleteOne(mobile)
  // 3 dong tren=await MobileModel.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

router.get('/drop', async(req, res)=>{
  await MobileModel.deleteMany({})

  res.redirect('/')
})

router.post('/order', async(req, res)=>{
  var id = req.body.id
  var mobile = await MobileModel.findById(id)
  var orderQuantity = req.body.orderQuantity
  var price = req.body.price
  var total_price = price*orderQuantity
  res.render('order_confirm', {mobile: mobile, orderQuantity: orderQuantity, total_price: total_price})
})

router.get('/edit/:id', async(req, res)=>{
  var mobile = await MobileModel.findById(req.params.id)
  res.render('edit', {mobile: mobile})
})

router.post('/edit/:id', async(req, res)=>{
  await MobileModel.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/')
})

router.get('/add', (req, res)=>{
  res.render('add')
})

router.post('/add', async(req, res) => { //2 duong dan giong nhau nhung method khac nhau thi van dc
  var mobile = req.body
  await MobileModel.create(mobile)
  res.redirect('/')
})

module.exports = router
