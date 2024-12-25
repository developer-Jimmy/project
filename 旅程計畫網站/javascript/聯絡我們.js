document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // 防止表單默認提交

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            // 表單完整性檢查
            if (!name || !email || !message) {
                showAlert("請完整填寫表單內容！", "danger");
                return; // 正確的位置：在函數內
            }

            // 電子郵件格式驗證
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert("請輸入有效的電子郵件地址！", "danger");
                return; // 正確的位置：在函數內
            }

            // 附加檔案大小限制
            const attachment = document.getElementById("attachment").files[0];
            if (attachment && attachment.size > 5 * 1024 * 1024) {
                showAlert("檔案大小不能超過 5MB！", "danger");
                return; // 正確的位置：在函數內
            }

            showAlert("訊息已成功送出！", "success");
            contactForm.reset(); // 清空表單
        });
    }

    // 顯示提示訊息的函數
    function showAlert(message, type) {
        const alertDiv = document.createElement("div");
        alertDiv.className = `alert alert-${type} mt-3`;
        alertDiv.textContent = message;

        contactForm.insertAdjacentElement("afterend", alertDiv);

        setTimeout(() => alertDiv.remove(), 3000);
    }
});
