const product = require('../models/products.js');

module.exports = {
  products: (req, res) => {
    product.getProducts(req.query)
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(400)
    })
  },
  related: (req, res) => {
    product.getRelated(req.params.product_id)
    .then((related) => {
      res.status(200).send(related);
    })
    .catch((err) => {
      res.status(400)
    })
  },
  product: (req, res) => {
    product.combineFeaturesProduct(req.params.product_id)
    .then((productInfo) => {
      res.status(200).send(productInfo);
    })
    .catch((err) => {
      res.status(400)
    })
  },
  styles: (req, res) => {
    product.combineStylePhotosSKUS(req.params.product_id)
    .then((stylesList) => {
      res.status(200).send(stylesList);
    })
    .catch((err) => {
      res.status(400)
    })
  }
}