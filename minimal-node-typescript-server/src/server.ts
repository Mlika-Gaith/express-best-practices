import http from "http";

const port = 8080;

const server = http.createServer((req, res) => {
  const { method, url } = req;
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World");
  }
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
