/*
 * @Author: Lsj
 * @Date: 2020-11-03 21:52:27
 * @LastEditTime: 2020-12-13 20:23:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uniapp/myproject/src/network/api.js
 */
import service from '../network/axios'

//获取所有会议室信息    <-首页
export function GetAllRoom(data) {
    return service({
        method: 'post',
        url: '/meeting/room/getAll',
        data
    })
}

//根据会议室名称搜索会议室
export function SearchRoonByName(data) {
    return service({
        method: 'get',
        url: `/meeting/room/get/name/${data.name}`,
    })
}

//预约会议   
export function applyMeeting(data) {
    return service({
        method: 'post',
        url: '/meeting/insert',
        data,
    })
}


//根据会议id查会议详情
export function getDetailById(id) {
    return service({
        method: 'get',
        url: `/meeting/get/id/${id}`,
    })
}


//获取所有用户
export function getAllUsers(data) {
    return service({
        method: 'get',
        url: `/user/name/${data}`,
    })
}








//管理员端口
//获取所有预约列表    <-管理
export function GetAllMeeting(data) {
    return service({
        method: 'get',
        url: `/meeting/get/${data.type}`,
        params: {
            id: data.id,
            page: 0,
            size: 9999,
            theme: data.theme,
        }
    })
}

//管理员审核会议同意   
export function checkMeeting(data) {
    return service({
        method: 'post',
        url: '/meeting/check',
        data,
        // paramsSerializer: function(params) {
        //     const idList = params.id.map(_=>`idList=${_}`).join('&');
        //     return `${idList}`
        // }
    })
}

//管理员审核会议拒绝
export function deleteMeeting(data) {
    return service({
        method: 'post',
        url: '/meeting/delete',
        data,
    })
}


//添加会议室    <-添加
export function AddRoom(newRoom,fileForm) {
    return service({
        method: 'post',
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        //   },
        url: '/meeting/room/insert',
        data: fileForm,
        params: newRoom,
    })
}


//修改会议信息
export function ModifyInfo(data) {
    return service({
        method: 'post',
        url: '/meeting/update',
        data
    })
}


//审核同意
export function a(newRoom,fileForm) {
    return service({
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        url: '/meeting/room/insert',
        data: fileForm,
        params: newRoom,
    })
}

//添加权限
export function addAdmin(data) {
    return service({
        method: 'post',
        url: '/user/admin',
        data
    })
}









//用户申请者
//结束会议
export function endMeeting(data) {
    return service({
        method: 'post',
        url: `/meeting/end/${data.id}`,
    })
}


//获取申请会议记录
export function getApplyRecording(data) {
    return service({
        method: 'get',
        url: `/meeting/get/myself/${data.id}`,
        params: {
            page:  0,
            size: 9999,
            tag: data.theme
        }
    })
}


//导出Excel
export function exportExcel(data) {
    return service({
        method: 'post',
        url: `/meeting/sign/table/${data.meetingId}`,
    })
}



//登陆
export function LoginData(data) {
    return service({
        method: 'post',
        url: `/user/insert`,
        data
    })
}


//登陆
export function reLoginData(data) {
    return service({
        method: 'post',
        url: `/user/${data}`,
    })
}
