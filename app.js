const express= require("express");
const app =express();

var bodyparser=require("body-parser");

// required to pass html file to js
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
    // dirname gives file path of this file no matter where it is 
    // useful when seen by different computers
    res.sendFile(__dirname + "/index.html");
});





app.post("/",function(req,res){

    // https is used to transfer data in node js

    const https=require("https");

    const city=req.body.city;

const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=06801a9ff98a12e2b6c6caca5f189f49&units=metric";

    https.get(url,function(response){

        // passing the data
    
        response.on("data",function(data){
            // converting data to js object
            const weather_data=JSON.parse(data);
    
            const temp = weather_data.main.temp;
            // weather is array on api
            const descr=weather_data.weather[0].main;

            const icon=weather_data.weather[0].icon;

            const imgurl= "https://openweathermap.org/img/wn/"+ icon+ "@2x.png";

            const name=weather_data.name;

         

            res.write("<p> Weather is " + descr + " <p>");

           
    
            res.write("<h1> Temp in " + name + " is " + temp + " <h1>");

            res.write("<img src ="+imgurl+ ">");

            // real output res we send all that we have written
              res.send();
    
        });
    
    
    
    }); 


});


app.listen(3000);
