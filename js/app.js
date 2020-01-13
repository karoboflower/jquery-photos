(function ($) {
    $.fn.extend({
            /**
         * 选择图片文件
         * @param option
         */
        selectImages: function (option) {
            var $this = this
                // 配置项
                , defaults = {
                    name: ''            // input name
                    , imagesList: '.uploader-list'    // 图片列表容器
                    , imageDelete: '.file-item-delete'   // 删除按钮元素
                    , multiple: false    // 是否多选
                    , done: null  // 选择完成后的回调函数
                }
                , options = $.extend({}, defaults, option);
            // 显示文件库 选择文件
            $this.fileLibrary({
                type: 'image'
                , done: function (data, $touch) {
                    var list = options.multiple ? data : [data[0]];
                    // 判断回调参数是否存在, 否则执行默认
                    if (typeof options.done === 'function') {
                        return options.done(data, $touch);
                    }
                    // 新增图片列表
                      // 新增图片列表
                      var html=[];
                      for(var j=0;j<list.length;j++){
                          html.push('<div class="file-item">'+
                          '<img src="'+list[j].file_url+'">'+
                          '<input type="hidden" code="'+list[j].file_id+'" name="'+list[j].file_name+'" value="'+list[j].file_id+'">'+
                          '<i class="iconfont icon-shanchu file-item-delete"></i></div>');
                      }
                    var $html = $(html.join(''))
                        , $imagesList = $this.next(options.imagesList);
                    
                    // 渲染html
                    options.multiple ? $imagesList.append($html) : $imagesList.html($html);
                }
            });
        }
    })

})(jQuery)
$(function () {
    // 删除图片
    $('body').on('click','.file-item-delete',function () {
        var _this = this;
        layer.confirm('您确定要删除该图片吗？', {
            title: '友情提示'
        }, function (index) {
            $(_this).parent().remove();
            layer.close(index);
        });
    });
});