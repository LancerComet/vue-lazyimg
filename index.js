/*
 *  LazyImg for lazying loading images by using Vue.
 *  By LancerComet at 22:07, 2016.08.18.
 *  # Carry Your World #
 */

// Module Configuration.
var directives = ['lazy-bg', 'lazy']  // LazyImg Directives.
var inited = false  // Initialization Flag.
var unavailableSrc = ['false', 'undefined', 'null', '']  // Src values that unavailable.

module.exports = {
  install: function (Vue, options) {
    if (inited) return

    // Setup Directives.
    directives.forEach(function (directive) {
      Vue.directive(directive, {
        update: function (newVal) {
          var node = this.el
          node.setAttribute(directive, newVal)
          Vue.nextTick(function () { lazyExec(node, directive) })
        }
      })
    })

    // Setup scrolling events.
    setEvents()
    inited = true
  }
}

// Set scrolling events.
function setEvents () {
  // Execute when scrolling.
  var events = ['resize', 'scroll']
  events.forEach(function (event) {
    var timeout = null
    window.addEventListener(event, function () {
      clearTimeout(timeout)
      timeout = setTimeout(lazyImg, 250)
    })
  })
}

// Main function of LazyImg.
function lazyImg () {
  // Get all nodes that are needed to be lazyed.
  directives.forEach(function (directive) {
    var nodes = getDoms(document.querySelectorAll('[' + directive + ']'))
    nodes.forEach(function (node) { lazyExec(node, directive) })
  })

}

// LazyImg dom controller.
function lazyExec (node, directive) {
  // @ node: HTML Element Object.
  // @ directive: 'lazy' or 'lazy-bg'.

  // Size.
  var viewportHeight = window.innerHeight
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

  // Check and see the position of this node.
  // Attach image link or not.
  if (scrollTop + viewportHeight - getTop(node) > 0 && node.hasAttribute(directive)) {
    var imgLink = node.attributes[directive].value

    // If unavailable src was given, just go return.
    if (unavailableSrc.filter(function (value) { return imgLink === value }).length) { return }

    switch (directive) {
      case directives[0]:
        setTimeout(function() {
          node.style.backgroundImage = 'url(' + imgLink + ')'
        }, Math.floor(Math.random() * 100))
        break
      case directives[1]:
        node.src = imgLink
        break  
    }
    node.removeAttribute(directive)
  }
}

// Transform DOM Collection to Array.
function getDoms (doms) {
  return Array.prototype.slice.call(doms)
}

// Get an element's absolute offset top position.
function getTop (element) {
    var offset = element.offsetTop
    if (element.offsetParent !== null) offset += getTop(element.offsetParent)
    return offset
}
