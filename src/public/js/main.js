const initHamburger = () => {
   const hamburger = document.querySelector('.hamburger');
   hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      document.getElementById('navigation').classList.toggle('is-active');
   })
}

initHamburger();