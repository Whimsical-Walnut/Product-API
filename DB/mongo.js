const mongoose = require('mongoose');
mongoose.connect('mondodb://localhost/product', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MONGO CONNECTED')
  })
  .catch(() => {
    console.log('MONGO CONNECTION FAILED')
  })

  let productSchema = new mongoose.Schema({
    product_id: Number,
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: String
  })

  let Product = mongoose.model('Product', productSchema);

  let featuresSchema = new mongoose.Schema({
    product_id: Number,
    features: [{
      feature: String,
      value: String
    }]
  })

  let Features = mongoose.model('Features', featuresSchema);

  let styleSchema = new mongoose.Schema({
    product_id: String,
    results: [{
      style_id: Number,
      style_name: String,
      sale_price: String,
      'default?': Boolean,
      photos: [{
        thumbnail_url: String,
        url: String
      }]
      skus: [{
        skus_id: String,
        quantity: Number,
        size: String
      }]
    }]
  })

  let Style = mongoose.model('Style', styleSchema);

  let relatedSchema = new mongoose.Schema({
    product_id: Number,
    related: [Number]
  })

  let Related = mongoose.model('Related', relatedSchema);

  module.exports = {
    Features, Style, Related, Product
  }