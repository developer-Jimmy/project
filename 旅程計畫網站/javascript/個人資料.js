// 模擬計畫資料
const plans = [
  {
    name: "台北五日遊",
    destination: "台北市, 台灣",
    startDate: "2024-12-15",
    endDate: "2024-12-20",
    status: "incomplete", // 狀態
    transportation: "國泰航空 CX 101",
    accommodation: "台北君悅酒店",
    items: ["護照", "機票", "信用卡", "手機", "充電器"]
  },
  {
    name: "日本滑雪之旅",
    destination: "北海道, 日本",
    startDate: "2025-01-10",
    endDate: "2025-01-17",
    status: "incomplete", // 狀態
    transportation: "全日空 NH 205",
    accommodation: "二世谷滑雪度假村",
    items: ["護照", "滑雪裝備", "暖寶寶", "充電器"]
  },
  {
    name: "京都文化之旅",
    destination: "京都, 日本",
    startDate: "2023-04-05",
    endDate: "2023-04-10",
    status: "complete", // 狀態
    transportation: "新幹線 Nozomi 231",
    accommodation: "京都凱悅飯店",
    items: ["護照", "和服租賃券", "交通卡", "手機", "相機"]
  },
  {
    name: "夏威夷度假",
    destination: "夏威夷, 美國",
    startDate: "2023-07-01",
    endDate: "2023-07-08",
    status: "complete", // 狀態
    transportation: "夏威夷航空 HA 450",
    accommodation: "威基基海灘度假村",
    items: ["護照", "泳衣", "防曬乳", "充電器", "墨鏡"]
  }
];

const incompletePlansContainer = document.getElementById("incompletePlansContainer");
const completePlansContainer = document.getElementById("completePlansContainer");
const planDetails = document.getElementById("planDetails");

// 動態生成計畫卡片
function renderPlans(plans, container, statusClass, btnClass) {
  container.innerHTML = "";
  plans.forEach((plan, index) => {
    const planCard = document.createElement("div");
    planCard.className = `status-${statusClass}`;
    planCard.innerHTML = `
      <h5>${plan.name}</h5>
      <p>
        <strong>目的地：</strong> ${plan.destination}<br>
        <strong>日期：</strong> ${plan.startDate} - ${plan.endDate}
      </p>
      <a class="btn btn-secondary">相關照片</a>
      <a class="btn btn-secondary">相關影片</a>
      <button class="btn ${btnClass}" onclick="viewDetails(${index})">查看詳細</button>
      <a class="btn btn-info">共享計畫</a>
      <a class="btn btn-danger">刪除計畫</a>
    `;
    container.appendChild(planCard);
  });
}

// 查看詳細資訊
function viewDetails(index) {
  const plan = plans[index];
  planDetails.innerHTML = `
    <h4>${plan.name}</h4>
    <p><strong>目的地：</strong> ${plan.destination}</p>
    <p><strong>行程日期：</strong> ${plan.startDate} - ${plan.endDate}</p>
    <p><strong>交通方式：</strong> ${plan.transportation}</p>
    <p><strong>住宿：</strong> ${plan.accommodation}</p>
    <p><strong>攜帶物品：</strong></p>
    <ul>
      ${plan.items.map(item => `<li>${item}</li>`).join("")}
    </ul>
     <div id="previewContainer">
  `;
  const modal = new bootstrap.Modal(document.getElementById('planDetailModal'));
  modal.show();
}

// 初始渲染未完成和已完成計畫
renderPlans(
  plans.filter(plan => plan.status === "incomplete"),
  incompletePlansContainer,
  "incomplete",
  "btn-warning"
);

renderPlans(
  plans.filter(plan => plan.status === "complete"),
  completePlansContainer,
  "complete",
  "btn-primary"
);




