function saveBookToDatabase(book) {
    fetch('http://localhost:3002/addBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: book.id,
            title: book.volumeInfo.title || "Unknown Title",
            authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author",
            publisher: book.volumeInfo.publisher || "Unknown",
            description: book.volumeInfo.description || "No description available.",
            pageCount: book.volumeInfo.pageCount || 0
        })
    }).then(response => {
        if (response.ok) {
            console.log('Book saved successfully');
        } else {
            console.error('Failed to save book');
        }
    }).catch(error => {
        console.error('Error saving book:', error);
    });
}

function fetchBooks() {
    const query = document.getElementById("searchInput").value.trim(); // Make sure query is defined
    if (!query) {
        alert("Please enter a search query!");
        return;
    }
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById("resultsContainer");
            resultsContainer.innerHTML = "";

            if (!data.items || data.items.length === 0) {
                resultsContainer.innerHTML = "<p>No books found matching your search.</p>";
                return;
            }

            data.items.forEach(book => {
                const bookInfo = book.volumeInfo;
                const bookCard = document.createElement("div");
                bookCard.classList.add("book-card");

                bookCard.innerHTML = `
                    <h3>${bookInfo.title || "Unknown Title"}</h3>
                    <p>${bookInfo.authors ? bookInfo.authors.join(", ") : "Unknown Author"}</p>
                    <a href="book.html?id=${book.id}" target="_blank">View Details</a>
                `;

                resultsContainer.appendChild(bookCard);

                
                saveBookToDatabase(book);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Unable to fetch books at this time.");
        });
}
