// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=9f15e45060210ec849a698b3298f0bed&units=imperial';
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
 function performAction(e) {
  // Retrieve the zipcode entered by the user via the DOM input element with the ID 'zip'
    let zip = document.getElementById('zip').value;
    // Retrieve the users journal entry via the HTML DOM input element with the ID 'feelings'
    let feeling = document.getElementById('feelings').value;

    getWeather(baseURL, zip, apiKey)
    // .then((resp) => resp.json())
    // Function to execute once data has successfully been retrieved as JSON-- Creating a new the pieces for a new entry in our JS object endpoint
    .then(function(data){
      console.log(data)
      // Set vairable to hold values for the current temperature  
      let temp = data.main.temp;
      // Call function to POST data with params
      postData('/add', {temp:temp, feeling:feeling, date:newDate})
     })
     .then(
      // Call function to Get data and update UI
      retrieveData()
      );

}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, key)=>{
    // Use the fetch API to retrieve the current weather data for the users zip code
    const res = await fetch(baseURL+zip+key)
    try {

      const data = await res.json();
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
  console.log(data)
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, cors, *same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      // console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}

/* Function to GET Project Data */
 const retrieveData = async () =>{ 
  const request = await fetch('/all');
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData)
  // Write updated data to DOM elements
  document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
  document.getElementById('content').innerHTML = allData.feel;
  document.getElementById("date").innerHTML =allData.date;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}