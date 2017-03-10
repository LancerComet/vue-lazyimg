/*
 *  LazyImg for lazying loading images by using Vue.
 *  By LancerComet at 22:07, 2016.08.18.
 *  # Carry Your World #
 */

// Module Configuration.
var directives = ['lazy-bg', 'lazy']  // LazyImg Directives.
var inited = false  // Initialization Flag.
var unavailableSrc = ['false', 'undefined', 'null', '']  // Src values that unavailable.

// Nodes collection with cache.
var nodesCache = {
  lazy: [],
  'lazy-bg': []
}

module.exports = {
  install: function (Vue, options) {
    if (inited) return

    // Setup Directives.
    directives.forEach(function (directive) {
      Vue.directive(directive, {
        bind: exec,
        componentUpdated: exec
      })

      // Hook to bind and componentUpdated.
      function exec (el, binding) {
        var value = binding.value
        el.setAttribute(directive, value)
        Vue.nextTick(function () { lazyExec(el, directive) })
        nodesCache[directive].push(el)
      }
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
    window.addEventListener(event, lazyImg)
  })
}

// Main function of LazyImg.
function lazyImg () {
  // Get all nodes that are needed to be lazyed.
  directives.forEach(function (directive) {
    nodesCache[directive].forEach(function (node) { lazyExec(node, directive) })
  })
}

// LazyImg dom controller.
function lazyExec (node, directive) {
  // node: HTML Element Object.
  // directive: 'lazy' or 'lazy-bg'.
  if (!node.hasAttribute(directive)) { return }

  // Size.
  var viewportHeight = window.innerHeight
  var top = node.getBoundingClientRect().top

  // Check and see the position of this node.
  // Attach image link or not.
  if (Math.abs(top) < viewportHeight * 0.95) {
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
