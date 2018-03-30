let Trip = (() => {
  // let id
  return class Trip {

    constructor (id, name, city, state, country, userId, startDate, endDate) {
      this.name = name
      this.city = city
      this.state = state
      this.country = country
      this.userId = userId
      this.id = id
      this.startDate = startDate
      this.endDate = endDate
    }

    static all() {
      return [...ALL]
    }

    render() {
        if(this.state === ""){
        return (`
          <div class='trip-info' data-id=${this.id}>
          <span class='trip-top'>
            <h2 class="inline trip-name">${this.name}</h2>
            <i data-id=${this.id} class="fa fa-trash-o trash-button trash alternate outline icon"></i>
          </span>
          <span class='bottom-span'>
            <p class="inline"><strong class="bold">${this.city} - ${this.country}</strong></p>
            <p class="inline">${this.startDate} -> ${this.endDate}</p>
            <br>
            <button data-id=${this.id} id="first" class='add-events ui grey button trash alternate outline icon'>Add Events!</button>
          </span>
          <br>
          </div>
          `
        )
        }
        else{
        return (`
          <div class="trip-info" data-id=${this.id}>
          <span class='trip-top'>
            <h2 class="inline trip-name">${this.name}</h2>
            <i data-id=${this.id} class="fa fa-trash-o trash-button trash alternate outline icon"></i>
          </span>
          <span class='bottom-span'>
            <p class="inline">${this.city}, ${this.state} - ${this.country}</p>
            <p class="inline">${this.startDate} -> ${this.endDate}</p>
            <br>
            <button data-id=${this.id} class='add-events ui grey button'>Add Events!</button>
          </span>
          <br>
          </div>
          `
        )
        }
    }
  }
})()
