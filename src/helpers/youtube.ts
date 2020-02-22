import axios from 'axios';
import { getAccessToken } from '../helpers/YTAccessToken';


export class YoutubeApiHelper {

  constructor() {}

  static getCourses = async () => {

    try {
      const accessToken = getAccessToken();
    const url = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCj1wCzm_fzG_tUBh8-780ZQ&maxResults=50';
    const resp = await axios.get(`${url}&key=${process.env.GOOGLE_API_KEY}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const playlists = resp.data.items;
    const coursePlaylists = playlists.filter((pl: any) => pl.snippet.title.startsWith('COURSE:'));
    console.log("NICE", coursePlaylists);
    
    const url2 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50';
    playlists.forEach(async (playlist: any) => {
      const resp2 = await axios.get(`${url2}&playlistId=${playlist.id}&key=${process.env.GOOGLE_API_KEY}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      //console.log(resp2.data);
      /*resp2.data.items.forEach((item: any) => {
        console.log(item.snippet);
      });*/
    });
    } catch (err) {
      console.error('youtube.getCourses', err);
    }
  }
};