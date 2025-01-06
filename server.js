const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const app = express();

// 配置靜態資源目錄
app.use(express.static(path.join(__dirname, "public")));

// 處理表單的中介軟體
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// contact_me.json 檢查與初始化
const filePath = path.join(__dirname, "contact_me.json");
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf8");
}

// 處理 /contact_me POST 請求
app.post("/contact_me", (req, res) => {
  let currentData = [];
  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      currentData = fileContent ? JSON.parse(fileContent) : [];
    } catch (error) {
      console.error("讀取或解析 contact_me.json 時發生錯誤:", error);
      currentData = [];
    }
  }

  // 確認 Email 與 Message 是否有效
  if (req.body && req.body.email && req.body.message) {
    const newContact = {
      email: req.body.email,
      message: req.body.message,
      timestamp: new Date().toISOString(),
    };
    currentData.push(newContact);

    try {
      fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), "utf8");
      console.log("聯絡資訊已儲存:", newContact);
      res.status(200).json({
        message: "提交成功！",
        data: newContact,
      });
    } catch (error) {
      console.error("寫入 contact_me.json 時發生錯誤:", error);
      res.status(500).json({ error: "伺服器錯誤，無法儲存資料。" });
    }
  } else {
    res.status(400).json({ error: "請提供有效的聯絡資訊。" });
  }
});

// 設定 web.html 為預設首頁
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "web.html"));
});

// 404 的頁面處理
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// 啟動伺服器
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
