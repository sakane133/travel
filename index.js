"use strict";
const airline = require('./api/airlines.service.js');
const profile = require('./api/profiles.service.js');
const trip = require('./api/trip.service.js');


function getTravelersFlightInfo() {
  // TODO Replace this hard coded response with your code
  let profiles = profile.get()
  let airlines = airline.get()
  let trips = trip.get()
  let travelers = []

  let returnValue = airlines.then(airlineValue => {
    let tripReturn = trips.then(tripValue => {
      let airObj = {}
      airlineValue.airlines.forEach(line => {
        airObj[line.code] = line.name
      })
      let profileReturn = profiles.then(profileValue => {

        let travelerProfile = profileValue.profiles
        let tripInfo = tripValue.trip.flights

        travelerProfile.forEach(value => {
          let newArray = []
          tripInfo.forEach(part => {
            if (part.travelerIds.includes(value.personId)) {
              let flights = { legs: part.legs }
              newArray.push(flights)
              // Flight array also needs to include airline name and rewards info if applicable
              // will need another if statement for the airline rewards 
            }
          })
          let newHash = {
            id: value.personId, name: value.name, flights: newArray
          }
          travelers.push(newHash)
        })
        return JSON.stringify(travelers)
      })

      return Promise.resolve(profileReturn)
    })
    return Promise.resolve(tripReturn)
  })
  return Promise.resolve(returnValue)

}

// resolving promises for the final hash with travler info


Promise.resolve(getTravelersFlightInfo()).then(console.log)
getTravelersFlightInfo()
module.exports = getTravelersFlightInfo;
