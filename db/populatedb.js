const {Client} = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  author VARCHAR ( 255 ),
  messages VACHAR(255),
  title VACHAR (255),
  newdate DATE DEFAULT CURRENT_DATE,
  content VACHAR
);

ALTER TABLE authors
ADD newdate DATE DEFAULT CURRENT_DATE;

ALTER TABLE authors
ADD content VARCHAR(255);


INSERT INTO authors (author, messages, title, newdate, content) 
VALUES
  ('Paul', 'I love Fictions', 'The grenades', '2024-12-26', 'Unreal story' );
  
`;
async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: "postgresql://OluchiEze:mesh4199@localhost:5432/top_users",
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
  main();