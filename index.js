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
      airlineValue.airlines.forEach(line => {
        // creating an object with airline abbreviations and names
        let airObj = {}
        airObj[line.code] = line.name
      })
      let profileReturn = profiles.then(profileValue => {
        profileValue.profiles.forEach(value => {
          let flightArray = []
          tripValue.trip.flights.forEach(part => {
            if (part.travelerIds.includes(value.personId)) {
              // creating the fligt array for each traveler
              flightArray.push({ legs: part.legs })
              // Flight array also needs to include airline name and rewards info if applicable
              // will need another if statement for the airline rewards 
            }
          })
          // creating the hash for each traveler to include Id, Name, and Flight info
          let newHash = {}
          newHash["id"] = value.personId
          newHash["name"] = value.name
          newHash["flights"] = flightArray
          // adding each traveler hash to the travelers array
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

// resolving promises for the final hash with travler info to return the hash


Promise.resolve(getTravelersFlightInfo()).then(console.log)
getTravelersFlightInfo()
module.exports = getTravelersFlightInfo;
