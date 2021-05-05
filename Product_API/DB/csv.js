// const DB = require('./mySql.js');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// fs.readFile('./Assets/product.csv', 'utf8', (err, data) => {
//   if (err) throw err;
//   let result = data.split('\n').slice(1);
//   let final = [];
//   for (let i = 0; i < result.length; i++) {
//     let productInfo =  result[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
//     final.push(productInfo.join(','));
//   }
//   final = final.join('\n').trim();
//   let filePath = path.join('./clean/product.csv');
//   fs.writeFile(filePath, final, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('success');
//     }
//   })
// })

// fs.readFile('./Assets/related.csv', 'utf8', (err, data) => {
//   if (err) throw err;
//   let result = data.split('\n').slice(1);
//   let final = [];
//   for (let i = 0; i < result.length; i++) {
//     let relatedInfo = result[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
//       relatedInfo[0] = Number(relatedInfo[0]),
//       relatedInfo[1] = Number(relatedInfo[1]),
//       relatedInfo[2] = Number(relatedInfo[2])
//       final.push(relatedInfo.join(','));
//   }
//   final = final.join('\n').trim();
//   let filePath = path.join('./clean/related.csv');
//   fs.writeFile(filePath, final, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('success');
//     }
//   })
// })

// const rl = readline.createInterface({
//   input: fs.createReadStream('./Assets/photos.csv'),
//   output: fs.createWriteStream('./clean/photos.csv'),
//   terminal: false,
//   crlfDelay: Infinity,
// })
// const start = async () => {
//   for await (const line of rl) {
//     let photosInfo = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
//     fs.appendFile('./clean/photos.csv', photosInfo.join(',') + '\n', (err) => {
//       if (err) throw err;
//     })
//   }
// }
// start();
// rl.on('line', (line) => {
//   let photosInfo = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
//   if (photosInfo.length === 4) {
//     rl.output.write(`${photosInfo.join(',')}\n`)
//   }
// })
// rl.on('close', () => {
//   final = final.join('\n').trim();
//   console.log(final);
//   let filePath = path.join('./clean/photos.csv');
//   fs.writeFile(filePath, final, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('success');
//     }
//   })
// })
// fs.readFile('./Assets/photos.csv', 'utf8', (err, data) => {
//   if (err) throw err;
//   let result = data.split('\n').slice(1);
//   let final = [];
//   for (let i = 0; i < result.length; i++) {
//     let relatedInfo = result[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
//       final.push(relatedInfo.join(','));
//   }
//   final = final.join('\n').trim();
//   let filePath = path.join('./clean/photos.csv');
//   fs.writeFile(filePath, final, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('success');
//     }
//   })
// })