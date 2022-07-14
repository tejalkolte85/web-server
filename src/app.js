
const path = require('path')
const express = require('express')
const  hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

const publiceDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')


app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publiceDirectoryPath))

app.get('' ,(req,res) =>{
    res.render('index' ,{
        title: 'Wheather',
        name: 'Andrew'

    })
})

app.get( '/about' , (req ,res ) => {

    res.render('about' , {
        title: 'About Me' ,
        name: 'Andrew'
    })
} )

app.get('/help' , (req ,res) => {
    res.render('help' , {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Andrew'
    })
})


app.get('/weather' , (req , res) => {
        if(!req.query.address) {
            return res.send({
                error:'You must provide address'
            })

        }


        geocode(req.query.address , (error , { latitude , longitude , location} = {} ) => {
            if (error) {
                return res.send({error})
            }
       
        
        forecast(latitude , longitude ,(error , forecastData) =>{
            if(error) {
                return res.send({error})

            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })
    //     res.send([{
    //     'forecast' : 'rainy',
    //     'location': 'Mumbai'
    // }])
})


app.listen(port , () =>{
    console.log('Server is running on port 3000')

})