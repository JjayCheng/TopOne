<template>
  <div class="top-bar">
    <div class="btn-wrapper">
      <div class="btn iconfont icon-fanyi"
        :class="{'active': icibaLayerShow}"
        @click="icibaLayerShow = !icibaLayerShow"
      ></div>
      <div class="btn iconfont icon-icon--"
        :class="{'active': isLinksBoxShow}"
        @click="showLinksBox"
      ></div>
      <div class="btn iconfont icon-shezhi"
        :class="{'active': isSettingsBoxShow}"
        @click="showSettingsBox"
      ></div>
    </div>
    <div class="layer-wrapper">
      <transition name="scale">
        <iciba-layer v-if="icibaLayerShow" :right="icibaLayerRight"/>
      </transition>
    </div>
  </div>
</template>
<script>
import icibaLayer from './components/icibaLayer/icibaLayer.vue'
export default {
  props: ['isLinksBoxShow', 'isSettingsBoxShow'],
  data() {
    return {
      icibaLayerShow: false,
      icibaLayerRight: '5px'
    }
  },
  methods:{
    showLinksBox() {
      this.$emit('showLinksBox');
    },
    showSettingsBox() {
      this.$emit('showSettingsBox');
      if(!this.isSettingsBoxShow) {
        this.icibaLayerRight = '305px'
      } else {
        this.icibaLayerRight = '5px'
      }
    }
  },
  components: {
    icibaLayer
  }
}
</script>
<style scoped lang="stylus">
.top-bar
  .btn-wrapper
    display flex
    justify-content flex-end
    height 50px
    line-height 50px
    .btn
      color #fff
      font-size 28px
      margin-right 30px
      cursor pointer
      transition all .5s
    .icon-fanyi
      font-size 25px
    .btn:hover
      color rgba(255,255,255, 0.4)
    .icon-shezhi.active
      transform rotate(810deg)
      margin-right 330px
    .icon-icon--.active
      transform rotate(180deg)
    .icon-fanyi.active
      transform scale(1.2)
      color rgb(176, 188, 203)
</style>