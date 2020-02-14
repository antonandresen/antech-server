import axios from 'axios';
import { getAccessToken } from '../helpers/YTAccessToken';


export class YoutubeApiHelper {

  constructor() {}

  static getCourses = async () => {
    const accessToken = getAccessToken();
    const url = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCj1wCzm_fzG_tUBh8-780ZQ&maxResults=50';
    const resp = await axios.get(`${url}&key=${process.env.GOOGLE_API_KEY}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const playlists = resp.data.items;
    
    const url2 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50';
    playlists.forEach(async (playlist: any) => {
      const resp2 = await axios.get(`${url2}&playlistId=${playlist.id}&key=${process.env.GOOGLE_API_KEY}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      resp2.data.items.forEach((item: any) => {
        console.log(item.snippet.title);
      });
    });
  }
};