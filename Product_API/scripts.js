import http from 'k6/http';
import { randomSeed, sleep } from 'k6';

export let options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "30s", target: 100 },
    { duration: "30s", target: 1000 },
    // { duration: "30s", target: 1500 },
  ]
};
randomSeed(0);
export default function () {
  const url = 'http://127.0.0.1:8080/'
  let productId = Math.floor(Math.random() * 1000000) + 1;
  http.get(`${url}products`);
  http.get(`${url}products/${productId}`);
  http.get(`${url}products/${productId}/styles`);
  http.get(`${url}products/${productId}/related`);
  sleep(1);
}

