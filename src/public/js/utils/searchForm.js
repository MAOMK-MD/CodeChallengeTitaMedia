const searchBtn = document.getElementById('searchBtn');
const searchForm = document.querySelector('.js-search');

const initSearch = () => {
   searchBtn.addEventListener('click', () => {
      searchForm.classList.toggle('is-active');
   })

   searchForm.addEventListener('mouseleave', () => {
      setTimeout(() => {
         searchForm.classList.toggle('is-active');
      }, 3000);
   })
}

export default initSearch;