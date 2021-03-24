import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "30s", target: 100 },
  ]
};
let productId = 14034;
export default function () {
  const url = 'http://127.0.0.1:3001/'
  productId += 1;
  http.get(`${url}products`);
  http.get(`${url}products/${productId}`);
  http.get(`${url}products/${productId}/styles`);
  http.get(`${url}products/${productId}/related`);
  sleep(1);
}

