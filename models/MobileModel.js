var mongoose = require('mongoose')
var MobileSchema = mongoose.Schema(
 {
  name: String,
  brand: String,
  color: String,
  quantity: Number,
  price: Number,
  image: String,
  video: String
 }
)
var MobileModel = mongoose.model("dien thoai", MobileSchema, "mobile")

module.exports=MobileModel