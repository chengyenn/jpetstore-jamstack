import http from "k6/http";
import { sleep } from "k6";

export let options = {
  scenarios: {
    activity_simulation: {
      executor: "constant-vus",
      vus: 260,
      duration: "1m",
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
  return http.get("http://localhost:3000/catalog", params);
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
