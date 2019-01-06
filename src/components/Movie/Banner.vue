<template>
  <div>
    <swipe class="my-swipe">
      <swipe-item
        class="swipe-item"
        v-for="(items,index) in bannerImgs"
        :key="index"
        :style="{backgroundImage:'url(' + items.url + ')'}"
      >
        <a :href="items.link"></a>
      </swipe-item>
    </swipe>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "vue-swipe";

export default {
  data() {
    return {
      bannerImgs: [
        {
          link: "#",
          url:
            "//gw.alicdn.com/tfs/TB164H9wwHqK1RjSZFkXXX.WFXa-1280-520.jpg_720x720Q30s100.jpg"
        },
        {
          link: "#",
          url:
            "//gw.alicdn.com/tfs/TB1dvw.wa6qK1RjSZFmXXX0PFXa-1280-520.jpg_720x720Q30s100.jpg"
        },
        {
          link: "#",
          url:
            "//gw.alicdn.com/tfs/TB1S8CLv4TpK1RjSZFGXXcHqFXa-1280-520.jpg_720x720Q30s100.jpg"
        },
        {
          link: "#",
          url:
            "//gw.alicdn.com/tfs/TB1AwkhwxTpK1RjSZFGXXcHqFXa-1280-520.jpg_720x720Q30s100.jpg"
        },
        {
          link: "#",
          url:
            "//gw.alicdn.com/tfs/TB1kYcNq4YaK1RjSZFnXXa80pXa-1280-520.jpg_720x720Q30s100.jpg"
        }
      ]
    };
  },
  components: {
    Swipe,
    SwipeItem
  }
};
</script>
<style>
@import "vue-swipe/dist/vue-swipe.css";
.my-swipe {
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.swipe-item {
  -webkit-background-size: cover;
  background-size: cover;
}
.swipe-item a {
  display: block;
  width: 100%;
  height: 100%;
}
.mint-swipe-indicators {
  bottom: 0px;
}
.mint-swipe-indicator {
  opacity: 1;
  background: #ccc;
}
.mint-swipe-indicator.is-active {
  background: #fff;
}
</style>
