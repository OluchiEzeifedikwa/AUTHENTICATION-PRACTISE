const pool = require('./pool');

async function getAllAuthors() {
    const { rows } = await pool.query("SElECT * FROM authors");
    return rows;
}

async function insertAuthor(author, messages, title, newdate, content) {
    await pool.query("INSERT INTO authors (author, messages, title, newdate, content) VALUES($1, $2, $3, $4, $5)", [author, messages, title, newdate, content] )

}

module.exports = {
    getAllAuthors, insertAuthor
}
