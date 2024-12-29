
const db = require("../db/queries");

async function getAuthors(req, res) {
  const authors = await db.getAllAuthors();
  console.log(authors);
  res.render("author", {authors: authors});
  // console.log(usernames)
  // console.log("Usernames: ", usernames);
  // res.send("Usernames: " + usernames.map(user => user.username).join(", "));
}

async function createAuthorGet(req, res) {
  // Render the form
  res.render('createMessage');
}

async function createAuthorPost(req, res) {
  const { author, messages, title, date, content} = req.body;
  // const userInput = req.body;
  await db.insertAuthor(author, messages, title, date, content);
  // res.render('author', { userInput });
  // await db.insertUsername(username, quantity, price);
  res.redirect("/order");
  
}

exports.AuthorsDeletePost = async (req, res) => {
  try{
    await db.deleteAuthor(req.params.id);
    res.redirect("/");
} catch(error) {
  res.status(404).send(error.message);
}
}

module.exports = { getAuthors, createAuthorGet, createAuthorPost};
