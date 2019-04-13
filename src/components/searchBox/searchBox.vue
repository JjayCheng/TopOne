<template>
  <div class="search-box">
    <div :class="['input-ct', {'focus': inputFocused}]">
      <input
        type="text"
        ref="input"
        v-model="keyWorld"
        @input="getPromptList"
        @keyup.enter="search"
        @blur="promptBoxShow = inputFocused = false"
        @focus="inputFocus"
      />
      <span class="search-button iconfont icon-chazhao" @click="search"></span>
    </div>
    <transition name="fade-side">
      <prompt-list v-if="promptList.length && promptBoxShow" :promptList="promptList"/>
    </transition>
  </div>
</template>
<script>
import promptList from './components/promptList.vue'
export default {
  components:{
    promptList
  },
  data(){
    return {
      keyWorld: '',
      promptList: [],
      promptBoxShow: false,
      historySearch: [],
      inputFocused: false
    }
  },
  methods:{
    getPromptList() {
      if(this.keyWorld) {
        SearchTools.getPromptList(this.keyWorld, (res) => this.promptList = res);
      } else{
        this.promptList = []
        this.showHistoryList();
      }
    },
    inputFocus() {
      this.inputFocused = true;
      this.showHistoryList();
    },
    showHistoryList() {
      this.promptBoxShow = true;
      this.historySearch = SearchTools.getHistorySearch();
      if(SettingTools.getSettings().enableHistory) {
        !this.keyWorld && (this.promptList = this.historySearch);
      }
    },
    search() {
      SearchTools.toSearch(this.keyWorld);
    }
  },
  mounted(){
    this.$refs.input.focus();
  }
}
</script>
<style scoped lang="stylus">
mainColor = #37464B
activeColor = #7A8A97
.search-box
  width 100%
  padding-top 100px
  .input-ct
    width 50%
    height 46px
    margin 0 auto
    font-size 0
    background rgba(255,255,255, 0.3)
    padding 0 10px
    border-radius 10px
    transition background .5s
    &.focus
      background rgba(255,255,255, 0.7)
    input
      display inline-block
      width calc(100% - 70px)
      height 100%
      border none
      outline none
      background none
      line-height 0
      vertical-align top
      margin 0
      padding 0 0 0 10px
      font-size 16px
      color mainColor
    .search-button
      display inline-block
      width 60px
      height 100%
      line-height 0
      vertical-align top
      text-align center
      line-height 46px
      font-size 22px
      cursor pointer
      color mainColor
      transition color .5s
      &:hover
        color activeColor
</style>