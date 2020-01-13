(function (document, window, $) {
    $.site = {};
    $.site.ajax = (function () {
        var loginUserInfo = sessionStorage.getItem('loginUserInfo');
        loginUserInfo = JSON.parse(loginUserInfo);
        var accessToken = '';
        var userInfo = $.extend(true, loginUserInfo);
        //设置token
        var proxy = function (option) {
            var defaultOptions = {
                type: 'post',
                async: true,
                headers: {},
                error: function (result) {
                     loginOut();
                },

            }
            var settings = $.extend(defaultOptions, option);
            var success = settings.success;
            //增加成功函数代码
            var success_proxy = function (data, textStatus, xhr) {
                var responseHeader = xhr.getResponseHeader('authorization');
                if (responseHeader) {
                    sessionStorage.setItem('loginUserInfo', JSON.stringify({ 'access_token': responseHeader }));
                    userInfo= JSON.parse(sessionStorage.getItem('loginUserInfo'));
                    accessToken = responseHeader;
                }
                if(data.code== "9999101"){
                    loginOut()
                }
                success && success(data, textStatus, xhr)
            }
            if (loginUserInfo) {
             
                settings.url =settings.url;
                if (accessToken) {
                } else {
                    accessToken = loginUserInfo.access_token;
                }
                if (accessToken) {
                    settings.headers.Authorization = accessToken;
                    
                    var TENANTID=window.sessionStorage.getItem('TENANTID');
                    if(TENANTID){
                        settings.headers.TENANTID = TENANTID;
                    }
                    settings.success = success_proxy;
                    $.ajax(settings)
                } else {
                    loginOut();
                }
            }else{
                loginOut();
            }

        }

        var loginOut = function () {
            sessionStorage.clear();
            localStorage.clear();
            location.href = '/login/login.html';
            return false;
        }
        //截取地址
        var splitUrlParams = function (url) {
            var urlParams = {};
            var loc = url || window.location.href;
            if (loc.indexOf("?") > 0) {
                var ls = loc.substring(loc.indexOf('?') + 1, loc.length);
                ls = decodeURI(ls);
                if (ls.indexOf("&") > 0) {
                    var lss = ls.split('&');
                    if (lss && lss.length > 0) {
                        for (var i = 0; i < lss.length; i++) {
                            if (less[i].indexOf("=") > 0) {
                                var s = lss[i].split('=');
                                (s && s.length === 2) ? (urlParams[s[0]] = s[1]) : null
                            }
                        }
                    }
                } else if (ls.indexOf('=') > 0) {
                    var s = ls.split("=");
                    (s && s.length === 2) ? (urlParams[s[0]] = s[1]) : null
                }
            }
            return urlParams;
        }
        var pagination = function (option) {
            var id = option.id;
            var total = option.total;
            $(id).pagination(total, {
                items_per_page: option.PageNum,
                num_display_entries: option.viewCount,
                callback: option.callback,
                num_edge_entries: 0
            });
        }
        return {
            proxy: proxy,
            pagination: pagination,
            userInfo: userInfo,
            splitUrlParams: splitUrlParams,
        }
    })()

})(document, window, $)