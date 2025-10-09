
import dotenv from "dotenv";
import path from "path";

// ① .env 경로를 명시적으로 지정
dotenv.config({ path: path.resolve(__dirname, "../../server/.env") });


export const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
export const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;


