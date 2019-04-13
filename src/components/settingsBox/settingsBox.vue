<template>
  <div class="settings-box">
    <h1 class="title">设置</h1>
    <card-view title="搜索引擎设置">
      <div
        :class="['set-item', {'active': index === settings.selectedSearchEngine}]"
        v-for="(api, index) in searchApiList" :key="api.name"
        @click="switchEngine(index, api.name)"
      >
        <span class="content">{{api.name}}</span>
        <span class="iconfont icon-gou"></span>
      </div>
    </card-view>
    <card-view title="链接框设置">
      <div
        :class="['set-item', {'active': settings.autoOpenLinksBox}]"
        @click="setAutoOpenLinksBox"
      >
        <span class="content">自动打开连接框</span>
        <span class="iconfont icon-gou"></span>
      </div>
    </card-view>
    <card-view title="搜索设置">
      <div
        :class="['set-item', {'active': settings.enableHistory}]"
        @click="setHistoryEnable"
      >
        <span class="content">开启历史记录</span>
        <span class="iconfont icon-gou"></span>
      </div>
    </card-view>
  </div>
</template>
<script>
import cardView from './components/cardView.vue'
export default {
  components:{
    cardView
  },
  data(){
    return {
      settings: null,
      searchApiList: null
    }
  },
  methods: {
    switchEngine(index, name) {
      this.settings.selectedSearchEngine = index;
      this.$notify({
        title: '搜索引擎已切换为: ' + name
      });
    },
    setAutoOpenLinksBox() {
      const key = this.settings.autoOpenLinksBox = !this.settings.autoOpenLinksBox;
      this.$notify({
        title: key ? '下次启动将自动打开链接框 !' : '下次启动将不自动打开链接框 !'
      });
    },
    setHistoryEnable() {
      const key = this.settings.enableHistory = !this.settings.enableHistory;
      this.$notify({
        title: key ? '已开启历史搜索记录框 !' : '已关闭历史搜索记录框 !'
      });
    }
  },
  watch: {
    settings: {
      handler() {
        SettingTools.setSettings(this.settings);
      },
      deep: true
    }
  },
  created(){
    this.settings = SettingTools.getSettings();
    this.searchApiList = SearchTools.searchApiList;
  }
}
</script>
<style scoped lang="stylus">
.settings-box
  position absolute
  right 0
  top 0
  width 300px
  height 100%
  background rgba(0,0,0,0.5)
  padding 20px 0
  .title
    color #fff
    text-align center
    font-size 20px
  .set-item
    position relative
    padding 10px 0
    cursor pointer
    font-size 16px
    .iconfont
      position absolute
      top 12px
      right 20px
      color rgba(124, 141, 166, 0)
    &.active
      color rgb(124, 141, 166)
      .iconfont
        color rgba(124, 141, 166, 1)
</style>