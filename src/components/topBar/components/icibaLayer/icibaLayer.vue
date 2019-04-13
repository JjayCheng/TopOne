<template>
  <div class="iciba-layer" ref="iciba-layer">
    <div class="input-wrapper">
      <input
        type="text"
        placeholder="填入需要翻译的词."
        @keydown.enter="getData"
        v-model="words"
        ref="input"
      />
    </div>
    <transition name="scale">
      <!-- 正常翻译 -->
      <div class="translate-wrapper" v-if="baseInfor && baseInfor.translate_type === 1">
        <div class="title">
          <span class="name">{{baseInfor.word_name}}</span>
          <span class="symbol"
            v-if="baseInfor.symbols[0].ph_en"
            @click="playAudio(baseInfor.symbols[0].ph_en_mp3)"
          >
            英[{{baseInfor.symbols[0].ph_en}}]
          </span>
          <span class="symbol"
            v-if="baseInfor.symbols[0].ph_am"
            @click="playAudio(baseInfor.symbols[0].ph_am_mp3)">
            美[{{baseInfor.symbols[0].ph_am}}]
          </span>
        </div>
        
        <div class="parts-list">
          <div class="parts-item" v-for="(part, index) in baseInfor.symbols[0].parts" :key="index">
            <span class="part">{{part.part}}</span>
            <span class="means">{{part.means.join('，')}}</span>
          </div>
        </div>
        
        <div class="exchange-list">
          <span
            class="exchange-item"
            v-for="(exchange, key) in baseInfor.exchange" :key="key"
            v-show="exchange.length"
          >
            <span class="key">{{key.replace('word_', '')}}:</span>
            <span class="word">{{exchange.join(' ')}}</span>
          </span>
        </div>

        <div class="other">
          <a class="link" target="view_window" :href="'http://www.iciba.com/' + baseInfor.word_name">
           金山词霸
          </a>
          <a class="link" target="view_window"
          :href="'https://translate.google.cn/#view=home&op=translate&sl=auto&tl=en&text=' + baseInfor.word_name">
           Google翻译
          </a>
        </div>

      </div>
      <!-- 机器翻译 -->
      <div class="translate-wrapper" v-if="baseInfor && baseInfor.translate_type === 2">
        <div class="title">
          <span class="name">{{baseInfor.word_name}}</span>
        </div>
        <div class="translate_result">{{baseInfor.translate_result}}</div>
        <div class="translate_msg">{{baseInfor.ciba_translate_msg}}</div>
        <div class="other">
          <a class="link" target="view_window" :href="'http://www.iciba.com/' + baseInfor.word_name">
           金山词霸
          </a>
          <a class="link" target="view_window"
          :href="'https://translate.google.cn/#view=home&op=translate&sl=auto&tl=en&text=' + baseInfor.word_name">
           Google翻译
          </a>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>
import Iciba from './Iciba'
export default {
  props: ['right'],
  data(){
    return {
      words: '',
      baseInfor: null
    }
  },
  methods:{
    getData() {
      this.words && Iciba.getBaseInfor(this.words, (res) => {
        if(res.err) {
          this.$notify({
            title: '调用翻译接口失败'
          });
          return ;
        }
        this.baseInfor = res;
      });
    },
    playAudio(src) {
      const audio = document.createElement('audio');
      audio.autoplay = 'autoplay';
      audio.src = src;
      audio.addEventListener('ended', () => {  
        audio.remove();
      }, false);
    }
  },
  mounted(){
    this.$refs.input.focus();
    this.$refs['iciba-layer'].style.right = this.right
  },
  watch: {
    right() {
      this.$refs['iciba-layer'].style.right = this.right
    }
  }
}
</script>
<style scoped lang="stylus">
.iciba-layer
  position absolute
  top 50px
  width 300px
  background rgba(255, 255, 255, .7)
  border-radius 5px
  padding 10px
  font-size 0px
  transition all .5s
  &::before
    content ''
    width 0;
    height 0;
    border-left 6px solid transparent
    border-right 6px solid transparent
    border-bottom 8px solid rgba(255, 255, 255, .7)
    position absolute
    top -8px
    right 148px
  .input-wrapper
    padding-right 10px
    input
      display block
      width 100%
      height 23px
      padding-left 10px
      font-size 12px
      text-align center
  .translate-wrapper
    background rgba(255, 255, 255, 0.8)
    color #444
    border-radius 5px
    margin-top 10px
    .title
      padding 10px 0
      .name
        font-weight 700
        font-size 18px
        margin-left 5px
      .symbol
        margin-left 10px
        font-size 10px
        cursor pointer
        &:hover
          font-weight 600
    .parts-list
      padding-left 10px
      .parts-item
        margin-bottom 7px
        .part
          font-size 16px
        .means
          margin-left 5px
          font-size 12px
          line-height 16px
    .exchange-list
      padding 5px
      font-size 15px
      .exchange-item
        margin-right 7px
        .key
          font-size 16px
        .word
          font-size 12px
    .translate_result
      font-size 14px
      padding 10px 20px 10px 20px
    .translate_msg
      padding 5px 10px
      font-size 12px
      text-align right
    .other
      text-align center
      padding 8px 0
      .link
        font-size 10px
        color #999
        text-decoration none
        margin 0 5px
        &:hover
          text-decoration underline
          color #444
</style>