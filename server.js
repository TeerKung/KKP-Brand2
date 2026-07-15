const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// สั่งให้เซิร์ฟเวอร์เปิดเข้าถึงไฟล์ Static ทั้งหมดในโปรเจกต์
app.use(express.static(path.join(__dirname)));

// ตั้งค่า Routing สำหรับแต่ละหน้าเว็บ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'menu.html'));
});

app.get('/location', (req, res) => {
    res.sendFile(path.join(__dirname, 'location.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.use((req, res) => {
    res.status(404).redirect('/');
});

app.listen(PORT, () => {
    console.log(`\n==============================================`);
    console.log(`🚀 เซิร์ฟเวอร์ KinKubPak เริ่มทำงานแล้ว!`);
    console.log(`👉 เข้าไปเทสระบบได้ที่ลิงก์นี้เลย: http://localhost:\${PORT}`);
    console.log(`==============================================\n`);
});