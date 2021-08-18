window.addEventListener('load', rwd)
window.addEventListener('resize', rwd)
window.addEventListener('load', outdent_li)
window.addEventListener('load', remove_empty_inner_li)

function rwd() {
    determine_toc()
}

function determine_toc() {
    if (window.innerWidth < 1100) {
        toc_top()
    } else {
        toc_aside()
        top_aside_height()
    }
}

function toc_top() {
    const top = document.querySelector('#toc-top')
    if (top.style.display !== 'none') return

    top.style.display = 'block'
    document.querySelector('#toc-aside').style.display = 'none'
}

function toc_aside() {
    const aside = document.querySelector('#toc-aside')
    if (aside.style.display !== 'none') return

    aside.style.display = 'block'
    document.querySelector('#toc-top').style.display = 'none'
}

function top_aside_height() {
    const aside = document.querySelector('#toc-aside')
    aside.style.height = `${window.innerHeight - aside.offsetTop}px`
}

function outdent_li() {
    Array.from(document.querySelectorAll("#TableOfContents")).forEach(
        (toc) => {
            const firstLi = toc.querySelector("ul > li")
            const cloneLi = firstLi.cloneNode(true)
            while (cloneLi.querySelector('ul')) { cloneLi.removeChild(cloneLi.querySelector('ul')) }
            if (!cloneLi.querySelector('a')) {
                Array.from(firstLi.querySelectorAll('ul')).forEach(
                    (innerUl) => {
                        while (innerUl.firstChild) {
                            let innerEl = innerUl.firstChild
                            firstLi.parentNode.insertBefore(innerEl, firstLi);
                        }
                    }
                )
                firstLi.parentNode.removeChild(firstLi)
            }
        }
    )
}

function remove_empty_inner_li() {
    // remove empty inner li
    Array.from(document.querySelectorAll("#TableOfContents ul li ul li")).forEach(
        function (el) {
            if (isBlank(el)) {
                removeSelf(el)
            }
        }
    )
    // remove empty inner ul
    Array.from(document.querySelectorAll("#TableOfContents ul li ul")).forEach(
        function (el) {
            if (isBlank(el)) {
                removeSelf(el)
            }
        }
    )
}

function isBlank(el) {
    const str = el.textContent
    return str.trim() === ''
}

function removeSelf(el) {
    el.parentNode.removeChild(el)
}
