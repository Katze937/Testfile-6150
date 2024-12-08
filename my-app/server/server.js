// server/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;  // 後端伺服器端口

// 中介軟體
app.use(cors());
app.use(express.json());

// 設置資料庫連接
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your-database-password',  // 替換成您的 MySQL 密碼
  database: 'your-database-name',     // 替換成您的資料庫名稱
});

// 測試資料庫連接
db.connect((err) => {
  if (err) {
    console.error('資料庫連接錯誤:', err);
    return;
  }
  console.log('資料庫連接成功');
});

// 註冊API端點
app.post('/register', (req, res) => {
  const { email, password, staff_id } = req.body;

  const query = 'INSERT INTO staff (email, password, staff_id) VALUES (?, ?, ?)';
  db.query(query, [email, password, staff_id], (err, result) => {
    if (err) {
      console.error('錯誤:', err);
      return res.status(500).json({ message: '註冊失敗' });
    }
    res.status(200).json({ message: '註冊成功' });
  });
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`後端伺服器運行於 http://localhost:${port}`);
});
