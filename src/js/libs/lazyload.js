define(function() {
    function Lazyload(ops) {
        this.el = Array.from(document.querySelectorAll(ops.el));
        this.ops = ops;
        this.load();
    };
    (function() {
        this.load = function() {
            //实现图片加载
            //图片距可视区域顶部的距离小于可视区域的高度
            var clientHeight = window.innerHeight;
            var that = this;
            this.el.forEach(function(el) {
                // getBoundingClientRect() 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
                var offset = el.getBoundingClientRect();
                if (offset.top < clientHeight) {
                    var src = el.getAttribute(that.ops.attr);
                    el.src = src;
                }
            })
        }
    }).call(Lazyload.prototype);
    return Lazyload;
});