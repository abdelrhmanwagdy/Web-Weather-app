console.log('Client side javascript file is loaded!')

const weatherForm =document.getElementById('weatherForm');
const searchWeather =document.getElementById('searchWeather');

const message1 =document.getElementById('message1');
const message2 =document.getElementById('message2');
const message3 =document.getElementById('message3');
const message4 =document.getElementById('message4');

// weatherForm.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     fetch('http://localhost:3000/weather?address='+searchWeather.value)
//     .then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//         alert("hi");
//     })
// })
// })

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetchData(searchWeather.value);
})

function fetchData(location){fetch('http://localhost:3000/weather?address='+location)
.then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            message1.textContent=data.error
            message2.textContent=''
            message3.textContent=''
            message4.textContent=''
        }else{
            message1.textContent='Location: '+data.location
            message2.textContent='Temperature: '+data.temp
            message3.textContent='Humidity: '+data.humidity
            message4.textContent='Pressure: '+data.pressure
        }
    })
})
}