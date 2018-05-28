const BASE_URL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?"
const RAILS_TRIP_API = "http://localhost:3000/api/v1/trips/"
const RAILS_EVENT_API = "http://localhost:3000/api/v1/events/"
const userId = 1




let showContainer = document.getElementById('show-container')
let tripEventForm = document.getElementById("trip-event-form")
let categoryContainer = document.getElementById("category-container")
document.addEventListener("DOMContentLoaded", function(){

//#####################RENDER TRIPS TO PAGE
  let tripsList = document.getElementById('trips-list')
  let getTrips = () => {
    return fetch(RAILS_TRIP_API)
    .then(resp => resp.json())
  }

  let renderTrips = (json) => {
    tripsList.innerHTML = ""
    categoryContainer.innerHTML = ""
    json.forEach(function(trip){

      let tripElement = document.createElement('div')
      tripElement.className = "trip-div"
      tripElement.dataset.id = trip.id
        let newTrip = new Trip(trip.id, trip.name, trip.city, trip.state, trip.country, trip.userId, trip.start_date, trip.end_date)

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
    let categoryContainer = document.getElementById('category-container')
    // debugger
    for (let i = 0; i < tripDivs.length; i++) {
      tripDivs[i].addEventListener("click", function(e) {
        let tripId;
        if(e.target.tagName !== "BUTTON" && e.target.tagName !== "I") {
          showContainer.innerHTML = ""
<<<<<<< HEAD
          categoryContainer.innerHTML = (`
              <div class='event-category-div' id="restaurants-events"><h3>Restaurants</h3><div id='restaurant-grid-div'></div></div>
              <br>
              <div class='event-category-div' id="bars-events"><h3>Bars</h3><div id='bars-grid-div'></div></div>
              <br>
              <div class='event-category-div' id="landmarks-events"><h3>Landmarks</h3><div id='landmarks-grid-div'></div></div>
              <br>
              <div class='event-category-div' id="museums-events"><h3>Museums</h3><div id='museums-grid-div'></div></div>
              <br>
              <div class='event-category-div' id="parks-events"><h3>Parks</h3><div id='parks-grid-div'></div></div>
            `)
        // tripEventForm.style.display = 'block'
        // debugger
          let tripId = e.target.parentElement.children[1].dataset.id
=======
          if (e.target.className === 'bottom-span' || e.target.className === 'trip-info') {
            tripId = e.target.parentElement.dataset.id
          } else {
            tripId = e.target.parentElement.children[1].dataset.id
          }
>>>>>>> scott
          fetch(RAILS_TRIP_API + tripId + '/' + 'events')
          .then(resp => resp.json())
          .then(json => renderTripEvents(json))



          let eventDivs = document.getElementsByClassName('trip-info')
          for (let i = 0; i < eventDivs.length; i++) {
            if (eventDivs[i].dataset.id !== e.target.parentElement.parentElement.dataset.id && eventDivs[i].dataset.id !== e.target.parentElement.dataset.id) {
              eventDivs[i].style.display = 'none'
            }
          }
        }
      })
    }
  }

  function showEventsInCategory(e){
    for(let i = 0; i < e.target.parentElement.children.length; i++){
      // debugger


      e.target.parentElement.children[1].style.display = 'grid'}
  }
  function renderTripEvents(json) {
    json.forEach(function(json){
      let eventName = json.name
      let eventCategory = json.category
      let eventImageURL = json.imgURL
      let eventURL = json.url
      let eventDiv = document.createElement('div')
      //########CATEGORY DIVS
    let restaurantsDiv = document.getElementById('restaurants-events')
    // restaurantsDiv.style.display = 'block'
    let barsDiv = document.getElementById('bars-events')
    // barsDiv.style.display = 'block'
    let landmarksDiv = document.getElementById('landmarks-events')
    // landmarksDiv.style.display = 'block'
    let museumsDiv = document.getElementById('museums-events')
    // museumsDiv.style.display = 'block'
    let parksDiv = document.getElementById('parks-events')
    // parksDiv.style.display = 'block'
      eventDiv.className = 'event-info'
      eventDiv.dataset.id = json.id

      eventDiv.innerHTML =
        `
        <a class='image-link' href=${eventURL} target='_blank'>

        <div class='event-img'>
        <img src=${eventImageURL}>
        <figcaption class="polaroid-caption">${eventName}</figcaption>
        </a>
        <i class="fa fa-trash-o event-trash-button trash alternate outline icon"></i>
        </div>
        `
      // showContainer.append(eventDiv)
      let restaurantGridDiv = document.getElementById('restaurant-grid-div')
      let barsGridDiv = document.getElementById('bars-grid-div')
      let landmarksGridDiv = document.getElementById('landmarks-grid-div')
      let museumsGridDiv = document.getElementById('musuems-grid-div')
      let parksGridDiv = document.getElementById('parks-grid-div')

      switch (eventCategory) {
       case 'restaurants':

         restaurantGridDiv.append(eventDiv)

         console.log(eventCategory)
         break;
       case 'bars':

         barsGridDiv.append(eventDiv)

         console.log(eventCategory)
         break;
       case 'landmarks':
       // landmarksDiv.innerHTML = '<h2> Landmarks</h2>'

         landmarksGridDiv.append(eventDiv)
         // eventDiv.style.display = 'none'
         // landmarksDiv.style.backgroundColor = "green"

         tripsGridList.append(landmarksDiv)
         console.log(eventCategory)
         break;
       case 'museums':
       // museumsDiv.innerHTML = '<h2> Museums</h2>'

         museumsGridDiv.append(eventDiv)
         // eventDiv.style.display = 'none'
         // museumsDiv.style.backgroundColor = "magenta"

         tripsList.append(museumsDiv)
         console.log(eventCategory)
         break;
       case 'parks':
        // parksDiv.innerHTML = '<h2> Parks</h2>'
         parksDiv.append(eventDiv)
         // eventDiv.style.display = 'none'
         // parksDiv.style.backgroundColor = "red"

         tripsList.append(parksDiv)
         console.log(eventCategory)
         break;
       default:
         console.log('Something went wrong')
     }
    })


    let categoryDivs = document.getElementsByClassName('event-category-div')
    for(let i = 0; i < categoryDivs.length; i++){
      for(let j = 1; j < categoryDivs[i].children.length; j++){

          categoryDivs[i].children[j].style.display = 'none'
      }

    }
    for(let i = 0; i < categoryDivs.length; i++){
      categoryDivs[i].addEventListener('click', showEventsInCategory)
    }




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
    let startDate = e.target.children[9].value
    let endDate = e.target.children[11].value

    fetch(RAILS_TRIP_API, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        city: city,
        state: state,
        country: country,
        user_id: userId,
        start_date: startDate,
        end_date: endDate
      }),
      headers: {'Content-Type': 'application/json'}
    }).then(() => getTrips()).then(json => renderTrips(json)).then(() => addEventListenersToAddEventButtons()).then(() => getTripEvents()).then(() => addEventListenersToDeleteTripButtons())
    .then(form.reset())
    .then(form.style.display = 'block')
  })




//##############SHOW TRIP FORM ON PAGE

let addTripButton = document.getElementById('add-trip')
addTripButton.addEventListener('click', function(){
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
