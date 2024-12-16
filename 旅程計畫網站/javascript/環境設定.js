// 模擬用戶登入狀態

// 在页面加载时读取存储的布尔值
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // 假設用戶已登入，這裡可以從localStorage或cookie讀取狀態
   
// 控制顯示登入註冊或個人頁面登出
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const profileLink = document.getElementById('profileLink');
    const logoutLink = document.getElementById('logoutLink');

if (isLoggedIn) {
    // 顯示個人頁面和登出，隱藏登入和註冊
    loginLink.style.display = 'none';
    registerLink.style.display = 'none';
    profileLink.style.display = 'block';
    logoutLink.style.display = 'block';
} else {
    // 顯示登入和註冊，隱藏個人頁面和登出
    loginLink.style.display = 'block';
    registerLink.style.display = 'block';
    profileLink.style.display = 'none';
    logoutLink.style.display = 'none';
    }

    //登出功能（模擬）
    logoutLink.addEventListener('click', function () {
    // 處理登出邏輯，這裡是模擬
    alert('您已經登出');
    // 可以清除localStorage或cookie等
    localStorage.removeItem('isLoggedIn');
    window.location.href="./會員帳號密碼/會員登入.html"; // 刷新頁面
    });
    AOS.init({
        duration: 1200, // 動畫持續時間（毫秒）
        easing: 'ease-in-out', // 動畫效果
        once: true, // 滾動時是否只執行一次
        mirror: false // 是否當元素滾出視口時反向執行動畫
    });


    