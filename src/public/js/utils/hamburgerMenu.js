const hamburger = document.querySelector('.hamburger');
const nav = document.getElementById('navigation');

const toggleActive = () => {
   nav.classList.toggle('is-active');
   hamburger.classList.toggle('is-active');
}

const initHamburger = () => {
   hamburger.addEventListener('click', () => {
      toggleActive();
   })
}

const hideMenu = () => {
   nav.classList.remove('is-active');
   hamburger.classList.remove('is-active');
}

export {initHamburger, hideMenu};