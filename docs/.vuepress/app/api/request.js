import axios from "axios";
const PREFIXURL = "http://127.0.0.1:3000/";

const request = axios.create({
    timeout: 60 * 1000
});

request.interceptors.request.use(
    config => {
        return {
            ...config,
            url: PREFIXURL + config.api
        };
    },
    err => {
        return Promise.reject(err);
    }
);

request.interceptors.response.use(
    response => {
        if (response.status !== 200 || response.data.errcode !== 0) {
            return Promise.reject(response.data);
        }
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default request;
