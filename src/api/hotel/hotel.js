import request from '@/request.js'

export function addAdmin(userid,time,platform,romno,name,romtype,paymoney,money,brokerage,day,classes,person) {
    return request({
        url: "/hotel/addhotel.do?",
        method: 'post',
        params:userid,time,platform,romno,name,romtype,paymoney,money,brokerage,day,classes,person
    });
}


export function getList() {
    return request({
        url: "/hotel/findhotel.do?",
        method: 'get',
    });
}


export function updateAdmin(userid,time,platform,romno,name,romtype,paymoney,money,brokerage,day,classes,person) {
    return request({
        url:'/hotel/uphotel.do?',
        method:'put',
        params: userid,time,platform,romno,name,romtype,paymoney,money,brokerage,day,classes,person
    });
}

export function deleteAdmin(userid) {
    return request({
        url:'/hotel/delhotel.do?userid='+userid,
        method:'delete',
        patams:userid
    });
}
