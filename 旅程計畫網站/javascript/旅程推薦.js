document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const resultsContainer = document.getElementById("results-container");
  const recommendedContent = document.getElementById("recommended-content");
  const destinations = [
    { title: "巴黎", description: "浪漫之都", img : "../img/旅程推薦圖片/巴黎搜尋.jpg" },
    { title: "冰島", description: "觀賞極光與火山奇景", img: "../img/旅程推薦圖片/冰島搜尋.jpg" },
    { title: "東京", description: "探索日本文化與美食", img: "../img/旅程推薦圖片/東京搜尋.jpg" },
    { title: "阿姆斯特丹", description: "迷人的運河與花卉", img: "../img/旅程推薦圖片/阿姆斯特丹搜尋.jpg" },
    { title: "紐約", description: "永不眠的城市", img: "../img/旅程推薦圖片/紐約搜尋.jpg" },
    { title: "倫敦", description: "歷史與現代的完美融合", img: "../img/旅程推薦圖片/倫敦搜尋.jpg" },
    { title: "雪梨", description: "壯觀的歌劇院與港灣大橋", img: "../img/旅程推薦圖片/雪梨搜尋.jpg" },
    { title: "佛羅倫斯", description: "藝術與文藝復興的搖籃", img: "../img/旅程推薦圖片/佛羅倫斯搜尋.jpg" },
    { title: "里約熱內盧", description: "熱情的嘉年華與海灘", img: "../img/旅程推薦圖片/里約熱內盧搜尋.jpg" },
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

