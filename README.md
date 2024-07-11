# Weather Widget

This widget displays weather information for a specified location.

## Usage

1. Include the script in your HTML:

   ```html
   <script src="path/to/weather-widget.js"></script>
   ```

2. initialize the widget with your API key:

```html
<div id="my-weather-div"></div>
<script>
  WeatherWidget.init("YOUR_API_KEY_HERE", "my-weather-div");
</script>
```

Note: If you don't specify a div ID, the widget will be appended to the body.

## Get an API key:

Sign up for a free account at WeatherAPI - https://www.weatherapi.com/signup.aspx
Once logged in, you can find your API key in the dashboard

## Features

Enter a city name or coordinates to get weather information.  
Displays average temperature for each day of the week over the next 2 weeks.  
Toggle between Celsius and Fahrenheit.
