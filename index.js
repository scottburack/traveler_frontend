const BASE_URL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?"
const RAILS_TRIP_API = "http://localhost:3000/api/v1/trips"
document.addEventListener("DOMContentLoaded", function(){

  //#################TESTING YELP API
  fetch(BASE_URL + 'location=long?beach', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  })
  .then(resp => resp.json())
  .then(json => console.log(json))


  //##################CREATING TRIP FORM



  let form = document.getElementById('trip-form')
  form.addEventListener('submit', function(e){
    e.preventDefault()
    let name = e.target.children[1].value
    let city = e.target.children[3].value
    let state = e.target.children[5].value
    let country = e.target.children[7].value

    //#########REFACTOR LATER
    let tripElement = document.createElement('div')
    if(state === ""){
      tripElement.innerHTML = (`
        <h5>${name}</h5>
        <p>${city} - ${country}</p>
        <button id='add-events'>Add Events!</button>
        <br>
        `)
    }
    else{
      tripElement.innerHTML = (`
        <h5>${name}</h5>
        <p>${city}, ${state} - ${country}</p>
        <button id='add-events'>Add Events!</button>
        <br>
        `)
    }
    tripsList.append(tripElement)


    // debugger
    fetch(RAILS_TRIP_API, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        city: city,
        state: state,
        country: country
      }),
      headers: {'Content-Type': 'application/json'}
    }).then(form.reset())
    .then(form.style.visibility = 'hidden')
  })


  //#####################RENDER TRIPS TO PAGE

  let tripsList = document.getElementById('trips-list')
  let getTrips = () => {
    return fetch(RAILS_TRIP_API)
    .then(resp => resp.json())
  }

  let renderTrips = (json) => {
    tripsList.innerHTML = ""
    json.forEach(function(trip){
      let tripElement = document.createElement('div')
      if(trip.state === ""){
        tripElement.innerHTML = (`
          <h5>${trip.name}</h5>
          <p>${trip.city} - ${trip.country}</p>
          <button id='add-events'>Add Events!</button>
          <br>
          `)
      }
      else{
        tripElement.innerHTML = (`
          <h5>${trip.name}</h5>
          <p>${trip.city}, ${trip.state} - ${trip.country}</p>
          <button id='add-events'>Add Events!</button>
          <br>
          `)
      }
      tripsList.append(tripElement)
    })
  }
getTrips().then(json => renderTrips(json))
//##############SHOW TRIP FORM ON PAGE

let addTripButton = document.getElementById('add-trip')
addTripButton.addEventListener('click', function(){
  form.style.visibility = 'visible'
})

})
