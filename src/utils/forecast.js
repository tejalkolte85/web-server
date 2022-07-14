const request = require('request')

const forecast = (latitude , longitude , callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=3c15d85106f58b42424b930b471427e0&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true} ,(error , {body}) => {
        if (error)
        {
            callback('Unble to find weather services!' , undefined)
        }
        else if (body.error) {
            callback('unable to find location'  , undefined)

        }else{
            callback(undefined , body.current.weather_descriptions[0] + '. Its current ' + body.current.temperature + 'degree out. It feels like ' + body.current.feelslike + 'degeree out.')

        }

    })


}
 module.exports = forecast