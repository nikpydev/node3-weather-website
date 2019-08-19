const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')
const request = require('request')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nikhil Choudhary'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Nikhil Choudhary',
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a helpful text.',
        title: 'Help Page',
        name: 'Nikhil Choudhary'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help Page not found',
        errorMessage: "We're not sure how to help you with that. Please try something else.",
        name: 'Nikhil Choudhary'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404 Page not found',
        errorMessage: "We're not sure about what you're looking for. Please try something else.",
        name: 'Nikhil Choudhary'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})