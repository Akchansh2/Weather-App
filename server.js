// server.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors()); // allow browser to call this server

const PORT = process.env.PORT || 3000;

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    if (response.status !== 200) {
      return res.status(response.status).json({ error: data.message });
    }

    res.json({
      name: data.name,
      temp: data.main.temp,
      weather: data.weather[0].description,
      humidity: data.main.humidity,
      wind: data.wind.speed,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});