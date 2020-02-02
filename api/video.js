import instance from './instance'

export function getVideoInfo(videoId) {
    return instance({
        url: `/api/v2/video/${videoId}`
    })
}

export function getVideoComments(videoId) {
    return instance({
        url: `/api/v2/video/${videoId}/comments`
    })
}

export function getVideoUrl(videoId) {
    return instance({
        url: `/api/v2/video/${videoId}/playinfo`
    })
}
