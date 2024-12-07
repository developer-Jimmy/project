document.addEventListener("DOMContentLoaded", function () {
    const discussionContent = document.getElementById("discussion-content");
    const paginationItems = document.querySelectorAll(".pagination .page-item a");
    const prevPage = document.getElementById("prev-page");
    const nextPage = document.getElementById("next-page");
  
    let currentPage = 1; // 當前頁碼
    const totalPages = 5; // 總頁數
  
    // 更新討論內容
    function updateContent(page) {
      discussionContent.innerHTML = `<p>正在顯示第 ${page} 頁內容...</p>`;
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