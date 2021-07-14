var request = require("request");

 function searchmovie(apikey,moviename){
    return new Promise( function(resolve, reject) {

    let url = "https://api.themoviedb.org/3/search/movie?api_key="+apikey+"&query="+moviename;
    const options = {
        url: url,
        method: 'GET'
    }
   
    //getting result from third party api
    request(options,  function (err, res, result) {


        if (err) {
          
             return reject (`status:501,message:ServerDown`)
        } else {
           
         return resolve (result)
            
           
           
        
       
    }
   
   

})


   })
 

}


module.exports ={
    searchmovie 
}
