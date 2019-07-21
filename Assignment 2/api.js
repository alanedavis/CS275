// Capitalizes the first letter of each word by splitting the string and putting it back together
function capitalize(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }

    return splitStr.join(' '); 
}

// This is a function that wil convert the data.dt_text from Military Time to Standard Time
function convert(value) {
    if (value !== null && value !== undefined) {
      if(value.indexOf('AM') > -1 || value.indexOf('PM') > -1) {
        return value;
      } else {
        if(value.length == 8){
          var hour = value.substring ( 0,2 ); 
          var minutes = value.substring ( 3,5 ); 
          var identifier = 'AM'; 
   
          if(hour == 12){
            identifier = 'PM';
          }

          if(hour == 0){ 
            hour=12;
          }

          if(hour > 12){ 
            hour = hour - 12;
            identifier='PM';
          }
          return hour + ':' + minutes + ' ' + identifier; 
        } else { 
          return value;
        }
      }
    }
};

// Formats the date from yyyy-mm-dd to mm-dd-yyyy
function formatDate (input) {
    date = input.split(' ')
    time = convert(date[1])
    var datePart = date[0].match(/\d+/g),
    year = datePart[0].substring(2),
    month = datePart[1], day = datePart[2];
  
    return month+'-'+day+'-'+year + ' ' + time
}

// compute is the function that uses jquery and ajax to gather all of the forecast data and add it to the HTML file
function compute() {
    // Extract the key and zip code from their respective text fields
    var api = $("#key").val();//api key input value
    var zip = $("#zipcode").val();//zipcode input value

    // Create a url request to obtain the 5 day / 3 hour data
    var url = 'https://api.openweathermap.org/data/2.5/forecast?zip=' + zip + '&appid=' + api + '&units=imperial';

    // This AJAX code sends a get request to the url above in order to recieve the data in JSON form
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: url,
        data: {
            // Grab the data of "zip" zipcode using the "api" api key for analyzing
            zip: zip,
            key: api,
        },

        // If the data is found begin a string that will hold all of the information for HTML to display
        // Log all of the data that was recieved from the zipcode the user entered
        // Create a header for the city name, country, and zipcode searched
        // Paragraph tag is made to inform user that degrees farenheit is what the temperature is in
        // Create the div, "grid-container" which will help organize all of the elements within it
        // For each element in the list of data returned from the AJAX request create a table
          // Within each table add the date and time that the information is found
          // Also display the weather conditions
          // Finally, show the average temperature for the day
        // Close the grid-container div
        // Return all of the data to te HTML file
        success: function(data) {
            var forecast = '';
            console.log('Recieved Data: ', data);
            forecast += '<h1>' + data.city.name + ", " + data.city.country + " - " + zip + '</h1>'
            forecast += '<p id="inform">All Temperatures Are In Degrees Farenheit</p>'
            forecast += '<div class = "grid-container">'
            $.each(data.list, function(index, val){
                forecast += '<div class="grid-itme"><table>'
                forecast += '<tr><th>' + formatDate(val.dt_txt) + '</th>'
                forecast += '<tr><td style="text-align:center">' + capitalize(val.weather[0].description) + "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png' style='vertical-align:middle'>" + '</td></tr>'
                forecast += '<tr><td style="text-align:center">' + "Avg: " + val.main.temp + '&deg' + '</td></tr>'
                forecast += '</table></div>'
            });
            forecast += '</div>'
            $('#output').html(forecast);
        },
        // If the data is not found, throw back a descriptive error on why it was not found
        error: function() {
            alert("Error: Invalid Api Key");
        }
    });
}