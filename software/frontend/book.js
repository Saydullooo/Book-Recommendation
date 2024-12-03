document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");

    if (!bookId) {
        document.getElementById("bookDetails").innerHTML = "<p>Book not found.</p>";
        return;
    }

    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then(response => response.json())
        .then(data => {
            const bookInfo = data.volumeInfo;
            const bookDetailsDiv = document.getElementById("bookDetails");

            bookDetailsDiv.innerHTML = `
                <h2>${bookInfo.title || "Unknown Title"}</h2>
                <p><strong>Authors:</strong> ${bookInfo.authors ? bookInfo.authors.join(", ") : "Unknown"}</p>
                <p><strong>Publisher:</strong> ${bookInfo.publisher || "Unknown"}</p>
                <p><strong>Description:</strong> ${bookInfo.description || "No description available."}</p>
                <p><strong>Pages:</strong> ${bookInfo.pageCount || "Unknown"}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching book details:", error);
            document.getElementById("bookDetails").innerHTML = "<p>Error loading book details.</p>";
        });
});
