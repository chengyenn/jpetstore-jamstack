import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 30,
  duration: "30s",
};

export default function () {
  // home page
  let res = http.get("http://localhost:3000/catalog");
  check(res, { "status was 200": (r) => r.status === 200 });
  sleep(1);
}
