const BASE_URL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?"

document.addEventListener("DOMContentLoaded", function(){
  fetch(BASE_URL + 'location=long?beach', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  })
  .then(resp => resp.json())
  .then(json => console.log(json))

  



})
