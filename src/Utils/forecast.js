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
                callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees celcius out. There is a ' + body.currently.precipProbability + '% chance of rain.')
            }
        }
    )
}

module.exports = forecast