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
      flightList.innerHTML = `<p>No flights found for ${from} to ${to} on ${date}</p>`;
      return;
    }

    let flightHtml = '';
    flights.forEach(flight => {
      flightHtml += `
        <div>
          <h2>${flight.airline} Flight ${flight.flightNumber}</h2>
          <p>Departure: ${flight.departureAirport} (${flight.departureTime})</p>
          <p>Arrival: ${flight.arrivalAirport} (${flight.arrivalTime})</p>
        </div>
      `;
    });
    flightList.innerHTML = flightHtml;
  } catch (error) {
    console.log(error);
    flightList.innerHTML = '<p>An error occurred while searching for flights. Please try again later.</p>';
  }
}
