const DB = require('../DB/mySql.js');

getProducts = (query) => {
  return new Promise((resolve, reject) => {
    let count = query.count ? query.count: 5;
    let page = query.page !== 1 && query.page ? query.page * count: 0;
    let queryMySQL = `SELECT * FROM product LIMIT ${page}, ${count};`
    DB.query(queryMySQL, (err, results) => {
      if (err) reject(err);
      resolve(results);
    })
  })
}

// getProduct = (product_id) => {
//   return new Promise((resolve, reject) => {
//     let queryMySQL = `SELECT * FROM product WHERE product_id=${product_id};`
//     DB.query(queryMySQL, (err, results) => {
//       if (err) reject(err);
//       resolve(results[0]);
//     })
//   })
// }

// getFeature = (product_id) => {
//   return new Promise((resolve, reject) => {
//     let queryMySQL = `SELECT * FROM feature_product WHERE product_id=${product_id};`
//     DB.query(queryMySQL, (err, results) => {
//       if (err) reject(err);
//       resolve(results);
//     })
//   })
// }

getProductFeature = (product_id) => {
  return new Promise((resolve, reject) => {
    let queryMySQL = `SELECT * FROM product JOIN feature_product WHERE feature_product.product_id=product.product_id AND product.product_id=${product_id};`
    DB.query(queryMySQL, (err, results) => {
      if (err) reject(err);
      resolve(results);
    })
  })
}

combineFeaturesProduct = (product_id) => {
  return new Promise((resolve, reject) => {
    getProductFeature(product_id)
    .then((result) => {
      const product = {
        id: result[0].product_id,
        name: result[0].name,
        slogan: result[0].slogan,
        description: result[0].description,
        category: result[0].category,
        default_price: result[0].default_price,
        features: [],
      }
      for (let i = 0; i < result.length; i++) {
        let obj = {};
        obj.feature = result[i].feature;
        obj.value = result[i].value === 'null' ? null: result[i].value;
        product.features.push(obj);
      }
      resolve(product)
    })
    .catch((err) => {
      reject(err);
    })
  })
}

// combineFeaturesProduct = (product_id) => {
//   return Promise.all([getFeature(product_id), getProduct(product_id)])
//   .then((results) => {
//     const product = {
//       id: results[1].product_id,
//       name: results[1].name,
//       slogan: results[1].slogan,
//       description: results[1].description,
//       category: results[1].category,
//       default_price: results[1].default_price,
//       features: [],
//     }
//     for (let i = 0; i < results[0].length; i++) {
//       let obj = {};
//       obj.feature = results[0][i].feature;
//       obj.value = results[0][i].value === 'null' ? null: results[0][i].value;
//       product.features.push(obj);
//     }
//     return product;
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// }

// getStyles = (product_id) => {
//   return new Promise((resolve, reject) => {
//     let queryMySQL = `SELECT * FROM style WHERE product_id=${product_id};`
//     DB.query(queryMySQL, (err, results) => {
//       if (err) reject(err);
//       resolve(results);
//     })
//   })
// }
// SELECT * FROM product JOIN feature_product WHERE feature_product.product_id=product.product_id AND product.product_id=${product_id};

// `SELECT * FROM style JOIN SKUS, photos WHERE SKUS.style_id=style.style_id AND photos.style_id=style.style_id AND style.product_id=${product_id};`
// WITH top_reviews AS (
//   SELECT *
//   FROM reviews
//   WHERE product_id = 51
//   ORDER BY reviews.r_date DESC, reviews.helpfulness DESC
//   LIMIT 5
// ), review_photos AS (
//   SELECT
//     GROUP_CONCAT(photos.url) AS photo_list,
//     photos.review_id AS extra,
//     GROUP_CONCAT(photos.photo_id) AS photo_ids
//   FROM photos
//     JOIN top_reviews
//     ON photos.review_id = top_reviews.review_id
//   GROUP BY photos.review_id
// )
// SELECT *
// FROM review_photos
//   RIGHT JOIN top_reviews
//   ON review_photos.extra = top_reviews.review_id;

getStylePhotosSKUS = (product_id) => {
  return new Promise((resolve, reject) => {
    let queryMySQL = `WITH styles AS (
      SELECT * FROM style WHERE product_id = ${product_id}
    ), photo AS (
      SELECT
        GROUP_CONCAT(photos.url) AS pic,
        GROUP_CONCAT(photos.thumbnail_url) AS thic,
        photos.style_id AS extra
        FROM photos
         JOIN styles
         ON photos.style_id = styles.style_id
        GROUP BY photos.style_id
    ), skuss AS (
      SELECT
        GROUP_CONCAT(SKUS.SKU_id) AS skuId,
        GROUP_CONCAT(SIZE) AS skuSize,
        GROUP_CONCAT(quantity) AS skuQuantity,
        SKUS.style_id AS extra
        FROM SKUS
         JOIN styles
         ON SKUS.style_id = styles.style_id
         GROUP BY SKUS.style_id
    )
    SELECT * FROM styles INNER JOIN photo, skuss WHERE photo.extra = styles.style_id AND skuss.extra = styles.style_id;`
    DB.query(queryMySQL, (err, results) => {
      if (err) reject(err);
      resolve(results);
    })
  })
}



// getStylePhotosSKUS = (product_id) => {
//   return new Promise((resolve, reject) => {
//     let queryMySQL = `SELECT * FROM style JOIN SKUS ON SKUS.style_id=style.style_id LEFT JOIN photos ON photos.style_id=style.style_id WHERE style.product_id=${product_id};`
//     DB.query(queryMySQL, (err, results) => {
//       if (err) reject(err);
//       resolve(results);
//     })
//   })
// }
const createPhotos = (arrays, object) => {
  for (let j = 0; j < arrays[0].length; j++) {
    object.photos.push({
      url: arrays[0][j],
      thumbnail: arrays[1][j]
    })
  }
}

const createSKUS = (arrays, object) => {
  for (let k = 0; k < arrays[2].length; k++) {
    object.skus[arrays[2][k]] = {
      size: arrays[3][k],
      quantity: arrays[4][k]
    }
  }
}

combineStylePhotosSKUS = (product_id) => {
  return getStylePhotosSKUS(product_id)
  .then((result) => {
    let final = {
      product_id: product_id.toString(),
      results: [],
    }
    for (let i = 0; i < result.length; i++) {
      let obj = {
        style_id: result[i].style_id,
        name: result[i].style_name,
        original_price: result[i].original_price,
        sale_price: result[i].sale_price === 'null' ? 0 : result[i].sale_price,
        'default?': result[i].default_bool ? false : true,
        photos: [],
        skus: {}
      };
      let array = [result[i].pic.split(','),result[i].thic.split(','), result[i].skuId.split(','),result[i].skuSize.split(','),result[i].skuQuantity.split(',')];
      createPhotos(array, obj);
      createSKUS(array, obj);
      final.results.push(obj);
    }
    return final;
  })
}

// combineStylePhotosSKUS = (product_id) => {
//   return getStylePhotosSKUS(product_id)
//   .then((result) => {
//     let skus = {};
//     let styles = {};
//     let photos = {};
//     for (let i = 0; i < result.length; i++) {
//       skus[result[i].style_id] = {
//         [result[i].SKU_id]: {
//           size: result[i].size,
//           quantity: result[i].quantity,
//         },
//         ...skus[result[i].style_id]
//       }
//       styles[result[i].style_id] = {
//         style_id: result[i].style_id,
//         name: result[i].style_name,
//         original_price: result[i].original_price,
//         sale_price: result[i].sale_price === 'null'? '0': result[i].sale_price,
//         'default?': result[i].default_bool ? false: true,
//       }
//       photos[result[i].style_id] = {
//         [result[i].photos_id] : {
//           thumbnail_url: result[i].thumbnail_url,
//           url: result[i].url
//         },
//         ...photos[result[i].style_id]
//       }
//     }
//     let allStyles = Object.keys(styles);
//     let final = {
//       'product_id': product_id,
//       'results': []
//     }
//     for (let i = 0; i < allStyles.length; i++) {
//       let currentStyle = {
//         'style_id': Number(allStyles[i]),
//         'name': styles[allStyles[i]].name,
//         original_price: styles[allStyles[i]].original_price,
//         sale_price: styles[allStyles[i]].sale_price,
//         'default?': styles[allStyles[i]]['default?'],
//         photos: [],
//         skus: skus[allStyles[i]]
//       }
//       let pics = Object.values(photos[allStyles[i]])
//       for (let j = 0; j < pics.length; j++) {
//         currentStyle.photos.push(pics[j]);
//       }
//       final.results.push(currentStyle);
//     }
//     return final;
//   })
// }

// getPhotos = (style_id) => {
//   return new Promise((resolve, reject) => {
//     let queryMySQL = `SELECT * FROM photos WHERE style_id=${style_id};`
//     DB.query(queryMySQL, (err, results) => {
//       if (err) reject(err);
//       resolve(results);
//     })
//   })
// }

// getSKUS = (style_id) => {
//   return new Promise((resolve, reject) => {
//     let queryMySQL = `SELECT * FROM SKUS WHERE style_id=${style_id};`
//     DB.query(queryMySQL, (err, results) => {
//       if (err) reject(err);
//       resolve(results);
//     })
//   })
// }

getRelated = (product_id) => {
  return new Promise((resolve, reject) => {
    let queryMySQL = `SELECT * FROM related WHERE product1_id=${product_id};`
    DB.query(queryMySQL, (err, results) => {
      if (err) reject(err);
      let related = [];
      for (let i = 0; i < results.length; i++) {
        related.push(results[i].product2_id);
      }
      resolve(related);
    })
  })
}

// combineStylePhotosSKUS = (product_id) => {
//   return getStyles(product_id)
//   .then((results) => {
//     let promises = [];
//     for (let i = 0; i < results.length; i++) {
//       promises.push(new Promise((resolve, reject) => {
//         let style = {
//           style_id: results[i].style_id,
//           name: results[i].style_name,
//           original_price: results[i].original_price,
//           sale_price: results[i].sale_price !== 'null' ? results[i].sale_price: null,
//           'default?': results[i].default_bool === 0 ? false : true,
//           photos: [],
//           skus: {},
//         }
//         return Promise.all([getPhotos(results[i].style_id), getSKUS(results[i].style_id)])
//           .then((values) => {
//             for (let j = 0; j < values[0].length; j++) {
//               let photo = {
//                 thumbnail_url: values[0][j].thumbnail_url,
//                 url: values[0][j].url
//               }
//               style.photos.push(photo);
//             }
//             for (let k = 0; k < values[1].length; k++) {
//               style.skus[values[1][k].SKU_id] = {
//                 quantity: values[1][k].quantity,
//                 size: values[1][k].size
//               }
//             }
//             resolve(style);
//           })
//           .catch((err) => {
//             reject(err);
//           })
//       }))
//     }
//     return Promise.all(promises)
//     .then((results) => {
//       let styles = {
//         product_id: product_id.toString(),
//         results: [],
//       }
//       styles.results = styles.results.concat(...results);
//       return styles;
//     })
//     .catch((err) => {
//       throw err;
//     })
//   })
// }

module.exports = {
  getProducts, combineFeaturesProduct, getRelated, combineStylePhotosSKUS
}

// getProductFeature(55555)
// .then((result) => {
//   console.log(result);
// })
// .catch((err) => {
//   console.log(err);
// })

// getRelated(55555)
// .then((results) => {
//   console.log(results);
// })
// getPhotos(65490)
// .then((result) => {
//   console.log(result);
// })
// combineStylePhotosSKUS(14034)
// .then((results) => {
//   console.log(results);
// })
// getStyles(14034)
// .then((result) => {
//   console.log(result);
// })
// getProduct(14035)
// .then((result) => {
//   console.log(result);
// })
// .catch((err) => {
//   console.log(err);
// })
// getProducts({count: 10, page: 1})
// .then((results) => {
//   console.log(results);
// })

// combineFeaturesProduct(55555)
// .then((result) => {
//   console.log(result);
// })

// getStylePhotosSKUS(5555)
// .then((result) => {
//   console.log(result);
// })
// .catch((err)=>{
//   console.log(err);
// })

// combineStylePhotosSKUS(5555)
// .then((result) => {
//   // console.log(result);
// })
// .catch((err)=>{
//   console.log(err);
// })
// getSKUS(67005)
// .then((result) => {
//   console.log(result);
// })

