<template>
  <div class="card-view">
    <div class="title">{{title}}</div>
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props:['title']
}
</script>
<style scoped lang="stylus">
.card-view
  width 90%
  margin 10px auto
  background rgba(255, 255, 255, 0.8)
  text-align center
  color rgb(35, 40, 44)
  border-radius 10px
  .title
    font-size 17px
    padding 10px
</style>