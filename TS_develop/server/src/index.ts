import "dotenv/config";
import express from "express";
import cors from "cors";

// server/src/index.ts
import dotenv from "dotenv";
import path from "node:path";

// server/.env 를 확실히 지정
dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔎 전역 요청 로거
app.use((req, _res, next) => {
  console.log("[req]", req.method, req.url);
  next();
});

app.post("/api/spotify/token", async (_req, res) => {
  try {
    const id = process.env.SPOTIFY_CLIENT_ID;
    const secret = process.env.SPOTIFY_SECRET_ID;
    console.log("[env]", { id: !!id, secret: !!secret });

    if (!id || !secret) return res.status(500).json({ error: "Missing SPOTIFY envs" });

    const basic = Buffer.from(`${id}:${secret}`).toString("base64");
    const body = new URLSearchParams({ grant_type: "client_credentials" });

    // console.log("===== [Spotify Request Debug] =====");
    // console.log("POST https://accounts.spotify.com/api/token");
    // console.log("Headers:", { Authorization: `Basic ${basic.slice(0,10)}...`, "Content-Type": "application/x-www-form-urlencoded" });
    // console.log("Body:", body.toString());
    // console.log("====================================");

    const r = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const text = await r.text();
    console.log("[spotify][status]", r.status);
    console.log("[spotify][text]", text);

    if (!r.ok) return res.status(r.status).type("application/json").send(text);
    return res.type("application/json").send(text);
  } catch (e: any) {
    console.error("[server][error]", e);
    return res.status(500).json({ error: e?.message ?? "Internal Server Error" });
  }
});

// 🔎 404 로거
app.use((req, res) => {
  console.log("[404]", req.method, req.url);
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
