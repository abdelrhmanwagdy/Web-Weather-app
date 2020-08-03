const request=require('request')

const geocode =(address,callback)=>{
    url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?limit=1&access_token=pk.eyJ1Ijoid2FnZHk3NDkyIiwiYSI6ImNrY3lxam02MjBjaTAzMW12eGZxeWdjeDMifQ.NTOhPPi46g_9v_ywtvidEg'

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Sorry, can't reach the site",undefined)
        }else if(response.body.features.length===0){
            callback("please try a valid location",undefined)
        }else{
            callback(undefined,{
                longt:response.body.features[0].center[0],
                lat:response.body.features[0].center[1],
                location:response.body.features[0].place_name,
            })
        }
    })

}

module.exports=geocode