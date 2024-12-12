const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});

db.connect((err) => {
  if (err) {
    console.error('無法連接資料庫：', err.message);
    return;
  }
  console.log('已連接至資料庫');
});

// 測試查詢
db.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error('查詢錯誤：', err.message);
    return;
  }
  console.log('查詢結果：', results);
});