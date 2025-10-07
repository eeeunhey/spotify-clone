
import axios from "axios";
import type { ClientCredentialTokenResponse } from "../../models/auth";
import { clientId, clientSecret } from "../configs/authConfig";

const encodeBase64 = (data: string): string => {
  return btoa(data);
};

export const getClientCredentialToken = async ():Promise<ClientCredentialTokenResponse> => {
    try {
        const basic = encodeBase64(`${clientId}:${clientSecret}`);
        const body = new URLSearchParams({
            grant_type:"client_credentials"
        })
        const response = await axios.post("https://accounts.spotify.com/api/token",body, {
            headers: {
                Authorization: `Basic ${basic}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
            
        })
        return response.data;
       
    }catch(error) {
        throw new Error("Fail to fetch client credential token");
    }
}