var comm = {
     
    /*
     *appId
    */
    appId: function () {
        return "wx83ac420864e29cb2";
    },

    goVideo: function (title,url) {
        comm.setCache('set-video-title', title);
        comm.setCache('set-video-url', url);
        if (comm.isWindows() == false) {
            comm.goTo('video.html');
        }
        else {
            window.open('video.html', '_blank');
        }
    },

    showXCX: function () {
        if (comm.isWeiXin()) {
            comm.viewImages('http://www.xuefovip.com/images/guanzhu.jpg');
        }
        else {
            if (comm.isWindows()) {
                comm.goTo('index.html');
            }
            else {
                comm.goTo('http://www.xuefovip.com/images/guanzhu.jpg');
            }            
        }
    },

    /*
     * 初始化actionList
    */
    showActionList: function (title, array, success) {
        if ($('#actionsheet_list_container')) {
            $('#actionsheet_list_container').remove();
        }

        var temp = '<div id="actionsheet_list_container"><select id="actionsheet_list" class="sqh_color_99" data-role="none" style="display: none;">';
        for (var i = 0; i < array.length; i++) {
            temp += '<option value="' + array[i] + '">' + array[i] + ' </option>';
        }
        temp += '</select><input id="actionsheet_list_hid" type="hidden" /></div>';
        $("body").append(temp);

        var opt = {
            theme: 'ios',
            display: 'bottom',      //在页面的什么位置显示
            lang: "zh",
            group: true,
            setText: '确定', //确认按钮名称
            cancelText: "取消",
            headerText: function (valueText) { //自定义弹出框头部格式  
                return title;
            }
        };
        $("#actionsheet_list").mobiscroll().select(opt);
        $("#actionsheet_list").change(function () {
            var key = comm.getString($(this).val());
            if (key != '') {
                success(key);
            }
        });
        $("#actionsheet_list_dummy").click();
    },

    /*
     *获取时间戳
    */
    getTimeStamp: function () {
        var date = new Date().getTime() / 1000;
        var timestamp = date.toString().split('.')[0];
        var timestampstring = timestamp.toString();//一定要转换字符串
        oldTimeStamp = timestampstring;
        return timestampstring;
    },

    /*
     *获取随机数
    */
    getRandomNum: function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    },

    /*
     *生成32位随机串
    */
    getNonceStr: function () {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var maxPos = chars.length;
        var noceStr = "";
        for (i = 0; i < 32; i++) {
            noceStr += chars.charAt(Math.floor(Math.random() * maxPos));

        }
        oldNonceStr = noceStr;
        return noceStr;
    },

    /*
     *是否苹果
    */
    iphone: function () {
        return is.iphone() || is.ios();
    },

    /*
     *是否安卓
    */
    android: function () {
        return is.android() || is.androidPhone() || is.androidTablet();
    },

    /*
     *遮罩层
    */
    mask: function (msg) {
        layer.open({
            type: 2,
            shadeClose: false,
            content: msg
        });
    },

    /*
     *隐藏遮罩层
    */
    unmask: function () {
        layer.closeAll();
    },

    /*
     * toast
    */
    toast: function (msg) {
        layer.open({
            content: msg,
            skin: 'msg',
            time: 2
        });
    },

    /*
     * toast
    */
    errorinfo: function (msg) {
        layer.open({
            content: msg
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    },

    /*
     * 对话框
    */
    alert: function (msg, callback) {
        mdui.alert(msg, function () {
            if (callback)
                callback();
        }, { confirmText: '我知道了', modal: true, history: true });
    },

    /*
     * 对话框
    */
    tip: function (title, msg, callback, confirmText) {
        var msg = comm.replaceAll(msg, '\\n', '<br/>');
        msg = comm.replaceAll(msg, '\n', '<br/>');
        setTimeout(function () {
            if (callback) {
                mdui.alert(msg, title, callback, { confirmText: confirmText ? confirmText : '我知道了', modal: true, history: true });
            }
            else {
                mdui.alert(msg, title, null, { confirmText: confirmText ? confirmText : '我知道了', modal: true, history: true });
            }
        }, 300);
    },

    /*
     *确认框
    */
    confirmCallback_1: function (button) {

    },

    /*
     *确认框
    */
    confirmCallback_2: function (button) {

    },

    /*
     *确认框
    */
    confirm: function (title, msg, left, right, callback1, callback2) {
        mdui.confirm(msg, title, callback2, callback1, { confirmText: right, cancelText: left, modal: true, history: true });
    },

    /*
     *输入框
    */
    prompt: function (title, msg, left, right, callback1, callback2) {
        mdui.prompt(msg, title,
          function (value) {
              if (callback2) {
                  callback2(value);
              }
          },
          function (value) {
              if (callback1) {
                  callback1(value);
              }
          }, { confirmText: right, cancelText: left, history: true }
        );
    },

    /*
     * 阅读文章
    */
    read: function (md5, title, module) {
        if (comm.isXCX()) {
            wx.miniProgram.navigateTo({ url: '/webview/index?md5=' + md5 });
        }
        else {
            if (md5 == '80E1672938DBBE301C8DC9266C85221C') {
                comm.goTo('index.html');
            }
            else {
                comm.goTo('show_' + md5 + '.html');
            }
        }
    },

    /*
     *刷新当前页面
    */
    reload: function () {
        window.location.reload();
    },

    /*
     *动态加载js
    */
    includeJs: function (url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
        script.onload = script.onreadystatechange = function () {
            if (script.readyState && script.readyState != 'loaded' && script.readyState != 'complete') return;
            script.onreadystatechange = script.onload = null;
            if (callback) {
                callback();
            }
        }
    },

    /*
     *动态加载css
    */
    includeLinkStyle: function (url) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    },

    /*
     *是否小程序
    */
    isXCX: function () {
        return window.__wxjs_environment === 'miniprogram';
    },

    /*
     *是否文章内容页
    */
    isArticleContent: function () {
        if (window.location.href.indexOf('show_') > 0 || window.location.href.indexOf('xcx_') > 0 || window.location.href.indexOf('sina_') > 0 || window.location.href.indexOf('weixin_') > 0 || window.location.href.indexOf('qzone_') > 0) {
            return true;
        }
        else {
            return false;
        }
    },

    init: function (callback) {
        var me = this, url = window.location.href;
        if (url.indexOf('xuefo.vip') == 0) {
            window.location.href = url.replace('xuefo.vip', 'xuefovip.com');
        }
        else if (url.indexOf('//xuefovip.com') == 0) {
            window.location.href = url.replace('//xuefovip.com', '//www.xuefovip.com');
        }
        else {
            if (me.isTest() == false) {
                //腾讯统计  
                if ('https:' == document.location.protocol) {
                    me.includeJs('https://tajs.qq.com/stats?sId=64043166');
                }
                else {
                    me.includeJs('http://tajs.qq.com/stats?sId=64043166');
                }                
            }

            if (comm.isWeiXin() == true && comm.isXCX() == false) {
                //分享初始化
                me.wx_init();

                //默认分享
                me.wx_share('佛法人生弘法平台', '发心为利他，求正等菩提', 'http://www.xuefovip.com/index.html', "http://www.xuefovip.com/images/logo.jpg");
            }

            $(document).ready(function () {
                if (comm.isXCX() && $('#btnLogo')) {
                    $('#btnLogo').remove();
                }

                if (callback) {
                    callback();
                }
            });
        }
    },

    /*
     *获取微信支付金额     
    */
    getWxAmount: function (amount) {
        if (amount.toString().indexOf('.') > 0) {
            if (amount.substr(amount.indexOf('.') + 1).length == 1) {
                amount = amount + '0';
            }
            return parseInt(amount) * 100 + parseInt(amount.toString().substr(amount.toString().indexOf('.') + 1, 1)) * 10 + parseInt(amount.toString().substr(amount.toString().indexOf('.') + 2, 1)) * 1;
        }
        else {
            return amount + '00';
        }
    },

    /*
     *调试模式
    */
    isTest: function () {
        if (window.location.href.indexOf('localhost') != -1) {
            return true;
        }
        else {
            return false;
        }
    },

    /*
     *隐藏复制链接
    */
    hideCopyUrl: function () {
        try {
            wx.hideMenuItems({
                menuList: ['menuItem:copyUrl']
            });
        } catch (e) {
            setTimeout(function () {
                comm.hideCopyUrl();
            }, 100);
        }
    },

    /*
     *隐藏发送给朋友
    */
    hideShareAppMessage: function () {
        try {
            wx.hideMenuItems({
                menuList: ['menuItem:share:appMessage']
            });
        } catch (e) {
            setTimeout(function () {
                comm.hideShareAppMessage();
            }, 100);
        }
    },

    /*
     *隐藏发送到朋友圈
    */
    hideShareTimeline: function () {
        try {
            wx.hideMenuItems({
                menuList: ['menuItem:share:timeline']
            });
        } catch (e) {
            setTimeout(function () {
                comm.hideShareTimeline();
            }, 100);
        }
    },

    /*
     *隐藏在qq浏览器中打开
    */
    hideOpenWithQQ: function () {
        try {
            wx.hideMenuItems({
                menuList: ['menuItem:openWithQQBrowser']
            });
        } catch (e) {
            setTimeout(function () {
                comm.hideOpenWithQQ();
            }, 100);
        }
    },

    /*
     *隐藏在safari浏览器中打开
    */
    hideOpenWithSafari: function () {
        try {
            wx.hideMenuItems({
                menuList: ['menuItem:openWithSafari']
            });
        } catch (e) {
            setTimeout(function () {
                comm.hideOpenWithQQ();
            }, 100);
        }
    },

    /*
     *跳转
    */
    goTo: function (url) {
        window.location.href = url;
    },

    /*
     *获取数据
    */
    getText: function (url, success, fail) {
        $.ajax({
            url: url,
            type: "get",
            dataType: 'text',
            cache: false,
            success: function (data) {
                if (success) {
                    success(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (fail) {
                    fail();
                }
            }
        });
    },

    /*
     *获取数据
    */
    get: function (url, success, fail) {
        $.ajax({
            url: url,
            type: "get",
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (success) {
                    success(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (fail) {
                    fail();
                }
            }
        });
    },

    /*
     *显示图片,破解反盗链,阿弥陀佛
    */
    showImg: function (id, url) {
        var frameid = 'frameimg' + Math.random();
        //window['img' + id] = '<style type="text/css">body{text-align:center}</style><img style="width:90%;" id=img_' + id + ' src=\'' + url + '\' /><script>window.onload = function() { parent.document.getElementById(\'' + frameid + '\').height = document.getElementById(\'img_' + id + '\').height+\'px\'; }<' + '/script>';
        window['img' + id] = '<style type="text/css">body{text-align:center}</style><img style="width:90%;" id=img_' + id + ' src=\'' + url + '\' /><script>';
        document.getElementById(id).innerHTML = '<iframe id="' + frameid + '" src="javascript:parent[\'img' + id + '\'];" frameBorder="0" scrolling="no" height="auto" width="100%"></iframe>';
    },

    /*
     *是否pc端
    */
    isWindows: function () {
        return is.windows();
    },

    /*
     *是否平板
    */
    isPad: function () {
        return is.ipad() || is.androidTablet() || is.windowsTablet();
    },

    /*
     *提交数据
    */
    post: function (url, success, fail) {
        if (url.indexOf('/') == 0) {
            url = this.homePath() + url;
        }
        $.ajax({
            url: url,
            type: "post",
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (success) {
                    success(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (fail) {
                    fail();
                }
            }
        });
    },

    /*
     *提交数据
    */
    postData: function (url, data, success, fail) {
        if (url.indexOf('/') == 0) {
            url = this.homePath() + url;
        }
        $.ajax({
            url: url,
            data: data,
            type: "post",
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (success) {
                    success(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (fail) {
                    fail();
                }
            }
        });
    },

    /*
     *全部替换
    */
    replaceAll: function (str, sptr, sptr1) {
        while (str.indexOf(sptr) >= 0) {
            str = str.replace(sptr, sptr1);
        }
        return str;
    },

    /*
     *微信分享授权
    */
    wx_config: function (token) {
        var me = this;
        var timestamp = this.getTimeStamp();
        var nonceStr = this.getNonceStr();
        var str = "jsapi_ticket=" + token + "&noncestr=" + nonceStr + "&timestamp=" + timestamp + "&url=" + window.location.href;
        var sign = CryptoJS.SHA1(str).toString();
        wx.config({
            // 开启调试模式,调用的所有api的返回值会在客户端alert出来
            // 若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            debug: false,
            // 必填，公众号的唯一标识
            appId: me.appId(),
            // 必填，生成签名的时间戳
            timestamp: timestamp,
            // 必填，生成签名的随机串
            nonceStr: nonceStr,
            // 必填，签名
            signature: sign,
            // 必填，需要使用的JS接口列表
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'chooseWXPay',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'hideMenuItems'
            ],
            success: function (res) {
                alert("检测通过：" + JSON.stringify(res));
            },
            fail: function (res) {
                //alert("检测失败：" + JSON.stringify(res));
            },
            complete: function (res) {
                //alert("检测结束");
            }
        });
    },

    /*
     *微信分享授权
    */
    wx_init: function () {
        var me = this;
        var token = me.getString(me.getCache('set-wx-token'));
        if (token != '') {
            me.wx_config(token);
        }
        else {
            $.ajax({
                url: "ticket.html",
                type: "get",
                dataType: 'text',
                cache: false,
                success: function (data) {
                    if (data != null) {
                        me.setCache('set-wx-token', data.toString());
                        me.wx_config(data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        }
    },

    /*
     *微信-显示右上角菜单
    */
    wx_showMenu: function () {
        var me = this;
        try {
            WeixinJSBridge.call('showOptionMenu');
        } catch (e) {
            setTimeout(function () {
                me.wx_showMenu();
            }, 100);
        }
    },

    /*
     *微信-隐藏右上角菜单
    */
    wx_hideMenu: function () {
        var me = this;
        try {
            WeixinJSBridge.call('hideOptionMenu');
        } catch (e) {
            setTimeout(function () {
                me.wx_hideMenu();
            }, 100);
        }
    },

    /*
     *微信分享给好友
    */
    wx_share_app: function (title, desc, link, imgUrl, callback, cancel) {
        var me = this;
        me.wx_hideMenu();
        wx.ready(function () {
            me.wx_showMenu();
            var shareData = {
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    if ($("#shareMask").length > 0) {
                        $('#shareMask').hide();
                    }
                    if (callback) {
                        callback('appmessage');
                    }
                },
                cancel: function () {
                    if ($("#shareMask").length > 0) {
                        $('#shareMask').hide();
                    }
                    if (cancel) {
                        cancel();
                    }
                }
            };
            wx.onMenuShareAppMessage(shareData);
        });
        wx.error(function (res) {
            //alert(res.errMsg);
        });
    },

    /*
     *微信分享到朋友圈
    */
    wx_share_timeline: function (title, desc, link, imgUrl, callback, cancel) {
        var me = this;
        me.wx_hideMenu();
        wx.ready(function () {
            me.wx_showMenu();
            var shareData = {
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    if ($("#shareMask").length > 0) {
                        $('#shareMask').hide();
                    }
                    if (callback) {
                        callback('timeline');
                    }
                },
                cancel: function () {
                    if ($("#shareMask").length > 0) {
                        $('#shareMask').hide();
                    }
                    if (cancel) {
                        cancel();
                    }
                }
            };
            wx.onMenuShareTimeline(shareData);
        });
        wx.error(function (res) {
            //alert(res.errMsg);
        });
    },

    /*
     *微信分享（同时设置朋友和朋友圈）
    */
    wx_share: function (title, desc, link, imgUrl, callback, cancel) {
        var me = this;
        if (comm.isWeiXin()) {            
            me.wx_hideMenu();
            wx.ready(function () {
                me.wx_showMenu();
                var shareData = {
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: imgUrl,
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        if ($("#shareMask").length > 0) {
                            $('#shareMask').hide();
                        }
                    }
                };
                var shareData2 = {
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: imgUrl,
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        if ($("#shareMask").length > 0) {
                            $('#shareMask').hide();
                        }
                    }
                };
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareTimeline(shareData2);
            });
            wx.error(function (res) {
                //alert(res.errMsg);
            });
        }
    },

    /*
     *获取一个今天有效的缓存
    */
    getTodayCache: function (key) {
        var input = comm.getString(window.localStorage.getItem('set-xuefo-today-' + key));
        if (input == '')
            return '';
        else {
            var temp = input.toString();
            var arr = temp.split('|');
            if (arr[0] == this.todayStr(0)) {
                return arr[1];
            }
            else {
                return '';
            }
        }
    },

    /*
     *写入一个今天有效的缓存
    */
    recordTodayCache: function (key, value) {
        var today = this.todayStr(0);
        this.setLocalCache('set-xuefo-today-' + key, today + "|" + value);
    },

    /*
     *加载数据
    */
    load: function (url, success, fail) {
        var me = this;
        comm.loading();
        $.ajax({
            url: url,
            type: "post",
            dataType: 'json',
            cache: false,
            success: function (data) {
                comm.unLoading();
                if (success) {
                    success(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                comm.unLoading();
                if (fail) {
                    fail();
                }
            }
        });
    },

    /*
     *提交数据
    */
    post: function (url,data, success, fail) {
        var me = this;
        comm.loading();
        $.ajax({
            url: url,
            type: "post",
            data:data,
            dataType: 'json',
            cache: false,
            success: function (data) {
                comm.unLoading();
                if (success) {
                    success(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                comm.unLoading();
                if (fail) {
                    fail();
                }
            }
        });
    },

    loading: function () {
        if ($('#id-loading-mask')) {
            $('#id-loading-mask').remove();
        }
        $('body').append('<div id="id-loading-mask" class="layui-m-layer layui-m-layer2" index="0"><div class="layui-m-layershade"></div><div class="layui-m-layermain"><div class="mask-card"><span class="timer-loader"></span></div></div></div>');
    },

    unLoading: function () {
        if ($('#id-loading-mask')) {
            $('#id-loading-mask').remove();
        }
    },

    /*
     * 返回今天日期的字符串
    */
    todayStr: function (AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;//获取当前月份的日期 
        var d = dd.getDate();

        if (m.toString().length < 2) {
            m = "0" + m;
        }
        if (d.toString().length < 2) {
            d = "0" + d;
        }
        return y + "-" + m + "-" + d;
    },

    /*
     *设置缓存（永久）
    */
    setLocalCache: function (key, value) {
        if (value == null) {
            localStorage.removeItem(key);
        }
        else {
            localStorage.setItem(key, value);
        }
    },

    /*
     *获取缓存（永久）
    */
    getLocalCache: function (key) {
        return this.getString(localStorage.getItem(key));
    },

    /*
     *设置缓存（浏览器生命周期）
    */
    setCache: function (key, value) {
        if (value == null) {
            sessionStorage.removeItem(key);
        }
        else {
            sessionStorage.setItem(key, value);
        }
    },

    /*
     *获取缓存
    */
    getCache: function (key) {
        return this.getString(sessionStorage.getItem(key));
    },

    /*
     *设置cookie，有效期多少小时
    */
    setCookie: function (key, value, hour) {
        var exp = new Date();
        exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);
        document.cookie = key + "=" + value + ";expires=" + exp.toGMTString() + ";path=/";
    },

    /*
     *获取cookie
    */
    getCookie: function (key) {
        var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
        if (arr != null)
            return comm.getString(arr[2]);
        else {
            return '';
        }
    },

    /*
     *获取当前时间
    */
    getTime: function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    },

    /*
     *判断是否微信浏览器
    */
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },

    /*
     *查看图集
    */
    viewImages: function (urls, position) {
        if (urls.indexOf('|') == -1 && urls.indexOf(',') > 0) {
            urls = comm.replaceAll(urls, ',', '|');
        }
        var arr = urls.split('|');
        if (comm.isWeiXin() == true) {
            if (position == null || position == '' || position > arr.length - 1) {
                position = 0;
            }
            wx.previewImage({
                current: arr[position],
                urls: arr // 需要预览的图片http链接列表
            });
        }
        else {
            if (arr.length == 1) {
                window.location.href = urls;
            }
            else {
                comm.toast('请用微信打开');
            }            
        }
    },

    /*
     *判断是否在某一天之前
    */
    beforeDate: function (DateTwo) {
        var d = new Date();
        var DateOne = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
        var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
        var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

        var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
        var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
        var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));

        return ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) /
        86400000) < 0;
    },

    /*
     *创建一个唯一的UUID
    */
    createUUID: function () {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    },

    /*
     *获取字符串，失败返回空
    */
    getString: function (input) {
        if (input == undefined || input == null || input == "" || input == "null" || input == ' ' || input == 'undefined')
            return "";
        else
            return input.toString().trim();
    },

    /*
     *获取整数，失败返回-1
    */
    getInt: function (input) {
        if (input == undefined || input == null || input == "" || input == "null" || input == ' ' || input == 'undefined')
            return "-1";
        else {
            try {
                return parseInt(input);
            }
            catch (err) {
                return -1;
            }
        }
    },

    /*
     *获取小数，默认保留2位小数
    */
    getFloat: function (input, num) {
        if (input == undefined || input == null || input == "" || input == "null" || input == ' ' || input == 'undefined') {
            return parseFloat(input).toFixed(2);
        } else {
            return parseFloat(input).toFixed(parseInt(num));
        }
    },

    /*
     *获取url参数的值
    */
    request: function (name, defaultValue) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null)
            return this.getString((r[2]));
        else {
            return defaultValue;
        }
    },

    /*
     *是否包含
    */
    contains: function (arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }
}