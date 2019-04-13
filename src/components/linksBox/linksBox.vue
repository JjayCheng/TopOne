<template>
  <div class="links-box">
    <div class="add-link-wrapper">
      <link-item isAddItem="true" :click="add"/>
    </div>
    <link-list
      :links="links"
      @remove="remove"
    />
  </div>
</template>
<script>
import linkList from './components/linkList.vue'
import linkItem from './components/linkItem.vue'
export default {
  components:{
    linkList,
    linkItem
  },
  data() {
    return {
      links: null,
    }
  },
  created() {
    this.links = LinkTools.getLinks();
  },
  methods: {
    add() {
      this.$inputLayer({
        title: '添加链接',
        inputs: {
          url: {
            infor: 'URL:',
            inputVal: '',
            placeholder: 'http://'
          },
          title: {
            infor: 'Title:',
            inputVal: '',
            placeholder: '写个标题吧'
          }
        },
        confirm: (data, close) => {
          if( 
            this.links.find((link)=>{
              return data.title.inputVal === link.title
            }) 
          ) {
            this.$notify({
              title: '换个标题, 已有该标题的链接'
            });
            return ;
          }
          this.links.push(LinkTools.createLink(data.title.inputVal, data.url.inputVal));
          close();
        }
      })
    },
    remove(linkItem) {
      this.links.splice(this.links.indexOf(linkItem), 1);
    }
  },
  watch: {
    links: {
      handler() {
        LinkTools.setLinks(this.links)
      },
      deep: true
    }
  }
}
</script>
<style scoped lang="stylus">
.links-box
  position absolute
  display flex
  width 96%
  height 80px
  bottom 0
  left 2%
  background rgba(255, 255, 255, 0.6)
  border-radius 10px 10px 0 0
  padding 5px 0
  .add-link-wrapper
    position relative
    min-width 80px
    padding 0 10px
    &::before
      content ''
      position absolute
      height 70%
      top 15%
      right 0
      border-right 2px solid rgba(82, 99, 109, 0.3)
  .link-list
    flex 1
</style>