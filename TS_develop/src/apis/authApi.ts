import axios from "axios";
import type { ClientCredentialTokenResponse } from "../../models/auth";

export const getClientCredentialToken = async (): Promise<ClientCredentialTokenResponse> => {
  const res = await axios.post<ClientCredentialTokenResponse>("/api/spotify/token"); // POST 유지
  return res.data;
};
