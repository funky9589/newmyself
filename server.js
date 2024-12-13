const http = require("http");
const fs = require("fs"); // 引入 fs 模組來讀取檔案

const server = http.createServer((request, response) => {
  // 讀取 web.html 檔案
  fs.readFile("web.html", (err, data) => {
    if (err) {
      // 如果檔案讀取失敗，回傳錯誤訊息
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Server Error: Unable to load web.html");
    } else {
      // 如果檔案讀取成功，回傳內容
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    }
  });
});

const port = 5500;
const ip = "127.0.0.1";

server.listen(port, ip, () => {
  console.log(`Server is running at http://${ip}:${port}`);
});