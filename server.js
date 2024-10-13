const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5001;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Endpoint to get weather data for a city
app.get('/api/weather/:city', async (req, res) => {
    const city = req.params.city;
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = response.data;

        // Simplify the response
        const simplifiedResponse = {
            city: data.name,
            temperature: data.main.temp,
            weather: data.weather[0].description,
        };

        res.json(simplifiedResponse);
    } catch (error) {
        console.error(error.message); // Log error to console
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'City not found' });
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
