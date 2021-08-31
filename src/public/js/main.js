import {initHamburger, hideMenu} from './utils/hamburgerMenu.js';
import initSearch from './utils/searchForm.js';
import toggleView from './utils/toggleView.js';
import getData from './utils/getData.js';
import consolePresentation from './utils/consolePresentation.js';

const wrapper = document.getElementById('gridWrapper');
const navLinks = document.querySelectorAll('.js-navItem a');

const showMoreBtn = document.getElementById('showMore');
const heroBtn = document.getElementById('heroBtn');

const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');

let urlSet = [];
let i = 1;

const scrollToGrid = () => {
   document.getElementById('gridNav').scrollIntoView({block: "start", behavior: "smooth"});
}

heroBtn.addEventListener('click',(event) => {
   event.preventDefault();
   scrollToGrid();
})

// Add the imgs to the grid-layout
const createGridElements = (srcImg) => {
   const div = document.createElement('div');
   const img = document.createElement('img');
   div.className = 'grid-layout__item'
   img.src = `${srcImg}`;
   div.appendChild(img);
   wrapper.appendChild(div);
}

// reset grid-layout with the array as argument
const resetGrid = (str,arr) => {
   if(arr.length > 0){
      urlSet = [];
      arr.forEach(element => {
         urlSet.push(element.urls.raw);
      });
      wrapper.innerHTML = str != "" ? `<div class="grid-layout__item grid-layout__item--main">
            <h2>CREATIVE LOGO</h2>
            <h4>${str}</h4>
          </div>` : "";
   }else{
      const div = document.createElement('div');
      const p = document.createElement('p');
      p.innerText = 'No content found';
      div.appendChild(p);
      wrapper.innerHTML = "";
      wrapper.appendChild(div);
   }
   scrollToGrid();
}

// print images stored in urlSet
const printImages = () => {
   if(urlSet.length > 0){
      urlSet.forEach(element => {
         createGridElements(element)
      });
   }   
}

const searchByString = async (str) => {
   const searchData= await getData(i, str.trim().toLowerCase());
   return searchData;
}

searchForm.addEventListener('submit', async (event) => {
   event.preventDefault();
   let str = searchInput.value;
   i = 1;
   const data = await searchByString(str);
   resetGrid(str,data);
   printImages();
   searchInput.value = "";
})

// init grid-layout
const initGrid = async () => {
   const data = await getData();
   const str = 'All'
   resetGrid(str,data);
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

// set active nav-link (header & grid)
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
         resetGrid(element.dataset.name,data)
         printImages()
      })
   })  
}


getDataByQuery();
initHamburger();
toggleView();
initSearch();
initGrid();
consolePresentation();