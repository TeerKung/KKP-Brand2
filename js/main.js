document.addEventListener("DOMContentLoaded", () => {
    // --- 1. ระบบจัดการธีม มืด/สว่าง + บันทึกสถานะ (Persistent Dark Mode) ---
    const themeBtn = document.getElementById("themeBtn");
    
    // ดึงค่าธีมที่เคยตั้งไว้จาก localStorage (ถ้าไม่มี ให้ใช้ light เป็นค่าเริ่มต้น)
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    // อัปเดตไอคอนบนปุ่มตามธีมที่เลือก
    if (themeBtn) {
        themeBtn.innerText = savedTheme === "light" ? "🌙" : "☀️";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            let newTheme = "light";
            
            if (currentTheme === "light") {
                newTheme = "dark";
                themeBtn.innerText = "☀️";
            } else {
                newTheme = "light";
                themeBtn.innerText = "🌙";
            }
            
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme); // เซฟจำค่าไว้ในเครื่อง
        });
    }

    // --- 2. ปุ่มเมนู 3 ขีดสำหรับจอเล็ก (Mobile Navigation) ---
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // --- 3. ระบบจำลองการสั่งซื้อ (หน้า Menu) ---
    const buyButtons = document.querySelectorAll(".btn-buy");
    const alertBanner = document.getElementById("alertBanner");

    buyButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (alertBanner) {
                alertBanner.style.display = "block";
                setTimeout(() => {
                    alertBanner.style.display = "none";
                }, 3000);
            }
        });
    });

    // --- 4. สุ่มวาร์ปแผนที่กวน ๆ (หน้า Location) ---
    const trollBtn = document.getElementById("trollBtn");
    
    // เพิ่มคำกวน ๆ เพิ่มเติม และแก้ไข Syntax Error (ใส่คอมม่าคั่นเรียบร้อย)
    const trollPhrases = [
        "ขอโทษคับเผลอวาปแมพลงน้ำ",
        "กดอีกสิ!",
        "ช่วยด้วยไฟไหม้ร้านน!!!",
        "ถามจริง จะกินสลัดจริงดิ?",
        "ร้านตั้งอยู่ตรงข้ามร้านขายผักนั่นแหละ!",
        "พอดีผมขายที่บ้าน รชต อะสิ555",
        "เน็ตบ้านคุณกำลังจะหมดอายุในอีก... ล้อเล่นน่ะ 555",
        "แคร์รัตบอกว่า เดินเลยไปอีกสองซอย",
        "กดขนาดนี้ ไม่สั่งสลัดสักจานหน่อยเหรอ?",
        "หิวผัก หรือ แค่อยากกวนประสาทปุ่มนี้กันแน่ 🤔",
        "ปุ่มนี้มีไว้ให้กด ไม่ได้มีไว้ให้นำทาง 555",
        "ลองพยายามกดอีกรอบ เพื่อค้นหาขุมทรัพย์แปลงผัก!",
        "กำลังติดต่อหาเจ้าแคร์รัตมานำทางแป๊บ..."
    ];
    
    // ลิงก์รูปภาพ GIF กวน ๆ ที่เตรียมไว้
    const targetWebsites = [
        "https://media1.tenor.com/m/3eLbmtb9YXIAAAAC/phainon-isolation.gif",
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2YzcTMwNGZ5ZGE5MTMwMW4yZWx6b3l3ejhqMm5ybmJ3NnM4OGQxYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Y5GlGjo5ut42cMEapq/giphy.gif",
        "https://cdn.discordapp.com/attachments/1231644472496881724/1527031102013837443/fish-spinning.gif?ex=6a592e09&is=6a57dc89&hm=426a8c47a776ab7dd1729db5dd24e9a362c93a6a31727fd983ad2832a28d5516&",
        "https://static2.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/9f/66/xRec9VFb.gif"
    ];

    // ตัวแปรเก็บจำนวนครั้งที่กด และ สุ่มตั้งเป้าหมาย (สุ่มค่าระว่าง 4 ถึง 10 ครั้ง)
    let clickCount = 0;
    let targetClicks = Math.floor(Math.random() * 7) + 4; // สุ่มตัวเลขตั้งแต่ 4 ถึง 10

    if (trollBtn) {
        trollBtn.addEventListener("click", () => {
            clickCount++; // เพิ่มจำนวนครั้งที่กดขึ้นเรื่อย ๆ

            // ถ้ากดแล้วยังไม่ถึงเป้าหมายที่สุ่มไว้
            if (clickCount < targetClicks) {
                // สุ่มเปลี่ยนข้อความปุ่มกวน ๆ ไปเรื่อย ๆ ทุกครั้งที่กด
                const randomPhrase = trollPhrases[Math.floor(Math.random() * trollPhrases.length)];
                trollBtn.innerText = `${randomPhrase} `;
            } 
            // เมื่อกดครบจำนวนครั้งที่สุ่มไว้พอดี (4 - 10 ครั้ง)
            else {
                 
                setTimeout(() => {
                    // สุ่มลิงก์ GIF ปั่น ๆ ออกมา
                    const randomUrl = targetWebsites[Math.floor(Math.random() * targetWebsites.length)];
                    
                    // เปิดหน้าเว็บใหม่ในแท็บใหม่
                    window.open(randomUrl, '_blank');
                    
                    // รีเซ็ตค่าระบบเพื่อเริ่มเล่นใหม่ได้อีกรอบ
                    clickCount = 0;
                    targetClicks = Math.floor(Math.random() * 7) + 4; // สุ่มเป้าหมายใหม่
                    trollBtn.innerText = "🗺️ กดเพื่อสุ่มค้นหาแผนที่ร้าน";
                    trollBtn.style.backgroundColor = "var(--color-primary)"; // รีเซ็ตสีปุ่มกลับมาเหมือนเดิม
                }, 10);
            }
        });
    }
});