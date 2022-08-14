const express=require ("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function (req,res) {
    res.sendFile(__dirname+"/index.html");
});



app.post("/",function(req,res){
  
   const query = req.body.cityName;
   const apiKey="89eea3eec0b675f252b0a42819c0558e";
   const units= "metric";
   const url="https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+query+"&units="+units;
       https.get(url,function(response){
           console.log(response.statusCode);
           response.on("data",function(data){
               const weatherData=JSON.parse(data);
               const descrip=weatherData.weather[0].description;
               const temp=weatherData.main.temp;
               console.log(temp);
               console.log(weatherData);
   
               res.write("<h1> weather in "+ query + " is "+ temp +" degree and "+descrip+"</h1>");
               res.send();
           });
       });   
})



app.listen(3000,function(){
    console.log("server is up on port 3000");
});