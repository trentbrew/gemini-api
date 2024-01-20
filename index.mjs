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

app.get("/", async (req, res) => {
  console.log("Welcome(:");
  res.send("`GET /` Welcome to DJ Gemini. Nothing to see here(:");
});

app.get("/v1", async (req, res) => {
  res.send("`GET /v1` warmer...");
});

app.post("/v1/dj", async (req, res) => {
  console.log("\n\nthinking...\n\n");
  const prompt = req.body.prompt;
  console.log("\n\nreq.body.prompt:\n\n", prompt);
  if (prompt) {
    const response = await dj(prompt);
    const payload = response;
    console.log("\n\npayload:\n\n", payload);
    const finalPayload = JSON.parse(payload);
    console.log("\n\nfinalPayload:\n\n", finalPayload);
    res.json(finalPayload);
  } else {
    res.status(400).json({ error: "Invalid input" });
  }
});

app.listen(8095, () => console.log("Server running on port 8095"));
