import dotenv from "dotenv";
import path from "node:path";
import express from "express";
import cors from "cors";
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

function errorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  try { return JSON.stringify(e); } catch { return String(e); }
}

app.post("/api/spotify/login-url", (req, res) => {
  const { code_challenge } = req.body;
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const redirectUri = process.env.REDIRECT_URI!;
  const scope = "user-read-private user-read-email";
  console.log("redirectUri",redirectUri)

  if (!code_challenge)
    return res.status(400).json({ error: "Missing code_challenge" });

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope,
    code_challenge_method: "S256",
    code_challenge,
  });

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  console.log("[login-url][url]", url);

  return res.json({ url }); // ✅ 한 번만 응답
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
  } catch (e: unknown) {
    console.error("[server][error]", e);
    return res.status(500).json({ error: errorMessage(e) });
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
