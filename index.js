"use strict";
const airline = require('./api/airlines.service.js');
const profile = require('./api/profiles.service.js');
const trip = require('./api/trip.service.js');
// TODO Import what you need

function getTravelersFlightInfo() {
  // TODO Replace this hard coded response with your code
  let profiles = profile.get()
  let airlines = airline.get()
  let trips = trip.get()
  let newObj = {}

  // get info from profiles.service.js
  let personInfo = Promise.resolve(profiles).then(value => {
    let obj = Object.values(value)[0]
    for (let i = 0; i < Object.values(obj).length; i++) {
      newObj[Object.values(obj)[i].personId] = Object.values(obj)[i].name
      // newArr.push(hash)
    }

    return newObj
  })

  // get infor from airlines.service.js
  let airlineInfo = Promise.resolve(airlines).then(value => {
    let obj = Object.values(value)[0]
    let hash = {}
    for (let i = 0; i < Object.values(obj).length; i++) {
      hash[id] = obj[i].code
      hash[name] = obj[i].name
      // console.log(hash)
      return hash
    }
  })

  // get info from trip.service.js
  let tripInfo = Promise.resolve(trips).then(value => {
    let obj = Object.values(value)[0].flights
    let arr = []
    for (let i = 0; i < Object.values(obj).length; i++) {
      // console.log(obj[0][i])
      arr.push(obj[0][i])
    }
    return arr
  })

  // return value is not complete - below are notes on my thought process and part of the solution
  return {
    travelers: [
      // Returning an object with each traveller info. Below is getting each travellers object started with their 
      // Id and name  
      Promise.resolve(personInfo).then(value => {
        let hash = {}
        for (let i = 0; i < Object.keys(value).length; i++) {
          Object.keys(value).forEach((key) => {
            hash["id"] = key
          })
          Object.values(value).forEach((v) => {
            hash["name"] = v
          })

          // Create new object with key flights and value of an array.  The Array with contain an object with 
          // a key of legs and a value of an array.  This array with also contain objects.
          let newObject = {}
          let newArray = []
          let smallerObj = {}
          let obj = {}
          hash["flights"] = newObject
          newObject[newArray] = smallerObj
          smallerObj[legs] = [obj]
          //  If the passengers ID is found in the travellerIDs array from <tripInfo> then add the flight information 
          // frequent flier number from <personInfo>, and airline information from <airlineInfo>.  Then check the passengerIDs from the second leg and
          // add a second leg in the object and add information if the passenger Id is in the array.

          // Frequent flier info will be checked by finding the passengers airline rewards program from <personInfo>
          // and seeing if it matched the airline from <tripInfo>.  If it does, the rewards program info for 
          // that passenger will be added to the object for the passenger.
          obj[legs] = [{
            //  airlineCode: 
          }]
        }
      })

    ]
  };
}
//  The full return value should be an object with an all travelers.  Each traveller should have an Id, Name,
// legs of the trip that contain the flight info, airline name, airline abbreviation, and reward program info if applicable

module.exports = getTravelersFlightInfo;
// console.log(getTravelersFlightInfo());
