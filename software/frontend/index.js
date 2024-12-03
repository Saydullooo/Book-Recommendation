const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 
const app = express();
const PORT = 3002;

app.use(cors()); 


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Team0501', 
    database: 'book_recommendation'
});


function handleDisconnect() {
    db.connect((err) => {
        if (err) {
            console.error('Error reconnecting to the database:', err);
            setTimeout(handleDisconnect, 2000); 
        } else {
            console.log('Database connected');
            db.query(`CREATE TABLE IF NOT EXISTS books (
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(255),
                authors TEXT,
                publisher VARCHAR(255),
                description TEXT,
                pageCount INT
            )`, (err) => {
                if (err) {
                    console.error('Error creating table:', err);
                }
            });
        }
    });
}
handleDisconnect(); 


app.use(express.json());


app.post('/addBook', (req, res) => {
    console.log("Received request to add book:", req.body); 
    const { id, title, authors, publisher, description, pageCount } = req.body;
    if (!id || !title) {
        return res.status(400).send('Missing required fields');
    }
    const authorsString = authors.join(", ");

    db.query(`INSERT INTO books (id, title, authors, publisher, description, pageCount) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, title, authorsString, publisher, description, pageCount],
        (err) => {
            if (err) {
                console.error('Error inserting book:', err);
                res.status(500).send('Error adding book to database');
            } else {
                console.log('Book added successfully');
                res.send('Book added successfully');
            }
        }
    );
});


app.get('/books', (req, res) => {
    db.query(`SELECT * FROM books`, (err, rows) => {
        if (err) {
            console.error('Error fetching books:', err);
            res.status(500).send('Error retrieving books');
        } else {
            res.json(rows);
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
