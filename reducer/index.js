const defaultState = {
    rss: '',
    user_id: 5,
    user_podcasts: '',
    // [
    //   {
    //     description: null,
    //     id: 3,
    //     img_url: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts123/v4/31/e2/0e/31e20e97-63a4-be59-5210-299e3dc903f7/mza_5431675134966086683.jpeg/100x100bb.jpg",
    //     podcast_name: "Tim Ferriss: Bestselling Author, Human Guinea Pig",
    //     rss: "https://rss.art19.com/tim-ferriss-show",
    //   },
    //  {
    //     description: null,
    //     id: 4,
    //     img_url: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/16/e6/31/16e631fe-d2cb-7ca0-f1b2-3bbc07b0c293/mza_1989164661815778920.jpeg/100x100bb.jpg",
    //     podcast_name: "The Portal",
    //     rss: "https://rss.art19.com/the-portal",
    //   },
    // ],
    podcastData: '',
    episodeData: ''
}

////// test user_podcast data:
// [
//   {
//     description: null,
//     id: 1,
//     img_url: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts123/v4/31/e2/0e/31e20e97-63a4-be59-5210-299e3dc903f7/mza_5431675134966086683.jpeg/100x100bb.jpg",
//     podcast_name: "Tim Ferriss: Bestselling Author, Human Guinea Pig",
//   },
//  {
//     description: null,
//     id: 2,
//     img_url: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/83/0f/7f/830f7fc6-eb1e-00d6-db2b-d3da4b82328e/mza_5561333771912948069.jpg/100x100bb.jpg",
//     podcast_name: "Ted Radio Hour",
//   },
// ]

////// test podcastData data:
// {
//   artist_name: "Eric Weinstein",
//   collection_name: "The Portal",
//   image_medium: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/16/e6/31/16e631fe-d2cb-7ca0-f1b2-3bbc07b0c293/mza_1989164661815778920.jpeg/100x100bb.jpg",
//   image_small: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/16/e6/31/16e631fe-d2cb-7ca0-f1b2-3bbc07b0c293/mza_1989164661815778920.jpeg/60x60bb.jpg",
//   rss: "https://rss.art19.com/the-portal"

////// test episodeData data:
// {
//   audio: "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/777009b2-9a58-431f-9237-0581716107a8.mp3",
//   pubDate: "Thu, 21 Nov 2019 21:31:23 -0000",
//   title: "12: Vitalik Buterin - The Ethereal Prince and His Virtual Machine ",
// }
 
  function reducer(prevState = defaultState, action){
    switch(action.type){
      case "SET_USER":
        return {...prevState, user_id: action.payload}  
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