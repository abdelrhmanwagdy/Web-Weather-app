const request=require('request')

const forcast =(lng,lat,callback)=>{
    url='http://api.openweathermap.org/data/2.5/weather?units=metric&lat='+lat+'&lon='+lng+'&appid=b16008d2dfc577b577f53cc14ff6389b'

    request({url:url,json:true},(errorr,response)=>{
        if(errorr){
            callback("Sorry, can't reach the site",undefined)
        }else if(response.body.cod === '400'){
            callback("please try a valid lat and lng",undefined)
        }else{
            callback(undefined,{
                temp:response.body.main.temp,
                humidity:response.body.main.humidity,
                pressure:response.body.main.pressure
            })
        }

    })

}
module.exports=forcast