<template>
  <div class="v-menu" ref="menu" oncontextmenu="return false">
    <div class="menu-list">
      <div class="menu-item"
        v-for="subUrl in linkItem.subUrls" :key="subUrl.title"
        @mousedown="open($event, subUrl)"
      >
        {{subUrl.title}}
      </div>
    </div>

    <transition name="scale">
      <div
        class="sub-contrl iconfont icon-shanchu"
        :style="{'top': subContrlTop}"
        v-if="subContrlShow"
        @click="removeSelectedSub"
      ></div>
    </transition>
   
    <div class="contrl">
      <div class="btn remove-btn iconfont icon-shanchu" @click="$emit('remove',linkItem)"></div>
      <div class="btn add-btn iconfont icon-icon-test" @click="addSub"></div>
      <div class="btn change-btn iconfont icon-bianji" @click="change"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['linkItem', 'x'],
  data(){
    return {
      selectedSubUrl: null,
      subContrlTop: '',
      subContrlShow: false
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init() {
      this.$nextTick(()=>{
        const menu = this.$refs.menu;
        menu.style.top = -menu.offsetHeight - 12 + 'px';
        menu.style.left = this.x - menu.offsetWidth/2 - 100 + 'px';
      })
    },
    open(e, subUrl) {
      if(e.buttons === 2) { //点击右键
        this.subContrlTop = e.target.offsetTop + 'px';
        if(this.selectedSubUrl === subUrl) {
          this.subContrlShow = false;
          this.selectedSubUrl = null
        } else {
          this.subContrlShow = true;
          this.selectedSubUrl = subUrl;
        }
      } else if(e.buttons === 1)　{　// 点击左键
        window.open(subUrl.url);
      }
    },
    addSub() {
      this.$inputLayer({
        title: `添加子链接(${this.linkItem.title})`,
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
          const subUrls = this.linkItem.subUrls;
          if( 
            subUrls.find((subUrl)=>{
              return data.title.inputVal === subUrl.title
            })
          ) {
            this.$notify({
              title: '换个标题, 已有该标题的子链接'
            });
            return ;
          }
          subUrls.push({
            title: data.title.inputVal,
            url: data.url.inputVal,
          });
          close();
          this.init();
        }
      })
    },
    change() {
      const linkItem = this.linkItem;
      let backupUrl = linkItem.url,
       backupTitle = linkItem.title;;
      this.$inputLayer({
        title: `修改链接(${this.linkItem.title})`,
        inputs: {
          url: {
            infor: 'URL:',
            inputVal: backupUrl,
            placeholder: 'http://'
          },
          title: {
            infor: 'Title:',
            inputVal: backupTitle,
            placeholder: '写个标题吧'
          }
        },
        confirm: (data, close) => {
          console.log(data);
          linkItem.url = data.url.inputVal;
          linkItem.title = data.title.inputVal;
          close();
          this.init();
        }
      })
    },
    removeSelectedSub() {
      const subUrls = this.linkItem.subUrls;
      subUrls.splice(subUrls.indexOf(this.selectedSubUrl), 1);
      this.selectedSubUrl = null;
      this.subContrlShow = false;
      this.init()
    }
  },
  computed: {
  },
  watch: {
    linkItem() {
      this.init()
    }
  }
}
</script>
<style scoped lang="stylus">
.v-menu
  position absolute
  top 0px
  background rgba(255,255,255,0.6)
  border-radius 7px
  transition all .5s
  .contrl
    display flex
    justify-content center
    .btn
      padding 5px 10px
      cursor pointer
      &:first-child
        border-radius 0 0 0 7px
      &:last-child
        border-radius 0 0 7px 0
      &:hover
        background rgba(138, 155, 166, .6)
  .menu-list
    padding 6px 0px
    text-align center
    .menu-item
      padding 5px 0
      cursor pointer
      &:hover
        background rgba(138, 155, 166, .6)
  .sub-contrl
    position absolute
    right -30px
    font-size 14px
    background rgba(138, 155, 166, 0.7)
    color #fff
    padding 5px
    border-radius 10px
    cursor pointer
    transition all .3s
.menu-item, .btn
  transition background .5s

</style>