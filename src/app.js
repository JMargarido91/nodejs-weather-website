const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'João Margarido'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'João Margarido'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is our message',
        name: 'João Margarido'
    })
})


app.get('/weather', (req, res)=> {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({ error})
        }

        forecast(latitude, longitude, (error, forecastData)=> {
            if (error) {
                return res.send({ error})
            }

            res.send({
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        notFoundMessage: 'Help article not found',
        name: 'João Margarido'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        notFoundMessage: 'Page not found',
        name: 'João Margarido'
    })})

app.listen(port, () => {
    console.log('The server is running on port ' + port)
})
