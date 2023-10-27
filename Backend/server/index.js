const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

const api_key = '5e0d79d511e1ab5f09cd6435c9e76dcb';

app.use(express.json());

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        units: 'metric',
        appid: api_key,
      },
    });

    if (response.status === 200) {
      res.json(response.data);
    } else {
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

// Serve the React frontend
app.use(express.static(path.join(__dirname, 'weather-app-frontend/build')));

// Handle the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'weather-app-frontend/build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});