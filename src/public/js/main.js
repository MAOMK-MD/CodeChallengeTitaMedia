import {initHamburger, hideMenu} from './utils/hamburgerMenu.js';
import initSearch from './utils/searchForm.js';
import getData from './utils/getData.js';

const wrapper = document.getElementById('gridWrapper');
const showMoreBtn = document.getElementById('showMore');
const navLinks = document.querySelectorAll('.js-navItem a');

const searchInput = document.getElementById('searchInput');
const searchCta = document.getElementById('searchCta');

let urlSet = [];
let i = 1;

const createGridElements = (srcImg) => {
   const div = document.createElement('div');
   const img = document.createElement('img');
   div.className = 'grid-layout__item'
   img.src = `${srcImg}`;
   div.appendChild(img);
   wrapper.appendChild(div);
}

const resetGrid = (arr) => {
   urlSet = [];
   arr.forEach(element => {
      urlSet.push(element.urls.raw);
   });
   wrapper.innerHTML = "";
}

const printImages = () => {
   urlSet.forEach(element => {
      createGridElements(element)
   });
}

const searchByString = async (str) => {
   const searchData= await getData(i, str.trim().toLowerCase());
   return searchData;
}

searchCta.addEventListener('click', async () => {
   let str = searchInput.value;
   i = 1;
   const data = await searchByString(str);
   resetGrid(data);
   printImages();
   searchInput.value = "";
})

const initGrid = async () => {
   const data = await getData();
   resetGrid(data);
   printImages();
}

showMoreBtn.addEventListener('click', async () => {
   i++;
   const data= await getData(i);
   data.forEach(element => {
      createGridElements(element.urls.raw)
      urlSet.push(element.urls.raw);
   });
});

const setActive = (link) => {
   navLinks.forEach(element => {
      let parent = element.parentElement;
      if(parent.classList.contains('is-active')){
         parent.classList.remove('is-active')
      }

      if(element.dataset.name == link.dataset.name){
         element.parentElement.classList.add('is-active');         
      }
   })
   hideMenu();
};

const getDataByQuery = () => {
   navLinks.forEach(element => {
      element.addEventListener('click', async (event) => {
         event.preventDefault();
         i = 1;
         setActive(element);
         const data= await getData(i, element.dataset.name.toLowerCase());
         resetGrid(data)
         printImages()
      })
   })  
}


getDataByQuery();
initHamburger();
initSearch();
initGrid();