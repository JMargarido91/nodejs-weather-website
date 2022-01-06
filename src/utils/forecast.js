const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=080ecaf11f8c3a66254ee7f26a42d1f3&query=' + latitude + ',' + longitude

    request ({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. Current temperature is ' + body.current.temperature + ' degrees. It feels like ' + body.current.feelslike + ' degrees')
        }
    })
}

module.exports = forecast