import axios from "axios";

//创建axios实例
const service=axios.create({
    baseURL:'http://39.96.169.83:8888',
    timeout:5000
})

export default service
