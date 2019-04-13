<template>
  <transition name="layer-side-down" v-on:after-leave="afterLeave">
    <span
      class="notifiction"
      v-show="show"
      @mouseenter="clearTimer"
      @mouseleave="setTimer"
    >{{title}}</span>
  </transition>
</template>
<script>
export default {
  props: ['title'],
  data(){
    return {
      show: false,
      timer: null,
      time: 3000
    }
  },
  mounted() {
    this.show = true;
    this.setTimer()
  },
  methods: {
    afterLeave() {
      this.$destroy();
      this.$el.remove();
    },
    clearTimer() {
      clearTimeout(this.timer)
      this.time = 500;
    },
    setTimer() {
      this.timer = setTimeout(() => {
        this.show = false;
      }, this.time);
    }
  }
  
}
</script>
<style scoped lang="stylus">
.layer-side-down-enter-active, .layer-side-down-leave-active 
  transition all 1s
.layer-side-down-enter, .layer-side-down-leave-to /* .fade-side-on-leave-active below version 2.1.8 */ 
  opacity 0
  transform translateY(-100px)
.notifiction
  position fixed
  width 30%
  left 35%
  top 0px
  padding 12px 0
  background rgba(255, 255, 255, 0.8)
  font-size 15px
  text-align center
  color #555
  border-radius 0  0 10px 10px
  word-wrap nowrap
  overflow hidden
</style>