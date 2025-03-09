const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  // Storing data into a variable by loading the whole from the file system and then send to the client
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });
  //
  // Solution 2: Streams
  // May causes "backpressure" because the 'response' cannot handle the imcoming data to send nearly as fast as it is receving it
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found!");
  // });
  //
  // Solution 3:
  // Using 'pipe operator' to prevent 'backpressure'
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writableDestination)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
