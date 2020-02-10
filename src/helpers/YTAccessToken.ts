import axios from 'axios';

let accessToken: string = '';
const accessTokenUrl =  'https://developers.google.com/oauthplayground/refreshAccessToken';

const TEN_MINUTES_IN_MS = 600000;

// make function with setInterval that updates it!!!
export const startAccessToken = (): void =>  {
  setInterval( async () => {
    updateAccessToken();
  }, TEN_MINUTES_IN_MS);
  updateAccessToken();
};

export const getAccessToken = (): string => {
  return accessToken;
}

const updateAccessToken = async () => {
  const payload = {
    token_uri: 'https://oauth2.googleapis.com/token',
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  };

  try {
    const postRes = await axios.post(accessTokenUrl, payload);
    accessToken = postRes.data.access_token;
    console.log("Refreshed access token!");
  } catch (error) {
  console.error(error);
}
};