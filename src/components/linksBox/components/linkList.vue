<template>
  <div class="link-list">
    <div class="list-scroll" ref="link-list" @mousewheel="scroll">
      <transition-group name="scale-list" tag="div" class="list-wrapper" :style="{'width': wrapperWidth}">
        <link-item
          v-for="(linkItem) in links" :key="linkItem.title"
          :linkItem="linkItem"
          @onmenu="showMenu"
        />
      </transition-group>
    </div>
    <transition name="scale">
      <v-menu
        v-if="menuNeedShow"
        :linkItem="hasShowMenu"
        :x="menuX"
        @remove="removeClick"
      />
    </transition>
  </div>
</template>
<script>
import linkItem from './linkItem.vue'
import vMenu from './menu.vue'
export default {
  props: ['links'],
  components:{
    linkItem,
    vMenu
  },
  data(){
    return {
      hasShowMenu: null,
      menuX: 0,
      menuNeedShow: false,
    }
  },
  computed: {
    wrapperWidth() {
      return this.links.length * 100 + 'px';
    }
  },
  methods: {
    showMenu(e, linkItem) {
      this.menuX = e.clientX;
      if(this.menuNeedShow && this.hasShowMenu != linkItem) {
        this.hasShowMenu = linkItem;
        return;
      }
      this.hasShowMenu = linkItem;
      this.menuNeedShow = !this.menuNeedShow;
    },
    removeClick(linkItem) {
      this.hasShowMenu = null;
      this.menuX = 0;
      this.menuNeedShow = false;
      this.$emit('remove', linkItem)
    },
    scroll(e) {
      this.$refs['link-list'].scrollLeft += e.deltaY < 0 ? -30 : 30
    }
  }
}
</script>
<style scoped lang="stylus">
mainColor = #37464B
.link-list
  width 100%
  position relative
  .list-scroll
    font-size 0px
    padding-left 10px
    height 100%
    background none
    overflow scroll
    position relative
    &::-webkit-scrollbar
      display none
</style>