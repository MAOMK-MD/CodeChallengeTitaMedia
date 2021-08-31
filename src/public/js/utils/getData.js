const API = 'https://api.unsplash.com/photos/?client_id=zTegDmFSd3C6Mml3HYTrChCZZctGYjXDxHoz-Yo11C4';
const apiSearch = 'https://api.unsplash.com/search/photos?client_id=zTegDmFSd3C6Mml3HYTrChCZZctGYjXDxHoz-Yo11C4';

let actualPage = 1;
let actualQuery = '';

const getData = async (page,query) => {
   let apiUrl = API;
   if(page){
      actualPage = page;
      apiUrl = `${API}&page=${actualPage}`;
      if(actualQuery != ''){
         apiUrl = `${apiSearch}&page=${actualPage}&query=${actualQuery}`;
      }
   }

   if(query){
      actualQuery = query;
      apiUrl = `${apiSearch}&page=${actualPage}&query=${actualQuery}`;

      if(actualQuery == 'all'){
         actualQuery = '';
         apiUrl = API;
      }
   }


   try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if(actualQuery != ''){
         return data.results;
      }
      return data;
   } catch (error) {
      console.log('Fetch error', error)
   }
}

export default getData;