const BASE_URL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?"
const RAILS_TRIP_API = "http://localhost:3000/api/v1/trips/"
const RAILS_EVENT_API = "http://localhost:3000/api/v1/events/"
const userId = 1
let showContainer = document.getElementById('show-container')
document.addEventListener("DOMContentLoaded", function(){




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

        let newTrip = new Trip(trip.id, trip.name, trip.city, trip.state, trip.country, trip.userId)
        tripElement.innerHTML = newTrip.render()
      tripsList.append(tripElement)
    })
  }

  /////// RENDERING EVENTS FOR SPECIFIC TRIP
  function getTripEvents() {
    let tripNames = document.getElementsByClassName("trip-name")
    for (let i = 0; i < tripNames.length; i++) {
      tripNames[i].addEventListener("click", function(e) {
        showContainer.innerHTML = ""
        let tripId = e.target.parentElement.children[2].dataset.id
        fetch(RAILS_TRIP_API + tripId + '/' + 'events')
        .then(resp => resp.json())
        .then(json => renderTripEvents(json))
      })
    }
  }

  function renderTripEvents(json) {
    json.forEach(function(json){
      let eventName = json.name
      let eventCategory = json.category
      let eventImageURL = json.imgURL
      let eventURL = json.url
      let eventDiv = document.createElement('div')
      eventDiv.innerHTML =
        `<h3><a href=${eventURL} target='_blank'>${eventName}</a></h3>
        <p>${eventCategory}</p>
        <img src=${eventImageURL}
        `
      showContainer.append(eventDiv)
    })

  }

  getTrips().then(json => renderTrips(json)).then(() => addEventListenersToAddEventButtons()).then(() => getTripEvents()).then(() => addEventListenersToDeleteTripButtons())



  //##################CREATING TRIP FORM
  let form = document.getElementById('trip-form')
  form.addEventListener('submit', function(e){
    e.preventDefault()

    let name = e.target.children[1].value
    let city = e.target.children[3].value
    let state = e.target.children[5].value
    let country = e.target.children[7].value
    // let newTrip = new Trip(name, city, state, country, userId)
    // let tripElement = document.createElement('div')
    // tripElement.innerHTML = newTrip.render()
    // tripsList.append(tripElement)

    fetch(RAILS_TRIP_API, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        city: city,
        state: state,
        country: country,
        user_id: userId
      }),
      headers: {'Content-Type': 'application/json'}
    }).then(() => getTrips()).then(json => renderTrips(json)).then(() => addEventListenersToAddEventButtons())
    .then(form.reset())
    .then(form.style.visibility = 'hidden')
  })




//##############SHOW TRIP FORM ON PAGE

let addTripButton = document.getElementById('add-trip')
addTripButton.addEventListener('click', function(){
  form.style.visibility = 'visible'
})


//#################RENDER EVENT FORM
function addEventListenersToAddEventButtons(){
  let eventButtons = document.getElementsByClassName('add-events')
  let eventButtonsArray = Array.from(eventButtons)
  eventButtonsArray.forEach(function(button){
    button.addEventListener('click', function(e){
      let eventForm = document.getElementById('trip-event-form')
      eventForm.style.visibility = 'visible'
      eventForm.dataset.id = e.target.dataset.id
      submitFormEvent(eventForm)
    })
  })
}

function submitFormEvent(eventForm){

  eventForm.addEventListener('submit', getInfoFromEventForm)

}

function getInfoFromEventForm(e){
  e.preventDefault()

  let submitBtnId = e.target.dataset.id
  let eventName = e.target.children[1].value
  let eventCategory;
  let eventCategories = e.target.children[3].children
  for(let i = 0; i < eventCategories.length; i++){
    if(eventCategories[i].checked){
       eventCategory = eventCategories[i].value
    }
  }
  fetch(RAILS_TRIP_API + submitBtnId)
  .then(resp => resp.json())
  .then(json => getYelpResults(eventName, eventCategory, json))
  // get location from trip form that was clicked
}

function getYelpResults(name, category, json) {
  let tripId = json.id
  let yelpURL;
  // debugger
  (json.state === "") ?  yelpURL = `location=${json.city}?${json.country}&` : yelpURL = `location=${json.city}?${json.state}?${json.country}&`
  // console.log(json.id)
  fetch(BASE_URL + yelpURL + `term=${category}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  })
  .then(resp => resp.json())
  .then(json => renderEvents(json, tripId))
}

function renderEvents(json, tripId){

  // debugger
  showContainer.innerHTML = ""
  json.businesses.forEach(function(event){
    let placeDiv = document.createElement('div')
    placeDiv.innerHTML = (`
      <h3><a href=${event.url} target="_blank">${event.name}</a></h3>
      <img class='event-img' src=${event.image_url}>
      <button data-id=${tripId} class='add-event'>Add Event To Your Trip!</button>
      `)
      showContainer.append(placeDiv)
  })

  let eventButtons = document.getElementsByClassName('add-event')
  for(let i = 0; i < eventButtons.length; i++){
    eventButtons[i].addEventListener('click', addEventToTrip)
  }
}

//#########ADD EVENT-LISTENER TO ADD EVENT BUTTONS
function addEventToTrip(e){

  let eventName = e.target.parentElement.children[0].children[0].innerHTML
  let eventURL = e.target.parentElement.children[0].children[0].href
  let imgURL = e.target.parentElement.children[1].src
  let tripId = e.target.dataset.id
  let eventCategory
  let radioButtons = document.getElementById('radio-buttons').children
  for(let i = 0; i < radioButtons.length; i++){
    if(radioButtons[i].checked){
       eventCategory = radioButtons[i].value
    }
  }
  fetch(RAILS_EVENT_API, {
    method: 'POST',
    body: JSON.stringify({
      name: eventName,
      url: eventURL,
      imgURL: imgURL,
      trip_id: tripId,
      category: eventCategory
    }),
    headers: {'Content-Type': 'application/json'}
  })
  event.target.style.visibility = "hidden"
}

//##############DELETING TRIPS
function deleteTrip(e){
  let tripId = e.target.dataset.id
  let tripDiv = e.target.parentElement
  tripDiv.remove()
  fetch(RAILS_TRIP_API + tripId, {
    method: "DELETE"
  })
}
let deleteTripButtons = document.getElementsByClassName('trash-button')
function addEventListenersToDeleteTripButtons(){
  for(let i = 0; i < deleteTripButtons.length; i++){
    deleteTripButtons[i].addEventListener('click', deleteTrip)
  }
}





})
