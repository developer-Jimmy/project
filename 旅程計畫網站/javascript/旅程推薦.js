document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const resultsContainer = document.getElementById("results-container");
  const recommendedContent = document.getElementById("recommended-content");
  const destinations = [
    { title: "巴黎", description: "浪漫之都", img: "../img/旅程推薦圖片/巴黎搜尋.jpg" },
    { title: "冰島", description: "觀賞極光與火山奇景。", img: "../img/旅程推薦圖片/冰島搜尋.jpg" },
    { title: "東京", description: "探索日本文化與美食。", img: "../img/旅程推薦圖片/東京搜尋.jpg" },
    { title: "阿姆斯特丹", description: "運河之旅，文化之都。", img: "../img/旅程推薦圖片/阿姆斯特丹搜尋.jpg" },
    { title: "紐約", description: "永不眠的城市。", img: "../img/旅程推薦圖片/紐約搜尋.jpg" },
    { title: "倫敦", description: "歷史與現代的完美融合。", img: "../img/旅程推薦圖片/倫敦搜尋.jpg" },
    { title: "雪梨", description: "壯觀的歌劇院與港灣大橋。", img: "../img/旅程推薦圖片/雪梨搜尋.jpg" },
    { title: "佛羅倫斯", description: "藝術與文藝復興的搖籃。", img: "../img/旅程推薦圖片/佛羅倫斯搜尋.jpg" },
    { title: "里約熱內盧", description: "熱情的嘉年華與海灘。", img: "../img/旅程推薦圖片/里約熱內盧搜尋.jpg" },
  ];

  const resultsPerPage = 6; // 每頁顯示的結果數量
  let currentPage = 1; // 當前頁碼
  let filteredResults = []; // 儲存搜尋結果

  // 處理搜尋表單提交
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    if (query === "") return;

    // 過濾搜尋結果
    filteredResults = destinations.filter((dest) =>
      dest.title.toLowerCase().includes(query) || dest.description.toLowerCase().includes(query)
    );

    // 重置頁碼並顯示第一頁
    currentPage = 1;
    displayResults(filteredResults, currentPage);
  });

  // 顯示搜尋結果的函數
  function displayResults(results, page) {
    resultsContainer.innerHTML = ""; // 清空舊結果

    const start = (page - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const paginatedResults = results.slice(start, end);

    if (paginatedResults.length === 0) {
      resultsContainer.innerHTML = `<p style="color: white" class="text-center">沒有找到符合條件的結果。</p>`;
    } else {
      paginatedResults.forEach((result) => {
        const card = `
            <div class="col-md-4 mb-4">
              <div class="card">
                <img src="${result.img}" class="card-img-top" alt="${result.title}">
                <div class="card-body">
                  <h5 class="card-title">${result.title}</h5>
                  <p class="card-text">${result.description}</p>
                </div>
              </div>
            </div>
          `;
        resultsContainer.innerHTML += card;
        updateContent();

      });
    }
    searchResults.classList.remove("d-none");
  }
  // 更新整頁內容
  function updateContent() {
    recommendedContent.innerHTML = "";
  }
});

// 了解更多
document.addEventListener("DOMContentLoaded", function () {
  const learnMoreButtons = document.querySelectorAll(".btn-primary.mt-2.w-100");

  learnMoreButtons.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const title = this.closest(".card").querySelector(".card-title").textContent;
      const description = this.closest(".card").querySelector(".card-text").textContent;

      const modalContent = `
              <div class="modal fade" id="learnMoreModal" tabindex="-1" aria-labelledby="learnMoreModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title text-black" id="learnMoreModalLabel">${title}</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                              <p class="text-black">${description}</p>
                 <img src="../img/旅程推薦圖片/詳情圖片${index + 1}.jpg" class="img-fluid text-black" alt="詳細圖片">
                              <p class="text-black">此旅程包含以下特色：</p>
                              <ul>
                                  <li class="text-black">詳細描述 1</li>
                                  <li class="text-black">詳細描述 2</li>
                                  <li class="text-black">詳細描述 3</li>
                              </ul>
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                          </div>
                      </div>
                  </div>
              </div>
          `;

      document.body.insertAdjacentHTML("beforeend", modalContent);

      const modal = new bootstrap.Modal(document.getElementById("learnMoreModal"));
      modal.show();

      // 清理模態框
      document.getElementById("learnMoreModal").addEventListener("hidden.bs.modal", function () {
        document.getElementById("learnMoreModal").remove();
      });
    });
  });
});



// 排行榜
document.addEventListener("DOMContentLoaded", function () {
  const rankingContainer = document.getElementById("ranking-container");

  // 原始數據
  const cardData = [
    { title: "阿姆斯特丹", description: "運河之旅，文化之都。", image: "../img/旅程推薦圖片/阿姆斯特丹搜尋.jpg", likes: 25, rating: 4.8 },
    { title: "佛羅倫斯", description: "藝術與文藝復興的搖籃。", image: "../img/旅程推薦圖片/佛羅倫斯搜尋.jpg", likes: 30, rating: 4.5 },
    { title: "里約熱內盧", description: "熱情的嘉年華與海灘。", image: "../img/旅程推薦圖片/里約熱內盧搜尋.jpg", likes: 20, rating: 4.2 }
  ];

  // 渲染排行榜卡片
  function renderRanking() {
    // 先清空內容
    rankingContainer.innerHTML = "";

    // 根據喜歡數量排序
    const sortedData = cardData.map((item, originalIndex) => ({
      ...item,
      originalIndex,
    })).sort((a, b) => b.likes - a.likes);

    // 動態生成卡片
    sortedData.forEach((item, displayIndex) => {
      const cardHtml = `
         <div class="col-md-4 mb-4">
             <div class="card h-100 shadow-sm">
                 <div class="position-relative">
                     <img src="${item.image}" class="card-img-top" alt="${item.title}">
                     <span class="w-25 badge bg-danger position-absolute top-0 start-0 m-2">#${displayIndex + 1}</span>
                 </div>
                 <div class="card-body">
                     <h5 class="card-title">${item.title}</h5>
                     <p class="card-text">${item.description}</p>
                     <div class="d-flex justify-content-between align-items-center">
                         <!-- 喜歡按鈕 -->
                         <button class="btn btn-outline-danger like-btn" data-original-index="${item.originalIndex}">
                             <i class="bi bi-heart"></i> 喜歡 (<span class="like-count">${item.likes}</span>)
                         </button>
                         <!-- 評分 -->
                         <div class="rating text-muted">
                             ${generateStars(item.rating)} 
                             <span class="rating-score">(${item.rating.toFixed(1)}/5)</span>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     `;
      rankingContainer.insertAdjacentHTML("beforeend", cardHtml);
    });
  }
  // 生成星星
  function generateStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        starsHtml += '<i class="bi bi-star-fill text-warning"></i>'; // 滿星
      } else if (i - rating <= 0.5) {
        starsHtml += '<i class="bi bi-star-half text-warning"></i>'; // 半星
      } else {
        starsHtml += '<i class="bi bi-star text-secondary"></i>'; // 空星
      }
    }
    return starsHtml;
  }

  // 綁定喜歡按鈕事件（事件委託）
  rankingContainer.addEventListener("click", function (event) {
    const button = event.target.closest(".like-btn");
    if (button) {
      const originalIndex = button.getAttribute("data-original-index");
      if (originalIndex !== null) {
        cardData[originalIndex].likes += 1; // 增加喜歡數
        renderRanking(); // 重新渲染排行榜
      }
    }
  });

  // 初始化渲染
  renderRanking();
});

// 喜歡按鈕功能
document.addEventListener("DOMContentLoaded", function () {
  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const likeCountSpan = this.querySelector(".like-count");
      let currentLikes = parseInt(this.getAttribute("data-likes"));
      currentLikes += 1; // 每點擊一次數量 +1
      this.setAttribute("data-likes", currentLikes);
      likeCountSpan.textContent = currentLikes;
    });
  });
});




// 評分功能
document.addEventListener("DOMContentLoaded", function () {
  // 選擇所有評分區塊
  const ratingSections = document.querySelectorAll(".rating");

  // 針對每個評分區塊綁定事件
  ratingSections.forEach((section) => {
    const stars = section.querySelectorAll(".rating-stars i");
    const scoreDisplay = section.querySelector(".rating-score");

    // 更新星星與分數
    function updateRating(rating) {
      stars.forEach((star, index) => {
        if (index < rating) {
          star.classList.remove("text-muted");
          star.classList.add("text-warning");
          star.classList.replace("bi-star", "bi-star-fill");
        } else {
          star.classList.remove("text-warning");
          star.classList.add("text-muted");
          star.classList.replace("bi-star-fill", "bi-star");
        }
      });
      scoreDisplay.textContent = `(${rating}/5)`;
    }

    // 星星點擊事件
    stars.forEach((star) => {
      star.addEventListener("click", function () {
        const selectedRating = parseInt(this.getAttribute("data-value"));
        updateRating(selectedRating);
      });
    });
  });
});

// 換頁功能
document.addEventListener("DOMContentLoaded", function () {
  const recommendedContent = document.getElementById("recommended-content");
  console.log(recommendedContent);
  const paginationItems = document.querySelectorAll(".pagination .page-item a");
  const prevPage = document.getElementById("prev-page");
  const nextPage = document.getElementById("next-page");

  let currentPage = 1; // 當前頁碼
  const totalPages = 5; // 總頁數

  // 更新討論內容
  function updateContent(page) {
    recommendedContent.innerHTML = `<p style="color: white;">正在顯示第 ${page} 頁內容...</p>`;
  }

  // 更新分頁按鈕狀態
  function updatePagination(page) {
    // 重置所有頁碼按鈕的狀態
    paginationItems.forEach((item) => {
      const parent = item.parentElement;
      parent.classList.remove("active");
    });

    // 激活當前頁碼按鈕
    document.querySelector(`[data-page="${page}"]`).parentElement.classList.add("active");

    // 控制 "上一頁" 和 "下一頁" 按鈕狀態
    prevPage.classList.toggle("disabled", page === 1);
    nextPage.classList.toggle("disabled", page === totalPages);
  }

  // 點擊頁碼按鈕
  paginationItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const page = parseInt(this.getAttribute("data-page"));
      if (!isNaN(page)) {
        currentPage = page;
        updateContent(currentPage);
        updatePagination(currentPage);
      }
    });
  });

  // 點擊上一頁
  prevPage.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      updateContent(currentPage);
      updatePagination(currentPage);
    }
  });

  // 點擊下一頁
  nextPage.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      updateContent(currentPage);
      updatePagination(currentPage);
    }
  });

  // 初始化
  updatePagination(currentPage);
});