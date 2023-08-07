const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8008;

// Create an Axios instance with a default timeout of 500ms
const axiosInstance = axios.create({
  timeout: 500
});


app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid or missing URLs' });
  }

  const uniqueNumbers = new Set();

  try {
    const requests = urls.map(async (url) => {
      try {
        const response = await Promise.race([
          axiosInstance.get(url),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), 500)
          )
        ]);

        const data = response.data.numbers;
        if (Array.isArray(data)) {
          data.forEach((number) => {
            uniqueNumbers.add(number);
          });
        }
      } catch (error) {
        console.error(`Error retrieving data from ${url}:`, error.message);
      }
    });

    await Promise.all(requests);

    const sortedNumbers = Array.from(uniqueNumbers).sort((a, b) => a - b);
    res.json({ numbers: sortedNumbers });
  } catch (error) {
    console.error('Error processing URLs:', error.message);
    res.status(500).json({ error: 'Error processing URLs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
