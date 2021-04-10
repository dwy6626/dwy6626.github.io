$(window).resize(rwd)
$(window).on('load', rwd)
$(window).on('load', outdent_li)

function rwd() {
    determine_toc()
}

function determine_toc() {
    if ($(window).width() < 1100) {
        toc_top()
    } else {
        toc_aside()
        top_aside_height()
    }
}

function toc_top() {
    if ($("#toc-top").is(':visible')) return

    $("#toc-top").toggle(true)
    $("#toc-aside").toggle(false)
}

function toc_aside() {
    if ($("#toc-aside").is(':visible')) return

    $("#toc-top").toggle(false)
    $("#toc-aside").toggle(true)
}

function top_aside_height() {
    $("#toc-aside").height($(window).height() - $("#toc-aside").position().top)
}

function outdent_li() {
    var arr = $("#TableOfContents ul li ul li").parent().parent()
    arr.each(
        function (index, el) {
            if ($(el).ignore("ul").blank()) {
                arr.eq(index).find("ul li").unwrap().unwrap()
            }
        }
    )
}

$.fn.ignore = function (sel) {
    // https://stackoverflow.com/questions/11347779
    return this.clone().find(sel || ">*").remove().end()
}

$.fn.blank = function () {
    // https://stackoverflow.com/questions/154059/
    var str = this.text()
    return (!str || /^\s*$/.test(str))
}
