const BASE_URL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?"
const RAILS_TRIP_API = "http://localhost:3000/api/v1/trips"
const RAILS_EVENT_API = "http://localhost:3000/api/v1/events"
const userId = 1
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

    let newTrip = new Trip(name, city, state, country, userId)


    let tripElement = document.createElement('div')

    tripElement.innerHTML = newTrip.render()

    tripsList.append(tripElement)

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
      console.log(trip)
        let newTrip = new Trip(trip.id, trip.name, trip.city, trip.state, trip.country, trip.userId)
        tripElement.innerHTML = newTrip.render()
      tripsList.append(tripElement)
    })
  }
getTrips().then(json => renderTrips(json)).then(() => addEventListenersToAddEventButtons())
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
    submitFormEvent()
    })
  })
}

function submitFormEvent(){
  let eventForm = document.getElementById('trip-event-form')
  eventForm.addEventListener('submit', postEventData)
}

function postEventData(e){
  e.preventDefault()
  let eventName = e.target.children[1].value
  let eventCategory;
  let eventCategories = e.target.children[3].children
  for(let i = 0; i < eventCategories.length; i++){
    if(eventCategories[i].checked){
      // console.log(`${eventCategories[i].value} was checked.`)
       eventCategory = eventCategories[i].value
    }
  }
  console.log(eventCategory)
  let tripId = e.target.dataset.id
  fetch(RAILS_EVENT_API, {
    method: "POST",
    body: JSON.stringify({name: eventName, category: eventCategory, trip_id: tripId}),
    headers: {'Content-Type': 'application/json'}
  })
}

})
