const searchForm = document.querySelector('#search-form');
const flightList = document.querySelector('#flight-list');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const from = searchForm.elements.from.value;
  const to = searchForm.elements.to.value;
  const date = searchForm.elements.date.value;

  searchFlights(from, to, date);
});

async function searchFlights(from, to, date) {
  try {
    const response = await fetch(`/search?from=${from}&to=${to}&date=${date}`);
    const flights = await response.json();

    if (flights.length === 0) {
      const message = document.createElement('p');
      message.textContent = `No flights found for ${from} to ${to} on ${date}`;
      flightList.innerHTML = '';
      flightList.appendChild(message);
      return;
    }

    flightList.innerHTML = '';
    flights.forEach(flight => {
      const flightDiv = document.createElement('div');
      const flightHeading = document.createElement('h2');
      const flightDeparture = document.createElement('p');
      const flightArrival = document.createElement('p');

      flightHeading.textContent = `${flight.airline} Flight ${flight.flightNumber}`;
      flightDeparture.textContent = `Departure: ${flight.departureAirport} (${flight.departureTime})`;
      flightArrival.textContent = `Arrival: ${flight.arrivalAirport} (${flight.arrivalTime})`;

      flightDiv.appendChild(flightHeading);
      flightDiv.appendChild(flightDeparture);
      flightDiv.appendChild(flightArrival);

      flightList.appendChild(flightDiv);
    });
  } catch (error) {
    console.log(error);
    const message = document.createElement('p');
    message.textContent = 'An error occurred while searching for flights. Please try again later.';
    flightList.innerHTML = '';
    flightList.appendChild(message);
  }
}
