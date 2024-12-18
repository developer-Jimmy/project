
// 帳戶安全
// 啟用雙重身份驗證
document.getElementById('enable2FA').addEventListener('click', function () {
    document.getElementById('2faStatus').innerText = '雙重身份驗證已啟用';
    document.getElementById('enable2FA').disabled = true;
});


// 受邀計畫
// 模擬的計劃詳細資料
let plans = [
    {
        id: 1,
        name: "台北旅行",
        itinerary: {
            destination: "台北市, 台灣",
            startDate: "2024年12月15日",
            endDate: "2024年12月20日",
            flight: "國泰航空 CX 101",
            flightTime: "2024年12月15日 10:00 AM",
            hotel: "台北君悅酒店",
            checkIn: "2024年12月15日",
            checkOut: "2024年12月20日",
            essentials: ["護照", "機票", "信用卡"],
            personalItems: ["牙刷", "洗髮水", "洗面乳"],
            electronics: ["手機", "充電器", "耳機"]
        }
    }
];

let currentPlan = null; // 當前查看的計劃

// 進入查看詳情模式
document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const planId = e.target.getAttribute('data-plan-id');
        currentPlan = plans.find(p => p.id == planId);

        if (currentPlan) {
            // 填充數據到彈窗
            loadDetails(currentPlan);

            // 顯示 Modal
            const modal = new bootstrap.Modal(document.getElementById('planDetailsModal'));
            modal.show();
        }
    });
});

// 動態加載計劃內容
function loadDetails(plan) {
    const detailsContainer = document.getElementById('modal-details-container');
    detailsContainer.innerHTML = `
        <section class="section-header">
            <h4>行程規劃</h4>
        </section>
        <div class="item-block">
            <h5>目的地</h5>
            <p class="editable" data-key="destination">${plan.itinerary.destination}</p>
            <h5>出發日期</h5>
            <p class="editable" data-key="startDate">${plan.itinerary.startDate}</p>
            <h5>回程日期</h5>
            <p class="editable" data-key="endDate">${plan.itinerary.endDate}</p>
        </div>
        <section class="section-header">
            <h4>交通規劃</h4>
        </section>
        <div class="item-block">
            <h5>航班資訊</h5>
            <p class="editable" data-key="flight">${plan.itinerary.flight}</p>
            <h5>出發時間</h5>
            <p class="editable" data-key="flightTime">${plan.itinerary.flightTime}</p>
        </div>
        <section class="section-header">
            <h4>住宿規劃</h4>
        </section>
        <div class="item-block">
            <h5>酒店名稱</h5>
            <p class="editable" data-key="hotel">${plan.itinerary.hotel}</p>
            <h5>入住日期</h5>
            <p class="editable" data-key="checkIn">${plan.itinerary.checkIn}</p>
            <h5>退房日期</h5>
            <p class="editable" data-key="checkOut">${plan.itinerary.checkOut}</p>
        </div>
    `;
}

// 切換到編輯模式
document.getElementById('edit-btn').addEventListener('click', () => {
    toggleEditMode(true);
});

// 保存編輯內容
document.getElementById('save-btn').addEventListener('click', () => {
    const editFields = document.querySelectorAll('.editable');
    editFields.forEach(field => {
        const key = field.getAttribute('data-key');
        const newValue = field.querySelector('input').value;
        currentPlan.itinerary[key] = newValue; // 更新數據
    });

    loadDetails(currentPlan); // 重載詳情
    toggleEditMode(false);
});

// 取消編輯
document.getElementById('cancel-btn').addEventListener('click', () => {
    loadDetails(currentPlan); // 恢復原始數據
    toggleEditMode(false);
});

// 切換編輯模式
function toggleEditMode(editable) {
    const editFields = document.querySelectorAll('.editable');
    editFields.forEach(field => {
        const key = field.getAttribute('data-key');
        if (editable) {
            const currentValue = field.textContent;
            field.innerHTML = `<input type="text" class="form-control" value="${currentValue}">`;
        } else {
            const input = field.querySelector('input');
            if (input) {
                field.textContent = input.value; // 保存時更新顯示
            }
        }
    });

    // 切換按鈕顯示
    document.getElementById('edit-btn').classList.toggle('d-none', editable);
    document.getElementById('save-btn').classList.toggle('d-none', !editable);
    document.getElementById('cancel-btn').classList.toggle('d-none', !editable);
}


// 直播後台
function startStream() {
    // 更新直播狀態為直播中
    document.getElementById("streamStatus").textContent = "直播中";
    document.getElementById("streamStatus").className = "status-online";

    // 顯示即時指示燈
    document.getElementById("liveIndicator").style.display = "flex";
}

function stopStream() {
    // 更新直播狀態為離線
    document.getElementById("streamStatus").textContent = "離線";
    document.getElementById("streamStatus").className = "status-offline";

    // 隱藏即時指示燈
    document.getElementById("liveIndicator").style.display = "none";
}