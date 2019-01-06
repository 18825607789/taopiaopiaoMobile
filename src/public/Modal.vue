<template>
  <div
    class="alertBox"
    v-show='isShowModal'
    :class="{alertModel:(opts.title || btnLen())}"
  >
    <div
      class="alert-container"
      :style='[{width:(opts.width ? opts.width : "auto")},{height:(opts.height ? opts.height : "auto")}]'
      :class='{notTitle:!opts.title && !btnLen()}'
    >
      <p
        class="alert-title"
        v-if='opts.title'
      >{{opts.title}}</p>
      <p class="alert-content">{{opts.content}}</p>
      <p
        class="alert-btn"
        v-if='btnLen()'
      >
        <button
          @click='key'
          :style='{width:(100 / btnLen()) + "%"}'
          v-for='(key,val) in opts.buttons'
          :key="val"
        >{{val}}</button>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  data() {
    return {
      isShowModal: false,
      opts: {
        // title: "",
        // content: "",
        // width: "",
        // height: "",
        // buttons: {
        //   确定: function() {},
        //   取消: function() {}
        // },
        // time: ""
      }
    };
  },
  methods: {
    btnLen() {
      var len = 0;
      len++;
      return len;
    }
  },
  updated() {
    if (this.isShowModal && !this.btnLen()) {
      setTimeout(
        function() {
          this.isShowModal = false;
        },
        this.opts.time ? this.opts.time : 1800
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.alertBox {
  font-size: 18px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.alertModel {
  background-color: rgba(0, 0, 0, 0.65);
}
.alert-container {
  position: relative;
  z-index: 1000;
  background-color: #fff;
  border-radius: 6px;
  color: #333;
}
.notTitle {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
}
.alert-title {
  padding-top: 10px;
  text-align: center;
}
.alert-content {
  line-height: 24px;
  padding: 16px 20px;
  max-width: 100%;
}
.alert-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ddd;
  button {
    font-size: 18px;
    color: #333;
    border: 0;
    background-color: transparent;
    padding: 10px 0;
    outline: none;
    box-sizing: border-box;
  }
  button:nth-of-type(2) {
    border-left: 1px solid #ddd;
  }
}
</style>
