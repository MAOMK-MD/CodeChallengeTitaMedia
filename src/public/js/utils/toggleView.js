const toggleGrid = document.getElementById('toggleGrid');
const toggleRow = document.getElementById('toggleRow');
const gridWrapper = document.getElementById('gridWrapper');

const toggleView = () => {
   toggleGrid.addEventListener('click', () => {
      gridWrapper.classList.remove('is-row'),
      toggleGrid.classList.add('is-active');
      toggleRow.classList.remove('is-active');
   })

   toggleRow.addEventListener('click', () => {
      gridWrapper.classList.add('is-row')
      toggleRow.classList.add('is-active');
      toggleGrid.classList.remove('is-active');
   })
}

export default toggleView;