import instance from './instance'

export function getCourseList(params) {
    return instance({
        url: '/api/v2/courses',
        data: params
    })
}

export function getCourseCategories(params) {
    return instance({
        url: '/api/v2/course_categories',
        data: params
    })
}

export function getCourseInfo(courseId) {
    return instance({
        url: `/api/v2/course/${courseId}`
    })
}

export function getCourseComment(courseId) {
    return instance({
        url: `/api/v2/course/${courseId}/comment`
    })
}

export function getCourseComments(courseId) {
    return instance({
        url: `/api/v2/course/${courseId}/comments`
    })
}