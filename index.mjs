import { fetchSong } from "./spotify.mjs";
import dj from "./dj.mjs";

import { fileURLToPath } from "url";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const baseUrl = process.env.BASE_URL;

app.get("/", async (req, res) => {
  console.log("Welcome(:");
  res.send("`GET /` Welcome to DJ Gemini. Nothing to see here(:");
});

app.post(`/v1/dj`, async (req, res) => {
  console.log("\n\nthinking...\n\n");
  const prompt = req.body.prompt;
  console.log("\n\nreq.body.prompt:\n\n", prompt);
  if (prompt) {
    const response = await dj(prompt);
    console.log("\n\nresponse:\n\n", response);
    const parsedResponse = JSON.parse(response);
    console.log("\n\nparsedResponse:\n\n", parsedResponse);
    res.json(parsedResponse);
  } else {
    res.status(400).json({ error: "Invalid input" });
  }
});

app.listen(8095, () => console.log("Server running on port 8095"));
