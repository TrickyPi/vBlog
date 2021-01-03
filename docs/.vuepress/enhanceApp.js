import { getToken } from "./app/api/";
import Cookies from "js-cookie";

export default ({
    Vue, // 当前 VuePress 应用所使用的 Vue 版本
    options, // 根 Vue 实例的选项
    router, // 应用程序的路由实例
    siteData // 网站元数据
}) => {
    const name = window.localStorage.getItem("visitor_name");
    const avatar = window.localStorage.getItem("visitor_avatar");
    if (name || avatar)
        Vue.prototype.$visitor = {
            name,
            avatar
        };
    router.beforeEach((to, from, next) => {
        const code = to.query.code;
        if (to.query.code && !Vue.prototype.$visitor) {
            getToken({ code: to.query.code }).then((res) => {
                window.localStorage.setItem("visitor_name", res.data.data.name);
                window.localStorage.setItem(
                    "visitor_avatar",
                    res.data.data.avatar_url
                );
            });
        }
        next();
    });
    // ...使用应用程序级别的增强功能
};
