
const defaultState = {
    rss: '',
    user_id: '',
    user_podcasts: '',
    podcastData: '',
    episodeData: '',
    user_episodes: '',
    user_bookmarks: '',
    podcast_bookmarks: '',
    episode_bookmarks: ''
}


function reducer(prevState = defaultState, action){
    switch(action.type){
        case "SET_EPISODE_BOOKMARKS":
            return {...prevState, episode_bookmarks: action.payload}
        case "SET_PODCAST_BOOKMARKS":
            return {...prevState, podcast_bookmarks: action.payload}
        case "SET_USER":
            return {...prevState, user_id: action.payload}
        case "SET_USER_PODCASTS":
            return {...prevState, user_podcasts: action.payload}
        case "SET_PODCAST_DATA":
            return {...prevState, podcastData: action.payload}
        case "SET_EPISODE_DATA":
            return {...prevState, episodeData: action.payload}
        case "SET_USER_BOOKMARKS":
            return {...prevState, user_bookmarks: action.payload}
        case "SET_USER_EPISODES":
            return {...prevState, user_episodes: action.payload}
        default:
            return prevState
    }
}
  
export default reducer




// dummy data

// USER ID
id = 8

// USER PODCASTS
userPodcasts = [
     {
      created_at: "2019-12-03T16:17:16.427Z",
      description: null,
      id: 79,
      img_url: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts123/v4/31/e2/0e/31e20e97-63a4-be59-5210-299e3dc903f7/mza_5431675134966086683.jpeg/100x100bb.jpg",
      podcast_name: "Tim Ferriss: Bestselling Author, Human Guinea Pig",
      rss: "https://rss.art19.com/tim-ferriss-show",
      updated_at: "2019-12-03T16:17:16.427Z",
    },
     {
      created_at: "2019-12-03T16:17:16.432Z",
      description: null,
      id: 80,
      img_url: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/16/e6/31/16e631fe-d2cb-7ca0-f1b2-3bbc07b0c293/mza_1989164661815778920.jpeg/100x100bb.jpg",
      podcast_name: "The Portal",
      rss: "https://rss.art19.com/the-portal",
      updated_at: "2019-12-03T16:17:16.432Z",
    },
     {
      created_at: "2019-12-03T16:28:25.131Z",
      description: null,
      id: 81,
      img_url: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts123/v4/12/ab/d6/12abd655-2473-c4fb-7d53-33e1b9e4afdc/mza_6788052308516976968.jpg/600x600bb.jpg",
      podcast_name: "The Joe Rogan Experience",
      rss: "http://joeroganexp.joerogan.libsynpro.com/rss",
      updated_at: "2019-12-03T16:28:25.131Z",
    },
]
  
// USER EPISODES

userEpisodes = [
    {
     "80":  [
        {
         audio: "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/a2cbf04a-a382-4a9f-a0eb-074c328ccd21.mp3",
         created_at: "2019-12-03T16:17:16.493Z",
         description: "",
         episode_name: "14: London Tsai - The Reclusive Dean of The New Escherians",
         id: 5,
         podcast_id: 80,
         updated_at: "2019-12-03T16:17:16.493Z",
       },
       {
         audio: "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/18c7a9b0-14e9-405e-adaa-babe36c5b96d.mp3",
         created_at: "2019-12-03T16:17:16.502Z",
         description: "",
         episode_name: "13: Garry Kasparov - Avoiding Zugzwang in AI and Politics ",
         id: 6,
         podcast_id: 80,
         updated_at: "2019-12-03T16:17:16.502Z",
       },
     ],
   },
    {
     "79": [
        {
         audio: "https://rss.art19.com/episodes/a2c25d5a-5130-47a0-a746-f2bdcae67dc1.mp3",
         created_at: "2019-12-03T16:17:16.511Z",
         description: "",
         episode_name: "#398: Peter Attia, M.D. — Fasting, Metformin, Athletic Performance, and More",
         id: 7,
         podcast_id: 79,
         updated_at: "2019-12-03T16:17:16.511Z",
       },
        {
         audio: "https://rss.art19.com/episodes/f0f6d83f-20b7-4736-8e71-a36eb1b79db1.mp3",
         created_at: "2019-12-03T16:17:16.519Z",
         description: "",
         episode_name: "#397: Two Questions Every Entrepreneur Should Answer",
         id: 8,
         podcast_id: 79,
         updated_at: "2019-12-03T16:17:16.519Z",
       },
     ],
   },
]

//  // USER BOOKMARKS
userBookmarks = [
    {
     "5": [
        {
         bookmark_time: 60000,
         created_at: "2019-12-03T16:17:16.531Z",
         episode_id: 5,
         id: 6,
         updated_at: "2019-12-03T16:17:16.531Z",
         user_id: 7,
       },
        {
         bookmark_time: 120000,
         created_at: "2019-12-03T16:17:16.545Z",
         episode_id: 5,
         id: 7,
         updated_at: "2019-12-03T16:17:16.545Z",
         user_id: 7,
       },
     ],
   },
    {
     "6": [
        {
         bookmark_time: 120000,
         created_at: "2019-12-03T16:17:16.554Z",
         episode_id: 6,
         id: 8,
         updated_at: "2019-12-03T16:17:16.554Z",
         user_id: 7,
       },
     ],
   },
    {
     "8": [
        {
         bookmark_time: 120000,
         created_at: "2019-12-03T16:17:16.563Z",
         episode_id: 8,
         id: 9,
         updated_at: "2019-12-03T16:17:16.563Z",
         user_id: 7,
       },
     ],
   },
    {
     "7": [
        {
         bookmark_time: 180000,
         created_at: "2019-12-03T16:17:16.571Z",
         episode_id: 7,
         id: 10,
         updated_at: "2019-12-03T16:17:16.571Z",
         user_id: 7,
       },
     ],
   },
]