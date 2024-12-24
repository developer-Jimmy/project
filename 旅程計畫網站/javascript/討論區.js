// 閱讀更多
document.addEventListener("DOMContentLoaded", function () {
  // 綁定所有「閱讀更多」按鈕
  const readMoreButtons = document.querySelectorAll(".btn-primary");

  readMoreButtons.forEach((button, index) => {
      button.addEventListener("click", function (e) {
          e.preventDefault();

          // 獲取對應的討論標題與內容
          const card = this.closest(".card");
          const title = card.querySelector(".discussion-header").textContent;
          const description = card.querySelector("p").textContent;

          // 動態創建模態框內容
          const modalHtml = `
              <div class="modal fade" id="readMoreModal" tabindex="-1" aria-labelledby="readMoreModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-lg">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title" id="readMoreModalLabel">${title}</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                              <p>${description}</p>
                              <hr>
                              <p>更多內容正在撰寫中，敬請期待...</p>
                              <div class="alert alert-info mt-3" role="alert">
                                  <strong>提示：</strong>加入我們的社群，獲得最新的內容更新與參與討論！
                              </div>
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                              <button type="button" class="btn btn-primary">加入討論</button>
                          </div>
                      </div>
                  </div>
              </div>
          `;

          // 插入模態框到頁面中
          document.body.insertAdjacentHTML("beforeend", modalHtml);

          // 顯示模態框
          const modal = new bootstrap.Modal(document.getElementById("readMoreModal"));
          modal.show();

          // 模態框關閉時移除 DOM
          document.getElementById("readMoreModal").addEventListener("hidden.bs.modal", function () {
              document.getElementById("readMoreModal").remove();
          });
      });
  });
});






document.addEventListener("DOMContentLoaded", function () {
    const discussionContent = document.getElementById("discussion-content");
    const paginationItems = document.querySelectorAll(".pagination .page-item a");
    const prevPage = document.getElementById("prev-page");
    const nextPage = document.getElementById("next-page");
  
    let currentPage = 1; // 當前頁碼
    const totalPages = 5; // 總頁數
  
    // 更新討論內容
    function updateContent(page) {
      discussionContent.innerHTML = `<p style="color: white;">正在顯示第 ${page} 頁內容...</p>`;
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