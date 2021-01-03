import request from "./request";

export const getAllComment = () => {
    return request({
        api: "commentAll",
        method: "GET"
    });
};

export const postComment = data => {
    return request({
        needAuth: true,
        api: "comment",
        method: "POST",
        data
    });
};

export const getToken = data => {
    return request({
        api: "token",
        method: "post",
        data
    });
};
