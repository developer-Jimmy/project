

// 顯示登出
const logoutLink = document.getElementById('logoutLink');




//登出功能（模擬）
logoutLink.addEventListener('click', function () {
    // 處理登出邏輯，這裡是模擬
    alert('您已經登出');
    // 可以清除localStorage或cookie等
    localStorage.removeItem('isLoggedIn');
    window.location.href = "../會員帳號密碼/會員登入.html"; // 刷新頁面
});
