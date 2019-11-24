export function setUserPodcasts(podcasts){
    return {type: "SET_USER_PODCASTS", payload: podcasts}
}

export function setRssFeed(rss){
    return {type: "SET_RSS", payload: rss}
}

export function handleChange(text){
    return {type: "HANDLE_CHANGE", payload: text}
}

