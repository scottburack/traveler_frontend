let Trip = (() => {
  // let id
  return class Trip {

    constructor (id, name, city, state, country, userId) {
      this.name = name
      this.city = city
      this.state = state
      this.country = country
      this.userId = userId
      this.id = id

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
            <i data-id=${this.id} class="fa fa-trash-o trash-button"></i>
          </span>
          <span class='bottom-span'>
            <p class="inline">${this.city} - ${this.country}</p>
            <button data-id=${this.id} class='add-events btn btn-light'>Add Events!</button>
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
            <i data-id=${this.id} class="fa fa-trash-o trash-button"></i>
          </span>
          <span class='bottom-span'>
            <p class="inline">${this.city}, ${this.state} - ${this.country}</p>
            <button data-id=${this.id} class='add-events btn btn-light'>Add Events!</button>
          </span>
          <br>
          </div>
          `
        )
        }
    }
  }
})()
