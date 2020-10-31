/*OpenWeatherMap API Test*/
testUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=11216';
testKey = '&appid=9f15e45060210ec849a698b3298f0bed&units=imperial'

const testApi = async (url= '', apiKey= '')=>{
    fetch(url+apiKey)
    // Transform the data into json
    .then((resp) => resp.json())
    // Function to execute once data has successfully been retrieved as JSON-- Creating a new the pieces for a new entry in our JS object endpoint
    .then(function(data){
        console.log(data);
    })
};

testApi(testUrl, testKey);


/* POST Test */
const postTest = async ( url= '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json()
        console.log(newData);
        return newData;
    }catch(error){
        console.log('error', error);
    };
};

postTest('/add', {temp:'68',feeling: 'good', date:'today' });


/* GET Test */
const getTest = async (url='')=>{
    const request = await fetch(url);
    try{
        const allData = await request.json();
        console.log(allData);
    }
    catch(error){
        console.log("error", error);
    }
}

getTest('/all');