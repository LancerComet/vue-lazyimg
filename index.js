/*
 *  LazyImg for lazying loading images by using Vue.
 *  By LancerComet at 22:07, 2016.08.18.
 *  # Carry Your World #
 *  ---
 *  MIT License.
 */

// Module Configuration.
const directives = ['v-lazy-bg', 'v-lazy']

export default {
  install (Vue, options) {
    document.readyState === 'complete' ? init() : document.addEventListener('DOMContentLoaded', init)
  }
}

// Initilization.
function init () {
   // Start lazyInit for once.
   lazyImg()

   // Execute when scrolling.
   const events = ['resize', 'scroll']
   events.forEach(event => window.addEventListener(event, throttle(lazyImg, 200)))
}

// Main function of LazyImg.
function lazyImg () {
  // Get all nodes that are needed to be lazyed.
  directives.forEach(directive => {
    const nodes = getDoms(document.querySelectorAll('[' + directive + ']'))
    nodes.forEach(node => lazyExec(node, directive))
  })

}

// LazyImg dom controller.
function lazyExec (node, directive) {
  // @ node: HTML Element Object.
  // @ directive: directives.bg or directives.src.

  // Size.
  const viewportHeight = window.innerHeight
  const scrollTop = document.body.scrollTop

  // Check and see the position of this node.
  // Attach image link or not.
  if (scrollTop + viewportHeight - node.offsetTop > 0 && node.hasAttribute(directive)) {
    const imgLink = node.attributes[directive].value
    switch (directive) {
      case directives[0]:
        node.style.backgroundImage = 'url(' + imgLink + ')'
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

// Throttle function.
// Underscore (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors.
// Underscore may be freely distributed under the MIT license.
function throttle (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
