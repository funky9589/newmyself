const express = require('express');
const path = require('path');
const app = express();

// 提供 public 資料夾裡的靜態檔案（例如 CSS, JS, 影像等）
app.use(express.static(path.join(__dirname, 'public')));

// 設置首頁路由，指向 public/html 資料夾中的 web.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'web.html'));
});

// 設置其他路由，指向 public/html 資料夾中的 monthly.html
app.get("/monthly.html", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'monthly.html'));
});

// 設置歌手介紹路由，指向 public/html 資料夾中的 singer.html
app.get("/singer", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'singer.html'));
});

// 啟動伺服器
const port = 5500;
app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
