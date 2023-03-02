// Searchbar
const search = document.querySelector("#searchBar");
const searchBtn = document.querySelector("#searchBtn");
let searchResults;

// The different stats
const ipAdress = document.querySelector("#adress");
const city = document.querySelector("#city");
const timezone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");

// API
const apiKey = "apiKey=at_1ZSOlGswCx3A4dChSj6ZZcGsc89Rt";
const apiUrlBase = "https://geo.ipify.org/api/";
const apiSearchParam = "v2/country,city?";

// Render Map
const map = L.map("map", {
  center: [58.9651768, 5.7501957],
  zoom: 8,
  layers: [
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`,
    }),
  ],
});

// Custom Marker
const customIcon = L.icon({
  iconUrl: "./assets/icon-location.svg",
  iconSize: [25, 35],
  iconAnchor: [22, 94],
});

getStats = () => {
  fetch(`${apiUrlBase}${apiSearchParam}${apiKey}&ipAddress=${searchResults}`)
    .then((res) => res.json())
    .then((data) => {
      const town = data.location.city;
      const country = data.location.country;

      ipAdress.textContent = data.ip;
      city.textContent = `${town}, ${country}`;
      timezone.textContent = data.location.timezone;
      isp.textContent = data.isp;
      map.panTo([data.location.lat, data.location.lng]);
      L.marker([data.location.lat, data.location.lng], {
        icon: customIcon,
      }).addTo(map);
    });
};

searchBtn.addEventListener("click", () => {
  searchResults = search.value;
  getStats();
});
