//直接扩展jQuery上的方法，也就是直接在jQuery($)上添加静态方法
$.extend({
    myFun: function () {
        alert("MyFun");
    }
});

//扩展myPagelist插件
; (function ($, window, undefined) {
    var MyPageList = function (ele, opts) {
        var defaultOpts = {
            page: 1,//当前页数
            totalPages: 100,//总页数
            url: "javascript:;",
            pageNum: 10,//显示多少个页码
            pageSize: 10,//显示多少条数据
            showCPS: false,//显示每页多少条
            showGP: false//显示跳转页数
        };
        opts.ele = ele;
        this.opts = $.extend({}, defaultOpts, opts);
        this.init();
        this.eventInit();
    };

    MyPageList.prototype = {
        init: function () {
            var opts=this.opts;
            var str = '', startPage = opts.page, endPage = opts.page, s1 = false, s2 = false;
            if (opts.showCPS) {
                str += '<div class="selectPageSize"><select id="currentPageSize">'
                for (var i = 1; i <= 5; i++) {
                    str += "<option value='" + i * 1 + "' " + (opts.pageSize == (i * 1) ? "selected" : "") + ">" + i * 1 + "</option>"
                }
                str += "</select> 条</div>";
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
                if (startPage > 1) {
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
                str += '<li><a href="' + opts.url + '?page=1&pageSize=' + opts.pageSize + '">首页</a></li><li><a href="' + opts.url + '?page=' + (opts.page - 1) + '&pageSize=' + opts.pageSize + '">上一页</a></li>';
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
                str += '<li><a href="' + opts.url + '?page=' + (opts.page + 1) + '&pageSize=' + opts.pageSize + '">下一页</a></li><li><a href="' + opts.url + '?page=' + opts.totalPages + '&pageSize=' + opts.pageSize + '">尾页</a></li>';
            }
            str += "</ul>"
            if (opts.showGP) {
                str += '<div class="changePageNum"><input id="gotoPage" type="number" min="1" max="' + opts.totalPages + '" step="1"/> <a class="btn btn-default btn-sm" href="javascript:;" id="changePage">  跳转</a></div>';
            }
            opts.ele.html(str);
        },
        eventInit: function () {
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
                window.location.href = opts.url + "?page=" + page + "&pageSize=" + $("#currentPageSize").val();
            });
        }
    };

    $.fn.myPageList = function (opts) {
        var obj = new MyPageList(this, opts);
        return this;
    }

})(jQuery, window, undefined);







//扩展jQuery对象上的插件
; (function ($, window, undefined) {
    var PageList = function (ele, opts) {
        this.$ele = ele;
        var defaultOpts = {
            page: 1,//当前页数
            totalPages: 100,//总页数
            url: "javascript:;",
            pageNum: 10,//显示多少页
            pageSize: 10,//显示多少条数据
            showCPS: false,
            showGP: false
        };
        this.opts = $.extend({}, defaultOpts, opts);
        this.initElement(this.opts);
        this.bindEvent(this.opts);
    };

    PageList.prototype = {
        initElement: function (opts) {
            var str = '', startPage = 0, endPage = 0, s1 = false, s2 = false;
            if (opts.showCPS) {
                str += '<div class="selectPageSize"><select id="currentPageSize">'
                for (var i = 1; i <= 5; i++) {
                    str += "<option value='" + i * 1 + "' " + (opts.pageSize == (i * 1) ? "selected" : "") + ">" + i * 1 + "</option>"
                }
                str += "</select> 条</div>";
            }
            str += '<ul class="pagination">';
            //总页数是否大于显示页数
            if (opts.totalPages > opts.pageNum) {
                if (opts.page >= opts.pageNum) {
                    //显示开始的省略号
                    s1 = true;
                    //首页=当前页数-显示页数+2
                    startPage = opts.page - opts.pageNum + 2;
                } else {
                    startPage = 1;
                }

                //尾页=首页+显示页数-2
                endPage = startPage + opts.pageNum - 1;
                if (endPage >= opts.totalPages) {
                    endPage = opts.totalPages;
                }
                if (opts.totalPages - opts.page > 1) {
                    //显示尾部的省略号
                    s2 = true;
                }

            } else {
                startPage = 1;
                endPage = opts.totalPages;
            }

            if (opts.page > 1) {
                str += '<li><a href="' + opts.url + '?page=1&pageSize=' + opts.pageSize + '">首页</a></li><li><a href="' + opts.url + '?page=' + (opts.page - 1) + '&pageSize=' + opts.pageSize + '">上一页</a></li>';
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
                str += '<li><a href="' + opts.url + '?page=' + (opts.page + 1) + '&pageSize=' + opts.pageSize + '">下一页</a></li><li><a href="' + opts.url + '?page=' + opts.totalPages + '&pageSize=' + opts.pageSize + '">尾页</a></li>';
            }
            str += "</ul>"
            if (opts.showGP) {
                str += '<div class="changePageNum"><input id="gotoPage" type="number" min="1" max="' + opts.totalPages + '" step="1"/> <a class="btn btn-default btn-sm" href="javascript:;" id="changePage">  跳转</a></div>';
            }
            this.$ele.html(str);
        },
        bindEvent: function (opts) {
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
                window.location.href = opts.url + "?page=" + page + "&pageSize=" + $("#currentPageSize").val();
            });
        }
    };

    $.fn.pageList = function (opts) {
        var pl = new PageList(this, opts);
        return this;

    }
})(jQuery,window,undefined);
