import axios from "axios";

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

const getVideos = async (query) => {
  const params = {
    part: "snippet",
    q: query,
    maxResults: 2,
    type: "video",
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  };

  try {
    const resp = await axios.get(`${YOUTUBE_BASE_URL}/search`, { params });
    
    // Map only useful data
    return resp.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.high?.url,
    }));
  } catch (err) {
    console.error("YouTube API error:", err.response?.data || err.message);
    return [];
  }
};

export default {
  getVideos,
};
