$(window).resize(rwd)
$(window).on('load', rwd)
$(window).on('load', outdent_li)
$(window).on('load', remove_empty_inner_li)

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
    $("#TableOfContents ul li ul li").parent().parent().each(
        function (_, el) {
            if ($(el).ignore("ul").blank()) {
                $(el).find("ul li").unwrap().unwrap()
            }
        }
    )
}

function remove_empty_inner_li() {
    // remove empty inner li
    $("#TableOfContents ul li ul li").each(
        function (_, el) {
            if ($(el).blank()) {
                $(el).remove()
            }
        }
    )
    // remove empty inner ul
    $("#TableOfContents ul li ul").each(
        function (_, el) {
            if ($(el).blank()) {
                $(el).remove()
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
