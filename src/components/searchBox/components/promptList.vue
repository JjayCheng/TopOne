<template>
  <div class="prompt-list">
    <prompt-item v-for="item in promptList" :key="item"
    :content="item"/>
  </div>
</template>
<script>
import promptItem from './promptItem.vue'
export default {
  props:['promptList'],
  components:{
    promptItem
  }
}
</script>
<style scoped lang="stylus">
mainColor = #37464B
.prompt-list
  width 50%
  background rgba(255,255,255, 0.7)
  margin 2px auto
  border-radius 10px
  padding 0 10px
  color mainColor
</style>