const defaultState = {
    rss: '',
    user_podcasts: ''
  }
  
  function reducer(prevState = defaultState, action){
    switch(action.type){
      case "SET_USER_PODCASTS":
        return {...prevState, user_podcasts: action.payload}
      case "SET_PODCAST_DATA":
        return {...prevState, podcastData: action.payload}
      // case "RESET":
      //   return defaultState
      default:
        return prevState
    }
  
  }
  
  export default reducer