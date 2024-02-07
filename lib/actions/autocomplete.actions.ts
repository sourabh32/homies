"use server"



export const autocompleteAddress = async (query:string) =>{
    
      fetch("https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=f33393c83834496c87c64a33f5cebcd3", {method:'GET'})
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}