<template>
  <div class="prompt-item" @click="open">{{content}}</div>
</template>
<script>
export default {
  props: ['content'],
  methods:{
    open() {
      SearchTools.toSearch(this.content);
    }
  }
}
</script>
<style scoped lang="stylus">
activeColor = #7A8A97
.prompt-item
  text-align center
  padding 15px 0
  border-bottom 1px solid rgba(123, 142, 156, 0.3)
  cursor pointer
  transition all .3s;
  &:hover
    color activeColor
  &:last-child
    border none
</style>