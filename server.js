const express = require('express');
const path = require('path');
const app = express();

// 提供 public 資料夾裡的靜態檔案（例如 CSS, JS, 影像等）
app.use(express.static(path.join(__dirname, 'public')));

// 路由設置
const routes = [
    { path: "/", file: "web.html" },
    { path: "/monthly.html", file: "html/monthly.html" },
    { path: "/singer", file: "html/singer.html" },
    { path: "/about", file: "html/about.html" },
];

routes.forEach(({ path: route, file }) => {
    app.get(route, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', file));
    });
});

// 404 錯誤頁面
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// 啟動伺服器
const port = 5500;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
