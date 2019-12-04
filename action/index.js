export function podcastEpisodesWithBookmarks(episodes){
    return {type: "SET_PODCAST_BOOKMARKS", payload: episodes}
}

export function currentEpisodeBookmarks(bookmarks){
    return {type: "SET_EPISODE_BOOKMARKS", payload: bookmarks}
}

export function setUser(user){
    return {type: "SET_USER", payload: user}
}

export function setUserPodcasts(podcasts){
    return {type: "SET_USER_PODCASTS", payload: podcasts}
}

export function setPodcastData(podcastData){
    return {type: "SET_PODCAST_DATA", payload: podcastData}
}

export function setEpisodeData(episodeData){
    return {type: "SET_EPISODE_DATA", payload: episodeData}
}

export function setUserEpisodes(episodes){
    return {type: "SET_USER_EPISODES", payload: episodes}
}

export function setUserBookmarks(bookmarks){
    return {type: "SET_USER_BOOKMARKS", payload: bookmarks}
}
