<template>
  <div class="link-item" @mousedown="open($event)" oncontextmenu="return false">
    <div class="avatar" :style="{'background': linkItem? linkItem.color : '#62748C'}">
      <span v-if="isAddItem" class="iconfont icon-tianjia"></span>
      <span v-else>{{linkItem.title[0]}}</span>
    </div>
    <div class="title">
      <span v-if="isAddItem">添加</span>
      <span v-else>{{linkItem.title}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['linkItem', 'isAddItem', 'click'],
  methods: {
    open(e) {
      if(this.isAddItem) {
        if(e.buttons === 1)　{　// 点击左键
          this.click && this.click();
        }
      } else {
        if(e.buttons === 2) { //点击右键
          this.$emit('onmenu', e, this.linkItem);
        } else if(e.buttons === 1)　{　// 点击左键
          window.open(this.linkItem.url);
        }
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.link-item
  display inline-block
  padding-top 5px
  width 80px
  height 75px
  cursor pointer
  background rgba(138, 155, 166, 0)
  border-radius 5px
  transition all .5s
  overflow hidden
  &:hover
    background rgba(138, 155, 166, .6)
  .avatar
    width 40px
    height 40px
    background #7A8A97
    margin 0 auto
    border-radius 100%
    text-align center
    line-height 40px
    font-size 18px
    color #fff
    .iconfont
      font-size 18px
  .title
    display flex
    flex-direction column
    justify-content center
    text-align center
    height 35px
    font-size 13px
    overflow hidden
    color #444
    padding 0 5px
</style>