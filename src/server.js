const express = require("express");
const server = express();
const bodyParser = express.urlencoded();
const cheeses = [];
console.log(cheeses)
server.get("/", (request, response) => {
    response.send(`<h1>Hello Express</h1>`);
});

server.get("/colour", (request, response) => {
    const color = request.query.hex || 'FFFFFF';
    response.send(`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Home</title>
          </head>
          <body style="background-color:#${color}">
            <h1 >Hello</h1>
            <form action="/colour" method="">
                <input name="hex" type="text">
                <button type="submit">Submit</button>
            </form>
          </body>
        </html>
        `);
    });

server.get("/cheese", (request, response) => {
    const list = cheeses.map((cheese) => {
        return `<li>${cheese.cheese} | ${cheese.rating} stars</li>`;
      });
      const html = `
      <form method="POST">
        <p>
          <label for="name">Cheese name</label>
          <input name="name">
        </p>
        <p>
          <label for="rating">Cheese rating</label>
          <input name="rating" type="range" min="0" max="5" step="0.5">
        </p>
        <button>Rate cheese</button>
      </form>
      <ul>
        ${list.join("")}
      </ul>
    `;
    response.send(html);
})

server.post("/cheese", bodyParser, (request, response) => {
    const cheese = request.body.name;
    const rating = request.body.rating;
    cheeses.push({cheese, rating});
    response.redirect("/cheese");
})


module.exports = server;
