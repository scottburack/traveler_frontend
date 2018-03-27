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
          <h5>${this.name}</h5>
          <p>${this.city} - ${this.country}</p>
          <button data-id=${this.id} class='add-events'>Add Events!</button>
          <br>
          `
        )
        }
        else{
        return (`
          <h5>${this.name}</h5>
          <p>${this.city}, ${this.state} - ${this.country}</p>
          <button data-id=${this.id} class='add-events'>Add Events!</button>
          <br>
          `
        )
        }
    }
  }
})()
