const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");

const app = express();

// 配置靜態資源
app.use(express.static(path.join(__dirname, "public")));

// 配置 Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 配置文件上傳模組
app.use(
  fileUpload({
    createParentPath: true, // 自動創建目錄
  })
);

// 模擬資料庫操作
const ContactDB = {
  insert: (data) => {
    console.log("Data saved to database:", data); // 模擬保存資料庫
  },
};

// 聯絡表單處理
app.post("/contact_me", (req, res) => {
  if (req.body) {
    ContactDB.insert(req.body);
    res.status(200).json({ message: "Message received successfully!" });
  } else {
    res.status(400).json({ error: "Invalid request data." });
  }
});

// 靜態頁面路由
const routes = [
  { path: "/", file: "web.html" },
  { path: "/monthly.html", file: "html/monthly.html" },
  { path: "/singer", file: "html/singer.html" },
  { path: "/about", file: "html/about.html" },
];

routes.forEach(({ path: route, file }) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, "public", file));
  });
});

// 404 處理
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// 啟動伺服器
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
