/* Global Variables */

const apiKey = '&appid=9f35ca9386c195d5fe1e93288fb70d63&units=imperial';
const Url='http://localhost:3000/';

/*  Create a new date instance dynamically with JS */
   let d = new Date();
   let newDate = (d.getMonth()+1)+'.'+ d.getDate() +'.'+ d.getFullYear();

 /* Async function to get Weather from openweathermap */
   const getWeather = async (zipCode)=>{ 

   const Weather= await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}${apiKey}`);
          if (Weather.status != 200) {
                alert('no city with this code');
                throw 'Not Found';
           }
  const response= Weather.json();
    return  response;
  }
 
  /* Async Function to POST data */
  const postData = async ( url = '', data = {})=>{
  console.log(data);
  const response = await fetch(url, {
  method: 'POST',
  credentials: 'same-origin', 
  headers: {'Content-Type': 'application/json'},

  body: JSON.stringify(data), // body data type must match "Content-Type" header        
});

  try {
    const newData = await response.json();
    return newData;
  } 
  catch(error) {
    console.log('error', error);
  }
}

  document.getElementById('generate').addEventListener('click', performAction);

/*  event listener's Function */

function performAction(e) {
  const zip_code =  document.getElementById('zip').value;
    if (zip_code == '') {
        alert('Please enter a zip code');
        return false;
      } 
      else {
        getWeather(zip_code)
        .then(weather => {
          postData( ('/allData'),{
            temperature: weather.main.temp,
            date: newDate,
            user_response:document.getElementById('feelings').value
          })
          updateUI();
        })
        .catch(error => {
          console.log(error);
        })
}}

/** Update UI Function */
async function updateUI() {

    let response = await fetch('/addData');
    try {  

      const data= await response.json();  
      document.getElementById('date').innerHTML = `Date Is: ${data.date}`;
      document.getElementById('temp').innerHTML = `Temp Is: ${data.temperature}`;
      document.getElementById('content').innerHTML = `My Feelings Is: ${data.user_response}`;
  
  } catch(error) {
    console.log('error', error);
  }
}
