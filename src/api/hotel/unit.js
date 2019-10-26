import request from '@/request.js'

export function addAdmin(id,counit,unitphone,resmoney,bigbed,twobed) {
    return request({
        url: "/unit/addunit.do?",
        method: 'post',
        params:id,counit,unitphone,resmoney,bigbed,twobed
    });
}


export function getList() {
    return request({
        url: "/unit/findunit.do?",
        method: 'get',
    });
}


export function updateAdmin(id,counit,unitphone,resmoney,bigbed,twobed) {
    return request({
        url:'/unit/upunit.do?',
        method:'put',
        params: id,counit,unitphone,resmoney,bigbed,twobed
    });
}

export function deleteAdmin(id) {
    return request({
        url:'/unit/delunit.do?id='+id,
        method:'delete',
        patams:id
    });
}
