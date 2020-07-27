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

export function getCourseComment(courseId) {
    return instance({
        url: `/api/v2/course/${courseId}/comment`
    })
}

export function comments(courseId) {
    return instance({
        url: `/api/v2/course/${courseId}/comments`
    })
}