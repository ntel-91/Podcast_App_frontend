const defaultState = {
    rss: ''
  }
  
  function reducer(prevState = defaultState, action){
    switch(action.type){
      case "SET_RSS":
        return {...prevState, rss: action.payload}
      case "HANDLE_CHANGE":
        return {...prevState, text: action.payload}
      // case "RESET":
      //   return defaultState
      default:
        return prevState
    }
  
  }
  
  export default reducer