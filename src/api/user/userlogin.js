import request from '@/request.js'

export function userlogin(username,password) {
    return request({
        url: "/user/login.do?",
        method: 'post',
        params:username,password
    });
}