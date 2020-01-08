const express = require('express')
const path = require('path')
const hbs =require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')
const app = express()

const port = process.env.PORT || 3000

const publicPathDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath =path.join(__dirname,'../templates/partials')

app.use(express.static(publicPathDirectory))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
  res.render('index',{
      title:'Weather-app',
      name:'skeleton'
  })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Skeleton'
    })
})

app.get('/weather',(req,res)=>{
      
    if(req.query.address){
    return geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
    
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
               return res.send({
                   error:error
               })
            }
                res.send({
                    location:place,
                    weather:forecastData,
                    address:req.query.address
                })
        })
    })
    
    
    }

    res.send({
        error:'Address not found'
    })


     
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
                error:'No search found'
        })
    }

    res.send({
        product:[]
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'This is helpful text',
        name:'skeleton'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Skeleton',
        errorMeaasge:'Help article not found'
    })
  })

app.get('*',(req,res)=>{
  res.render('404',{
      title:'404',
      name:'Skeleton',
      errorMeaasge:'page not found'
      
  })
})


  

app.listen(port,()=>{
    console.log('Server is up on port' + port)
})