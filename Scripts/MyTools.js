/// <reference path="jquery-1.10.2.js" />

var MyTools = (function (mod, window, undefined) {
    mod.ajax = function (method, url, parmas, callback) {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        method = method || "get";
        url = url || "";
        xhr.open(method, url);
        if (parmas instanceof Function){
            xhr.send();
            callback = parmas;
        } else {
            parmas = parmas || {};
            xhr.send(parmas);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    callback(xhr.response);
                } else {
                    console.error("AJAX请求错误！");
                }
            } 
        }
    };
    mod.Cookie = {
        //获取对映的键的Cookie
        getCookie: function (name) {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookieArray = cookies[i].split("=");
                if (cookieArray[0] === name) {
                    return cookieArray[1];
                }
            }
            return "";
        },
        //name：cookie键
        //name：cookie值
        //et: cookie过期时间（单位：毫秒）
        setCookie: function (name,val,et) {
            var date = new Date(),
                ms = date.getTime(),
                time = new Date(ms + et);
            document.cookie = name+"="+val+";expires="+time.toUTCString()+";path=/";
        },
        //删除对映的键的Cookie
        deleteCookie: function (name) {
            this.setCookie(name,"",-1);
        }
    };

    mod.alertFrame = function (opts) {
        var defaultOpts = {
            type: "alert-info",//类型：success,danger,info
            icon: "glyphicon-info-sign",//图标
            text: "",//显示文字
            mills: 3000//显示时间
        };
        opts = $.extend({}, defaultOpts, opts);
        $("#alertFrame,#alertFrame i").removeAttr("class");
        $("#alertFrame").addClass("alert").addClass(opts.type);
        $("#alertFrame i").addClass("glyphicon").addClass(opts.icon);
        $("#alertFrame span").text(opts.text);
        $("#alertFrame").show();
        setTimeout(function () {
            $("#alertFrame").hide();
        }, opts.mills);
    };

    mod.modalFrame = function (opts, callback) {
        var defaultOpts = {
            title: "提示",//标题
            body: "",//内容
            confirmBtn: "确定",//确定按钮
            cancleBtn: "取消",//取消按钮
            handleState:true//执行完回调函数后是否关闭模太框
        };
        opts = $.extend({}, defaultOpts, opts);
        $("#modalTitle").text(opts.title);
        $("#modalBody").html(opts.body);
        $("#confirmBtn").text(opts.confirmBtn);
        $("#cacleBtn").text(opts.cancleBtn);
        $("#modalFrame").modal('show');
        $("#confirmBtn").off("click").on("click", function () {
            callback instanceof Function ? callback() : "";
            if (opts.handleState) {
                $("#modalFrame").modal('hide');
            }
        });

    };

    mod.pageList = function (opts) {
        var defaultOpts = {
            page: 1,//当前页数
            totalPages: 100,//总页数
            ele: null,//DOM元素
            url: "javascript:;",
            pageNum: 10,//显示多少个页码
            pageSize:10,//显示多少条数据
            showCPS: false,//显示每页多少条
            showGP:false//显示跳转页数
        };
        opts = $.extend({}, defaultOpts, opts);
        //console.log(opts);
        if (opts.ele) {
            var str = '', startPage = opts.page, endPage = opts.page, s1 = false, s2 = false;
            if(opts.showCPS){
                str+='<div class="selectPageSize"><select id="currentPageSize">'
                for (var i = 1; i <= 5; i++) {
                    str += "<option value='" + i * 1 + "' " + (opts.pageSize == (i * 1) ? "selected" : "") + ">" + i * 1 + "</option>"
                }
                str+="</select> 条</div>";
            } 
            str += '<ul class="pagination">';
            //总页数是否大于显示页数
            if (opts.totalPages > opts.pageNum) {
                opts.pageNum--;
                for (var i = 0; i < opts.pageNum; i++) {
                    if (i % 2 == 0) {
                        endPage++;
                        if (endPage > opts.totalPages) {
                            endPage = opts.totalPages;
                            startPage--;
                        }
                    } else {
                        startPage--;
                        if (startPage <= 0) {
                            startPage = 1;
                            endPage++;
                        }
                    }
                }
                if (startPage>1) {
                    //显示开始的省略号
                    s1 = true;
                } else {
                    startPage = 1;
                }

                if (endPage < opts.totalPages) {
                    //显示尾部的省略号
                    s2 = true;
                }

            } else {
                startPage = 1;
                endPage = opts.totalPages;
            }

            if (opts.page > 1) {
                str += '<li><a href="' + opts.url + '?page=1&pageSize=' + opts.pageSize + '">首页</a></li><li><a href="' + opts.url + '?page=' + (opts.page-1) + '&pageSize=' + opts.pageSize + '">上一页</a></li>';
            }
            if (s1) {
                str += '<li class="disabled"><a href="javascript:;">..</a></li>';
            }
            for (var i = startPage; i <= endPage; i++) {
                if (opts.page == i) {
                    str += '<li class="active"><a  href="' + opts.url + '?page=' + i + '&pageSize=' + opts.pageSize + '">' + i + '</a></li>';
                } else {
                    str += '<li><a href="' + opts.url + '?page=' + i + '&pageSize=' + opts.pageSize + '">' + i + '</a></li>';
                }
            }

            if (s2) {
                str += '<li class="disabled"><a href="javascript:;">..</a></li>';
            }

            if (opts.page < opts.totalPages) {
                str += '<li><a href="' + opts.url + '?page=' + (opts.page+1) + '&pageSize=' + opts.pageSize + '">下一页</a></li><li><a href="' + opts.url + '?page=' + opts.totalPages + '&pageSize=' + opts.pageSize + '">尾页</a></li>';
            }
            str+="</ul>"
            if(opts.showGP){
                str += '<div class="changePageNum"><input id="gotoPage" type="number" min="1" max="' + opts.totalPages + '" step="1"/> <a class="btn btn-default btn-sm" href="javascript:;" id="changePage">  跳转</a></div>';
            }
            opts.ele.html(str);

            //选择每页数量事件
            $(document).on("change", "#currentPageSize", function () {
                var page = parseInt(opts.page);
                window.location.href = opts.url + "?page=" + page + "&pageSize=" + $(this).val();
            });

            //页面跳转事件
            $(document).on("click", "#changePage", function () {
                var page = parseInt($("#gotoPage").val());
                if (page >= opts.totalPages) {
                    page = opts.totalPages;
                }
                if (page <= 0) {
                    page = 1;
                }
                window.location.href = opts.url+"?page="+page+"&pageSize="+$("#currentPageSize").val();
            });
        }

    }

    return mod;
})(MyTools || {},window,undefined);