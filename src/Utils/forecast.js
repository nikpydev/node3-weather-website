const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/584999de267e528ec4d2cc162661887f/' + latitude + ',' + longitude + '?units=si'

    request({
            url,
            json: true
        },

        (error, { body }) => {
            if (error) {
                callback('Internet connectivity issue!', undefined)
            } else if (body.error) {
                callback('URL is incorrect!', undefined)
            } else {
                callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees celcius out. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
            }
        }
    )
}

module.exports = forecast