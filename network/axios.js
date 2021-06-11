/*
 * @Author: your name
 * @Date: 2020-11-03 21:52:35
 * @LastEditTime: 2020-12-14 17:17:32
 * @LastEditors: Sakurag1_LSJ
 * @Description: In User Settings Edit
 * @FilePath: /uniapp/myproject/src/network/axios.js
 */
import axios from 'axios'
import Vue from 'vue'


const service = axios.create({
    // baseURL: 'http://heguicai.cool:9030', // url = base url + request url
    baseURL: 'http://192.168.43.27:9030',
    // baseURL: 'https://test.heguicai.cool',
    withCredentials: true, // send cookies when cross-domain requests
    // timeout: 5000, // request timeout
    crossDomain: true
})

axios.defaults.adapter = function(config) {
    return new Promise((resolve, reject) => {
        // console.log("this is config",config)
        var settle = require('axios/lib/core/settle');
        var buildURL = require('axios/lib/helpers/buildURL');
        if(wx.getStorageSync('token')){
            config.headers['Authorization'] = wx.getStorageSync('token')
        }
        // console.log(config.headers)
        uni.request({
            method: config.method.toUpperCase(),
            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };
  
                settle(resolve, reject, response);
            }
        })
    })
  }

  Vue.prototype.$axios = service
  Vue.config.productionTip = false
  
  export default service;
