const request = require('request')

const geocode = (address,callback)=>{

    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3dhYmhpbWFuIiwiYSI6ImNrM2NtOTB3aTB4Mm4zbmszN3YxZ3pmYmUifQ.JI1DNmboqclIWNjofWfrPg&limit=1`
   
    request({url:geocodeURL,json:true},(error,{body})=>{
       if(error){
           callback('Unable to connect',undefined)
       } else if(body.features.length === 0){
           callback('Invalid input! Try again',undefined)
       } else{
           callback(undefined, {
               longitude:body.features[0].center[0],
               latitude:body.features[0].center[1],
               place:body.features[0].place_name
           })
       }
    })
}






module.exports = geocode