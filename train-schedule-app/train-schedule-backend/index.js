// train-schedule-backend/index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/trains', async (req, res) => {
  try {
    const response = await axios.get('http://20.244.56.144/train/trains');
    const currentTime = new Date();

    // Filter active trains departing in the next 30 minutes
    const activeTrains = response.data.filter(train => {
      const departureTime = new Date(train.departureTime);
      const timeDifference = departureTime - currentTime;
      return timeDifference > 0 && timeDifference <= 30 * 60 * 1000; // 30 minutes in milliseconds
    });

    res.json(activeTrains);
  } catch (error) {
    console.error('Error fetching train data:', error);
    res.status(500).json({ error: 'Error fetching train data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
