let express = require('express');
let app = express();
let request = require("request")
let server = require('http').Server(app);
var searchmovie =require("./searchmovie")

//specifying the portin which application runs
var port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Active on ${port} port`));


app.get('/Search/Movies',async (req,res)=>{
    let MovieName_Movie_details =[];
    let final_object=new Object;
//getting movie name and apikey from query params
    const moviename = req.query.query;
    const apikey = req.query.apikey;
    //if the param is empty
    if(moviename.length ==0){
        res.send({
            status:400,
            result:"Kindly provide a valid movie name"
        })
    }
    else{
       searchmovie.searchmovie(apikey,moviename)
       .then((result)=>{
           var searched_result = JSON.parse(result)
           for(i=0;i<searched_result.results.length;i++){
               final_object["MovieName"] =searched_result.results[i].title;
               final_object["details"] ={
                   moviedetails:searched_result.results[i]
               }
               MovieName_Movie_details.push(final_object)
               //removing duplicates from an array and make into set
              MovieName_Movie_details = [...new Set(MovieName_Movie_details)]

           }

           res.send({
            "status":200,
            "result":MovieName_Movie_details
        })
       })
    




    }


})