<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title List</title>
</head>
<body>
    <h1>Add New Title</h1>
    <form id="add-title-form">
        <input type="text" id="new-title" placeholder="Enter new title" required />
        <button type="submit">Add Title</button>
    </form>

    <h2>Available Titles</h2>
    <div id="title-container"></div>

    <script>
        // Handle form submission to add a new title
        document.getElementById("add-title-form").addEventListener("submit", async function(e) {
            e.preventDefault();

            const newTitle = document.getElementById("new-title").value;

            // Send data to the backend to add the new title
            const response = await fetch('https://your-replit-url/add-title', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTitle })
            });

            if (response.ok) {
                alert('Title added successfully!');
                // Prepend the new title to the list
                const titleContainer = document.getElementById("title-container");
                const div = document.createElement("div");
                div.className = "title-item";
                div.textContent = newTitle;
                titleContainer.prepend(div); // This will show the new title first
                document.getElementById("add-title-form").reset(); // Reset the form
            } else {
                alert('Error adding title');
            }
        });

        // Fetch and display titles when the page loads
        async function displayTitles() {
            const response = await fetch('https://your-replit-url/titles');
            const titles = await response.json();

            const titleContainer = document.getElementById("title-container");
            titleContainer.innerHTML = ""; // Clear existing titles

            titles.forEach(t => {
                const div = document.createElement("div");
                div.className = "title-item";
                div.textContent = t.title;
                titleContainer.appendChild(div);
            });
        }

        // Load titles on page load
        displayTitles();
    </script>
</body>
</html>
