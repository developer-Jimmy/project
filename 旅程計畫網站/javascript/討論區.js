document.getElementById("newThreadForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("threadTitle").value.trim();
  const content = document.getElementById("threadContent").value.trim();

  if (title && content) {
    const threadHtml = `
      <div class="card">
          <div class="card-header d-flex align-items-center">
              <div class="discussion-header">${title}</div>
          </div>
          <div class="card-body">
              <p>${content}</p>
              <a href="#" class="btn btn-primary">閱讀更多</a>
              <div class="discussion-meta mt-3">
                  <span class="like-count">按讚數: 0</span> |
                  <span class="post-count">貼文數: 0</span>
              </div>
          </div>
      </div>
    `;

    // 插入到討論區頂部
    document.getElementById("discussion-content").insertAdjacentHTML("afterbegin", threadHtml);

    // 清空輸入框
    document.getElementById("threadTitle").value = "";
    document.getElementById("threadContent").value = "";

    // 關閉模態框
    const newThreadModal = bootstrap.Modal.getInstance(document.getElementById("newThreadModal"));
    newThreadModal.hide();
  }
});




// 綁定事件委派到父層容器
document.getElementById("discussion-content").addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("btn-primary")) {
    e.preventDefault();

    // 找到被點擊的卡片
    const card = e.target.closest(".card");
    const title = card.querySelector(".discussion-header")?.textContent || "無標題";
    const description = card.querySelector("p")?.textContent || "暫無內容";

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
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                      <button type="button" class="btn btn-primary">加入討論</button>
                  </div>
              </div>
          </div>
      </div>
    `;

    // 插入模態框到頁面
    document.body.insertAdjacentHTML("beforeend", modalHtml);

    // 顯示模態框
    const modal = new bootstrap.Modal(document.getElementById("readMoreModal"));
    modal.show();

    // 模態框關閉後移除 DOM
    document.getElementById("readMoreModal").addEventListener("hidden.bs.modal", function () {
      document.getElementById("readMoreModal").remove();
    });
  }
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