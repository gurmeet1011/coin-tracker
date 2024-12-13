const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const tableBody = document.getElementById("crypto-table");
const searchInput = document.getElementById("search");
const sortMarketCapButton = document.getElementById("sort-market-cap");
const sortPercentageButton = document.getElementById("sort-percentage");

let cryptoData = [];

// Fetch Data from API
async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        cryptoData = data; // Store the data for future operations
        renderTable(data); // Render the table with the fetched data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Render Table
function renderTable(data) {
    tableBody.innerHTML = ""; // Clear the existing rows
    data.forEach((coin) => {
        const row = `
            <tr>
                <td>
                    <img src="${coin.image}" alt="${coin.name}" width="20" /> ${coin.name}
                </td>
                <td>${coin.symbol.toUpperCase()}</td>
                <td>$${coin.current_price.toLocaleString()}</td>
                <td>${coin.total_volume.toLocaleString()}</td>
                <td style="color: ${coin.price_change_percentage_24h >= 0 ? "green" : "red"}">
                    ${coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>${coin.market_cap.toLocaleString()}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Search Functionality
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = cryptoData.filter(
        (coin) =>
            coin.name.toLowerCase().includes(searchTerm) ||
            coin.symbol.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredData); // Update the table with the filtered data
});

// Sort by Market Cap
sortMarketCapButton.addEventListener("click", () => {
    const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
});

// Sort by Percentage Change
sortPercentageButton.addEventListener("click", () => {
    const sortedData = [...cryptoData].sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    renderTable(sortedData);
});

// Initial Fetch
fetchData();
