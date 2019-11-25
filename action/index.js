export function setUserPodcasts(podcasts){
    return {type: "SET_USER_PODCASTS", payload: podcasts}
}

export function setPodcastData(podcastData){
    return {type: "SET_PODCAST_DATA", payload: podcastData}
}

export function setEpisodeData(episodeData){
    return {type: "SET_EPISODE_DATA", payload: episodeData}
}

