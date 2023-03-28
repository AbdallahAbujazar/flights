const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/search', async (req, res) => {
  const { from, to, date } = req.query;

  const params = {
    access_key: '3e940fca283625d2f4afd3d4ed6d62b1',
    dep_iata: from,
    arr_iata: to,
    flight_date: date
  };

  try {
    const response = await axios.get('https://api.aviationstack.com/v1/flights', { params });

    const flights = response.data.data.map(flight => {
      return {
        flightNumber: flight.flight.number,
        airline: flight.airline.name,
        departureAirport: flight.departure.airport,
        departureTime: flight.departure.scheduled,
        arrivalAirport: flight.arrival.airport,
        arrivalTime: flight.arrival.scheduled
      };
    });
    
    if (flights.length === 0) {
      console.log(`No flights found for ${from} to ${to} on ${date}`);
    }

    res.json(flights);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to retrieve flight data' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
