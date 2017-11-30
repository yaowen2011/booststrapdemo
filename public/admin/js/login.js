$(function() {
    var $form = $('form');

    $form.bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3.指定校验字段a
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 12,
                        message: '用户名长度2-12'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线组成'
                    },
                    callback: {
                        message: '用户名不存在'
                    }

                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 12,
                        message: '密码长度2-12位'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    });


    //提交功能
    $form.on('success.form.bv', function (e) {
        var validator = $form.data('bootstrapValidator');//获取表单校验实例
        //阻止浏览器默认行为
        e.preventDefault();
        console.log(123);
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            dataType: 'json',
            data: $form.serialize(),
            success: function (data) {
                console.log(data);
                //{error: 1000, message: '用户或密码错误'}
                if (data.success) {
                    //
                    location.href = "index.html";
                } else {
                    //todo
                    //alert(data.message);
                    //借用插件的提示
                    //第三个参数 也要 配置
                    //第三个参数是个缺陷
                    validator.updateStatus('username', 'INVALID', 'callback')

                }
            }
        });
    })

    //reset功能
    //使用插件的重置功能
    //validator.resetForm();
    //这里validator 是 插件的实例
    //var validator = $form.data('bootstrapValidate') 获取

    $('[type="reset"]').on('click', function () {
        $form.data('bootstrapValidator').resetForm();
    })
});