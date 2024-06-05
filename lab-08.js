const fastify = require("fastify")();

const fetch = require("node-fetch");

fastify.get("/photos", (request, reply) => {
  fetch("https://jsonplaceholder.typicode.com/photos")
    .then((response) => response.json())
    .then((json) => console.log(json));
  reply
    .code(200)
    .header("Content-Type", "text/json; charset=utf-8")
    .send({ error: "", statusCode: 200, photos: json })

    .catch(
      reply
        .code(404)
        .header("Content-Type", "text/json; charset=utf-8")
        .send({ error: "", statusCode: 404, photos: [] })
    );
});

fastify.get("/photos/:id", (request, reply) => {
  const { id = "" } = request.params;
  fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      console.log(Object.keys(json).length);
      if (Object.keys(json).length > 0) {
        reply
          .code(200)
          .header("Content-Type", "text/json; charset=utf-8")
          .send({ error: "", statusCode: 200, photos: json });
      } else {
        reply
          .code(404)
          .header("Content-Type", "text/json; charset=utf-8")
          .send({ error: "Invalid id", statusCode: 404, photos: {} });
      }
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      reply
        .code(404)
        .header("Content-Type", "text/json; charset=utf-8")
        .send({ error: err, statusCode: 404, photos: {} });
    });
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
