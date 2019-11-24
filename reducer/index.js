const defaultState = {
    rss: '',
    user_podcasts: ''
  }
  
  function reducer(prevState = defaultState, action){
    switch(action.type){
      case "SET_USER_PODCASTS":
        return {...prevState, user_podcasts: action.payload}
      case "SET_RSS":
        return {...prevState, rss: action.payload}
      // case "RESET":
      //   return defaultState
      default:
        return prevState
    }
  
  }
  
  export default reducer