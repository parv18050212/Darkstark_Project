// DOM elements
const titleContainer = document.getElementById("title-container");
const searchBar = document.getElementById("search-bar");

// Fetch titles and links data from the JSON file
fetch('data.json')
    .then(response => response.json())
    .then(titles => {
        // Function to display titles dynamically
        function displayTitles(filter = "") {
            titleContainer.innerHTML = ""; // Clear previous titles

            // Sort titles in reverse order (newest first)
            const sortedTitles = titles.sort((a, b) => b.id - a.id); // Assuming 'id' is numeric and increases with time

            // Filter titles based on search input
            const filteredTitles = sortedTitles.filter(t =>
                t.title.toLowerCase().includes(filter.toLowerCase())
            );

            if (filteredTitles.length === 0) {
                titleContainer.innerHTML = "<p>No titles found.</p>";
                return;
            }

            // Loop through filtered titles and display them
            filteredTitles.forEach(t => {
                const div = document.createElement("div");
                div.className = "title-item";
                div.textContent = t.title;
                div.onclick = () => {
                    // Redirect to the details page with the title ID
                    window.location.href = `details.html?id=${t.id}`;
                };
                titleContainer.appendChild(div);
            });
        }

        // Function to filter titles based on search input
        function filterTitles() {
            const searchTerm = searchBar.value;
            displayTitles(searchTerm);
        }

        // Initialize and display titles
        displayTitles();
        searchBar.addEventListener("input", filterTitles);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
