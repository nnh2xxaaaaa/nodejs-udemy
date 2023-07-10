// const fs = require("fs");
// const http = require("http");
// const url = require("url");
import http from "http";
import fs from "fs";
const url = require("url");
import dotenv from "dotenv";
import { Root, Root2 } from "./interface/interfaceData";
import { replaceTemplate } from "./src/templateCard/function-temp-card";
const slugify = require("slugify");

dotenv.config();

const data: string = fs.readFileSync(
  `${__dirname}/dev-data/data.json`,
  "utf-8"
);
const tempOverview: string = fs.readFileSync(
  `${__dirname}/templates/view/overview.html`,
  "utf-8"
);
const tempProduct: string = fs.readFileSync(
  `${__dirname}/templates/view/product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/view/card.html`,
  "utf-8"
);

const productData: Root = JSON.parse(data);
const slugs = productData.map((el: Root2) =>
  slugify(el.productName, { lower: true })
);

const server = http.createServer((req, res) => {
  // const pathName = req.url;
  // const { pathName, query } = url.parse(req.url, true);

  const { query, pathname } = url.parse(req.url, true);
  // const { query, pathName } = url.parse(req.url, true);
  // console.log(query);
  if (
    pathname === "/overview.html" ||
    pathname === "/overview" ||
    pathname === "/"
  ) {
    // Overview Page
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const cardsHtml: string = productData
      .map((el: Root2) => replaceTemplate(tempCard, el))
      .join("");
    const card = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(card);
    console.log(query);
  } else if (
    pathname === "/product" ||
    pathname === "/templates/view/product.html?id=0"
  ) {
    // Product Page
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    console.log(query);

    const product = productData[query.id];
    console.log(product);

    res.end(tempProduct);
  } else if (pathname === "/data") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html; charset=utf-8",
      "my-own-header": "hello world",
    });
    res.end("<h1>Error</h1>");
  }
});

const port = process.env.PORT_8080 || 3003;
server.listen(Number(port), "127.0.0.1", () => {
  console.log(`Listening on port 127.0.0.1:${port}/overview`);
});
