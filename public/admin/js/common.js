//注册ajax调用时  进度条效果
//注册全局ajax 回调

NProgress.configure({ showSpinner: false });

//注册一个全局的ajaxStart事件，所有的ajax在开启的时候，会触发这个事件
$(document).ajaxStart(function () {
    //开启进度条
    NProgress.start();
});

$(document).ajaxStop(function () {
    //完成进度条
    setTimeout(function () {
        NProgress.done();
    }, 500);
});


//校验用户是否登录
// 连带效应 触发NProgress读条
if (location.href.indexOf('login.html') === -1) {
    $.ajax({
        url: '/employee/checkRootLogin',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                //留在本页面
            } else {
                location.href = '/login.html';
            }
        }
    })
}



//(只要是)二级菜单  显示|隐藏
$('.child').prev().on('click', function () {
    $(this).next().slideToggle();
});

//todo
//控制侧边栏 显示|隐藏
//注意这里对transition的使用
$('.icon_menu').on('click', function () {
    //console.log(123);
    $('.lt-aside').toggleClass('now');
    $('.lt-main').toggleClass('now');
});

//todo
//注意点： 在click里面注册事件，会进行多次注册,且不会覆盖
//也可以在click内注册，先解绑  $(".btn_logout").off().on('click', function() {
// })
//退出功能
$('.icon_logout').on('click', function () {
    //显示modal框
    $('.modal').modal('show');

    $('.btn_logout').off().on('click', function () {
        $.ajax({
            url: '/employee/employeeLogout',
            type: 'get',
            success: function (data) {
                if (data.success) {
                    location.href = "/admin/login.html";
                }
            }
        })
    });


});


//todo
//检测是否登录

