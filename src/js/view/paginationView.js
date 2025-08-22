const paginationContainer = document.querySelector('.pagination-container');
function generateTemplate(numPages, currentPage) {
  return `<ul class="pagination justify-content-center">
                <li class="page-item  ${currentPage === 1 ? 'disabled' : ''}" data-num-page='${currentPage - 1}'>
                  <a class="page-link">Previous</a>
                </li>
                ${
                  currentPage - 1 <= numPages && currentPage - 1 != 0
                    ? `<li class="page-item" data-num-page='${currentPage - 1}'><a class="page-link" >${
                        currentPage - 1
                      }</a></li>`
                    : ''
                }
                <li class="page-item active" data-num-page='${currentPage}'><a class="page-link" >${currentPage}</a></li>
                ${
                  currentPage + 1 <= numPages
                    ? `<li class="page-item" data-num-page='${currentPage + 1}'><a class="page-link" >${
                        currentPage + 1
                      }</a></li>`
                    : ''
                }
                <li class="page-item  ${currentPage + 1 <= numPages ? '' : 'disabled'}" data-num-page='${
    currentPage + 1
  }'><a class="page-link">Next</a></li>
              </ul>
            `;
}
export function render(numPages, currentPage) {
  const template = generateTemplate(numPages, currentPage);
  paginationContainer.innerHTML = template;
}
