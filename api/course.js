import instance from './instance'

export function list(params) {
    return instance({
        url: '/api/v2/courses',
        data: params
    })
}

export function categories(params) {
    return instance({
        url: '/api/v2/course_categories',
        data: params
    })
}

export function detail(courseId) {
    return instance({
        url: `/api/v2/course/${courseId}`
    })
}

export function comments(courseId) {
    return instance({
        url: `/api/v2/course/${courseId}/comments`
    })
}

export function createComment(courseId, params) {
    return instance({
        method: 'POST',
        url: `/api/v2/course/${courseId}/comment`,
        data: params
    })
}

export function like(courseId) {
    return instance({
        url: `/api/v2/course/${courseId}/like`
    })
}