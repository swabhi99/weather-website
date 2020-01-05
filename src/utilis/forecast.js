const request = require('request')

const forecast = (latitude,longitude,callback)=>{

    const url = `https://api.darksky.net/forecast/90775716336ccd1f8730d27a0260fd33/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect',undefined)
        }else if(body.error){
            callback('invalid location',undefined)
        }
        else{
            callback(undefined, "it's"+' '+body.currently.temperature+' '+'degree out there.It is'+' '+body.currently.summary+' '+'throught the day with'+' '+body.currently.precipProbability+'%'+" "+'of rain')
        }
    })
}

module.exports = forecast