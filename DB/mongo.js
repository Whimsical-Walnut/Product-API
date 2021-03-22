const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/product', { useNewUrlParser: true, useUnifiedTopology: true })
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
    default_price: String,
    features: [{
      feature: String,
      value: String
    }],
    results: [{
      style_id: Number,
      style_name: String,
      sale_price: String,
      'default?': Boolean,
      photos: [{
        thumbnail_url: String,
        url: String
      }],
      skus: [{
        skus_id: String,
        quantity: Number,
        size: String
      }],
    }],
    related: [
      Number
    ]
  })

  let Product = mongoose.model('Product', productSchema);
// do nesting for children.
  module.exports = {
    Product
  }