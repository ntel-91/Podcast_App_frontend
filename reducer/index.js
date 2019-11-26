const defaultState = {
    rss: '',
    user_podcasts: '',
    podcastData: {
      artist_name: "Eric Weinstein",
      collection_name: "The Portal",
      image_medium: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/16/e6/31/16e631fe-d2cb-7ca0-f1b2-3bbc07b0c293/mza_1989164661815778920.jpeg/100x100bb.jpg",
      image_small: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/16/e6/31/16e631fe-d2cb-7ca0-f1b2-3bbc07b0c293/mza_1989164661815778920.jpeg/60x60bb.jpg",
      rss: "https://rss.art19.com/the-portal",
    },
    episodeData: {
      audio: "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/777009b2-9a58-431f-9237-0581716107a8.mp3",
      pubDate: "Thu, 21 Nov 2019 21:31:23 -0000",
      title: "12: Vitalik Buterin - The Ethereal Prince and His Virtual Machine ",
    }
}

 
  function reducer(prevState = defaultState, action){
    switch(action.type){
      case "SET_USER_PODCASTS":
        return {...prevState, user_podcasts: action.payload}
      case "SET_PODCAST_DATA":
        return {...prevState, podcastData: action.payload}
        case "SET_EPISODE_DATA":
          return {...prevState, episodeData: action.payload}  
      // case "RESET":
      //   return defaultState
      default:
        return prevState
    }
  
  }
  
  export default reducer