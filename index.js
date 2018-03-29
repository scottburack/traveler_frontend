const BASE_URL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?"
const RAILS_TRIP_API = "http://localhost:3000/api/v1/trips/"
const RAILS_EVENT_API = "http://localhost:3000/api/v1/events/"
const userId = 1




let showContainer = document.getElementById('show-container')
let tripEventForm = document.getElementById("trip-event-form")
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
      tripElement.className = "trip-div"
      tripElement.dataset.id = trip.id
        let newTrip = new Trip(trip.id, trip.name, trip.city, trip.state, trip.country, trip.userId)

        tripElement.innerHTML = newTrip.render()

      tripsList.append(tripElement)
    })
    let colorCodes = ['#A0E4FE', '#0B76C4', '#FF5669', '#F8DD6E', '#FFDCD9', '#EBF2F5']
    let colorCounter = 0
    for(let i = 0; i < tripsList.children.length; i++){


      tripsList.children[i].style.backgroundColor = colorCodes[colorCounter]
      colorCounter === 5 ? colorCounter = 0 : colorCounter++
    }
  }

  /////// RENDERING EVENTS FOR SPECIFIC TRIP
  function getTripEvents() {
    let tripDivs = document.getElementsByClassName("trip-div")
    // debugger
    for (let i = 0; i < tripDivs.length; i++) {
      tripDivs[i].addEventListener("click", function(e) {
        if(e.target.tagName !== "BUTTON" && e.target.tagName !== "I"){
          showContainer.innerHTML = ""
        // tripEventForm.style.display = 'block'
          let tripId = e.target.parentElement.children[1].dataset.id
          fetch(RAILS_TRIP_API + tripId + '/' + 'events')
          .then(resp => resp.json())
          .then(json => renderTripEvents(json))

          let eventDivs = document.getElementsByClassName('trip-info')
          for (let i = 0; i < eventDivs.length; i++) {
            if (eventDivs[i].dataset.id !== e.target.parentElement.parentElement.dataset.id) {
              eventDivs[i].style.display = 'none'
            }
          }
        }
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
      eventDiv.className = 'event-info'
      eventDiv.dataset.id = json.id

      eventDiv.innerHTML =
        `
        <a class='image-link' href=${eventURL} target='_blank'>
        <p>Category: ${eventCategory}</p>
        <div class='event-img'>
        <img src=${eventImageURL}>
        <figcaption class="polaroid-caption">${eventName}</figcaption>
        </a>
        <i class="fa fa-trash-o event-trash-button"></i>
        </div>
        `
      showContainer.append(eventDiv)
    })

    let eventTrashBtns = document.getElementsByClassName('event-trash-button')
    for (let i = 0; i < eventTrashBtns.length; i++) {
      eventTrashBtns[i].addEventListener('click', deleteEvent)
    }
  }

  ////// DELETE EVENT ////////

  function deleteEvent(e) {
    let confirmation = confirm('Are you sure you want to delete this event?')
    if (confirmation) {
      let eventId = e.target.parentElement.parentElement.dataset.id
      // debugger
      e.target.parentElement.parentElement.remove()
      fetch(RAILS_EVENT_API + eventId, {
        method: 'DELETE'
      })
    }
  }

  getTrips().then(json => renderTrips(json)).then(() => addEventListenersToAddEventButtons()).then(() => getTripEvents()).then(() => addEventListenersToDeleteTripButtons())



  //################## CREATING TRIP FORM

  let form = document.getElementById('trip-form')
  form.addEventListener('submit', function(e){
    e.preventDefault()

    let name = e.target.children[1].value
    let city = e.target.children[3].value
    let state = e.target.children[5].value
    let country = e.target.children[7].value

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
    }).then(() => getTrips()).then(json => renderTrips(json)).then(() => addEventListenersToAddEventButtons()).then(() => getTripEvents()).then(() => addEventListenersToDeleteTripButtons())
    .then(form.reset())
    .then(form.style.display = 'block')
  })




//##############SHOW TRIP FORM ON PAGE

let addTripButton = document.getElementById('add-trip')
addTripButton.addEventListener('click', function(){

    console.log('yoooo')
		$(".ui.modal.trips").modal('show');

});


//#################RENDER EVENT FORM

function addEventListenersToAddEventButtons(){
  let eventButtons = document.getElementsByClassName('add-events')
  let eventButtonsArray = Array.from(eventButtons)
  eventButtonsArray.forEach(function(button){
    button.addEventListener('click', function(e){

  		$(".ui.small.modal.events").modal('show');
      yelpApiOffset = 0
      yelpApiLimit = 15
      currentJson = undefined
      currentEventName = undefined
      currentEventCategory = undefined
      eventForm = document.getElementById('trip-event-form')
      // eventForm.style.display = 'block'
      // form.style.display = 'block'
      eventForm.dataset.id = e.target.dataset.id
      submitFormEvent(eventForm)
    })
  })
}

function submitFormEvent(eventForm){

  eventForm.addEventListener('submit', getInfoFromEventForm)

}

//////// COLLECTING INFO FROM EVENT FORM ////////

function getInfoFromEventForm(e){
  e.preventDefault()

  let submitBtnId = e.target.dataset.id
  let eventName = e.target.children[1].value
  currentEventName = eventName
  let eventCategory;
  let eventCategories = e.target.children[3].children
  for(let i = 0; i < eventCategories.length; i++){
    if(eventCategories[i].checked){
       eventCategory = eventCategories[i].value
       currentEventCategory = eventCategory
    }
  }
  e.target.style.display = 'block'
  let eventDivs = document.getElementsByClassName('trip-info')
  for (let i = 0; i < eventDivs.length; i++) {
    if (eventDivs[i].dataset.id !== e.target.dataset.id) {
      eventDivs[i].style.display = 'none'
    }
  }
  fetch(RAILS_TRIP_API + submitBtnId)
  .then(resp => resp.json())
  .then(json => {
    currentJson = json
    getYelpResults(eventName, eventCategory, json)}
)
  // get location from trip form that was clicked
}

////////// CALLING YELP API WITH EVENT AND TRIP LOCATION INFO ////////

function getYelpResults(name, category, json) {
  let tripId = json.id
  let yelpURL;
  // debugger
  (json.state === "") ?  yelpURL = `location=${json.city}?${json.country}&` : yelpURL = `location=${json.city}?${json.state}?${json.country}&`
  // console.log(json.id)
  let term;
  (name === "") ? term = `term=${category}` : term = `term=${name}&${category}`

  fetch(BASE_URL + yelpURL + `${term}&offset=${yelpApiOffset}&limit=${yelpApiLimit}` , {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  })
  .then(resp => resp.json())
  .then(json => renderEvents(json, tripId))
}

/////// LOGIC FOR NEXT AND PREVIOUS YELP PAGE RESULTS ///////

function nextPageEvents(e){
  console.log(e.target)
  yelpApiOffset += 15
  yelpApiLimit = 15
  getYelpResults(currentEventName, currentEventCategory, currentJson)
}

function previousPageEvents(e){
  console.log(e.target)
  yelpApiOffset -= 15
  yelpApiLimit = 15
  getYelpResults(currentEventName, currentEventCategory, currentJson)
}

/////// SHOWING YELP RESULTS FOR EVENTS ///////

function renderEvents(json, tripId){
  showContainer.innerHTML = ""
  json.businesses.forEach(function(event){
    let placeDiv = document.createElement('div')
    placeDiv.className = 'event-info'
    placeDiv.innerHTML = (`

      <div class='nested-event-info'>
        <a class='image-link' href=${event.url} target="_blank">
          <div class='event-img'>
            <img alt='trip-photo' src=${event.image_url}>
              <figcaption class='polaroid-caption'>${event.name}</figcaption>
            </a>
        </div>
        <button data-id=${tripId} class='add-event ui grey button'>Add Event To Your Trip!</button>
      </div>
      `)
      showContainer.append(placeDiv)
  })
  let eventButtons = document.getElementsByClassName('add-event')
  for(let i = 0; i < eventButtons.length; i++){
    eventButtons[i].addEventListener('click', addEventToTrip)
  }

  ////// EVENT LISTENERS FOR NEXT AND PREVIOUS PAGE BUTTONS ///////

  let previousPageBtn = document.createElement('button')
  previousPageBtn.innerText = "Previous Page"
  previousPageBtn.addEventListener('click', previousPageEvents)
  if (yelpApiOffset >= 15) {
    showContainer.append(previousPageBtn)
  }

  let nextPageBtn = document.createElement('button')
  nextPageBtn.innerText = "Next Page"
  nextPageBtn.addEventListener('click', nextPageEvents)
  showContainer.append(nextPageBtn)

}

//#########ADD EVENT-LISTENER TO ADD EVENT BUTTONS
function addEventToTrip(e){
  let eventName = e.target.parentElement.children[1].children[0].children[1].innerText
  let eventURL = e.target.parentElement.children[0].href
  let imgURL = e.target.parentElement.children[1].children[0].children[0].src
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
  event.target.style.display = "none"
}

//##############DELETING TRIPS
function deleteTrip(e){
  let tripId = e.target.dataset.id
  let tripDiv = e.target.parentElement.parentElement
  let confirmation = confirm('Are you sure you want to delete this trip?')
  if (confirmation) {
    tripDiv.remove()
    fetch(RAILS_TRIP_API + tripId, {
      method: "DELETE"
    })
  }
}
let deleteTripButtons = document.getElementsByClassName('trash-button')
function addEventListenersToDeleteTripButtons(){
  for(let i = 0; i < deleteTripButtons.length; i++){
    deleteTripButtons[i].addEventListener('click', deleteTrip)
  }
}

let allTripsButton = document.getElementById('all-trips')
allTripsButton.addEventListener('click', function(){
  getTrips().then(json => renderTrips(json)).then(() => addEventListenersToAddEventButtons()).then(() => getTripEvents()).then(() => addEventListenersToDeleteTripButtons())
  showContainer.innerHTML = ""
  // form.style.display = 'block'
  tripEventForm = document.getElementById("trip-event-form")
  // tripEventForm.style.display = 'block'
})

})
