import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  scenarios: {
    ramping_test: {
      executor: "ramping-vus",
      startVUs: 10,
      stages: [
        { duration: "5s", target: 20 },
        { duration: "5s", target: 30 },
        { duration: "5s", target: 40 },
        { duration: "5s", target: 50 },
        { duration: "5s", target: 60 },
        { duration: "5s", target: 70 },
        { duration: "5s", target: 80 },
        { duration: "5s", target: 90 },
        { duration: "5s", target: 100 },
        { duration: "5s", target: 110 },
        { duration: "5s", target: 120 },
        { duration: "5s", target: 130 },
        { duration: "5s", target: 140 },
        { duration: "5s", target: 150 },
        { duration: "5s", target: 160 },
        { duration: "5s", target: 170 },
        { duration: "5s", target: 180 },
        { duration: "5s", target: 190 },
        { duration: "5s", target: 200 },
        { duration: "5s", target: 210 },
        { duration: "5s", target: 220 },
        { duration: "5s", target: 230 },
        { duration: "5s", target: 240 },
        { duration: "5s", target: 250 },
        { duration: "5s", target: 260 },
        { duration: "5s", target: 270 },
        { duration: "5s", target: 280 },
        { duration: "5s", target: 290 },
        { duration: "5s", target: 300 },
        { duration: "5s", target: 310 },
        { duration: "5s", target: 320 },
        { duration: "5s", target: 330 },
        { duration: "5s", target: 340 },
        { duration: "5s", target: 350 },
        { duration: "5s", target: 360 },
        { duration: "5s", target: 370 },
        { duration: "5s", target: 380 },
        { duration: "5s", target: 390 },
        { duration: "5s", target: 400 },
        { duration: "5s", target: 410 },
        { duration: "5s", target: 420 },
        { duration: "5s", target: 430 },
        { duration: "5s", target: 440 },
        { duration: "5s", target: 450 },
        { duration: "5s", target: 460 },
        { duration: "5s", target: 470 },
        { duration: "5s", target: 480 },
        { duration: "5s", target: 490 },
        { duration: "5s", target: 500 },
      ],
      gracefulRampDown: "10s",
    },
  },
};

const categorys = ["FISH", "DOGS", "REPTILES", "CATS", "BIRDS"];

const productIds = [
  "AV-CB-01",
  "AV-SB-02",
  "FI-FW-01",
  "FI-FW-02",
  "FI-SW-01",
  "FI-SW-02",
  "FL-DLH-02",
  "FL-DSH-01",
  "K9-BD-01",
  "K9-CW-01",
  "K9-DL-01",
  "K9-PO-02",
  "K9-RT-01",
  "K9-RT-02",
  "RP-LI-02",
  "RP-SN-01",
];

const itemIds = [
  "EST-1",
  "EST-2",
  "EST-3",
  "EST-4",
  "EST-5",
  "EST-6",
  "EST-7",
  "EST-8",
  "EST-9",
  "EST-10",
  "EST-11",
  "EST-12",
  "EST-13",
  "EST-14",
  "EST-15",
  "EST-16",
  "EST-17",
  "EST-18",
  "EST-19",
  "EST-20",
  "EST-21",
  "EST-22",
  "EST-23",
  "EST-24",
  "EST-25",
  "EST-26",
  "EST-27",
  "EST-28",
];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function browseHomepage() {
  let params = {
    timeout: "30s",
  };
  return http.get("http://localhost:3000", params);
}

function browseProductList() {
  let params = {
    timeout: "30s",
  };
  let category = randomItem(categorys);
  return http.get(
    `http://localhost:3000/catalog/categories/${category}`,
    params
  );
}

function browseItemList() {
  let params = {
    timeout: "30s",
  };

  let productId = randomItem(productIds);
  return http.get(
    `http://localhost:3000/catalog/products/${productId}`,
    params
  );
}

function browseItemDetail() {
  let params = {
    timeout: "30s",
  };

  let itemId = randomItem(itemIds);
  return http.get(`http://localhost:3000/catalog/items/${itemId}`, params);
}

export default function () {
  let responses = [];
  responses.push(browseHomepage());
  responses.push(browseProductList());
  responses.push(browseItemList());
  responses.push(browseItemDetail());
  sleep(1);
  return responses;
}
