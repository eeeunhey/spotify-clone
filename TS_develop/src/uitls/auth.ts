import { base64encode, generateRandomString, sha256 } from "./crypto";

export const getSpotifyAuthUrl = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);


  localStorage.setItem("code_verifier", codeVerifier);

  const res = await fetch("http://localhost:4000/api/spotify/login-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code_challenge: codeChallenge }),
  });

  const { url } = await res.json();


  window.location.href = url;
};
