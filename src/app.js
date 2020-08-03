express = require('express')
path = require('path')
hbs = require('hbs')
geocode = require('./utils/geocode')
forcast = require('./utils/forcast')

app=express()
const publicDirectory=path.join(__dirname,'../public')
// app.use(express.static(publicDirectory))
const viewsDir=path.join(__dirname,'../templete/views')
const partialsDir=path.join(__dirname,'../templete/partials')

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.set('view engine','hbs')
app.set('views',viewsDir)
hbs.registerPartials(partialsDir)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Abdelrhman Wagdy'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'sorry, weather value must be provided'
        })
    }

    geocode(req.query.address,(error,response)=>{
        if (error){
            return res.send({error})
        }

        forcast(response.longt,response.lat,(error,forcastData)=>{
            if (error){
                return res.send({error})
            }
            return res.send({
                location:response.location,
                temp:forcastData.temp,
                humidity:forcastData.humidity,
                pressure:forcastData.pressure
            })

        })

    })

    // res.send({
    //     title:'Weather',
    //     name:'Abdelrhman Wagdy',
    //     address:req.query.address
    // })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Abdelrhman Wagdy'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Abdelrhman Wagdy',
        email:'abdelrhmanwagdy7492@gmail.com'
    })
})

app.get('*',(req,res)=>{
    res.render('NotFound',{
        title:'404 Not Found',
        name:'Abdelrhman Wagdy',
        email:'abdelrhmanwagdy7492@gmail.com'
    })
})

app.listen(3000,()=>{
    console.log("Wega server is up on port 3000");
})