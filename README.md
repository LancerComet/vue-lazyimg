# Vue-LazyImg
A tiny and stable lazyload plugin for Vue.

## Introduction.
```html
<body>
  <!-- Load image and set to 'src'. -->
  <img v-lazy="link-to-my-awesome-background.jpg">

  <!-- Load image and set to 'background-image'. -->
  <div v-lazy-bg="link-to-my-awesome-background.jpg"></div>

  <!-- Using it just like props. -->
  <img :v-lazy="image1">
  <div :v-lazy-bg="image2"></div>
</body>
```

```javascript
import Vue from 'vue'
import LazyImg from 'vue-lazyimg'

Vue.use(LazyImg) 

const Root = new Vue({
  el: 'body',
  data: {
    image1: 'link-to-my-awesome-background-01.jpg',
    image2: 'link-to-my-awesome-background-02.jpg'
  }
})
```

## License.
© 2016 LancerComet. MIT License.