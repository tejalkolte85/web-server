const request = require("request")

const geocode = (address , callback) => {
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFycy00NSIsImEiOiJjbDVnandzM24wMDdtM2p0OGt0YTFvYmQ4In0.Nm-VXT1Rda-Mw1nOrclCSA&limit=1'

request( {url , json:true}  , (error , {body}) => {
    if (error)
    {
        callback('Unble to find weather services!' , undefined)
    }
    else if (body.features.length === 0) {
        callback('unable to find location'  , undefined)

    }else{
        callback(undefined , {
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name
        })

    }


})
}

module.exports = geocode