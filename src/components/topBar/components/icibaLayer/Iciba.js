const cbName = 'aiciba_word_cb';
const getUrl = (words) => {
  return `http://www.iciba.com/index.php?callback=${cbName}&a=getWordMean&c=search&word=${words}`
}
export default {
  getBaseInfor(words, cb) {
    window[cbName] = function(res) {
      cb && cb(res.baesInfo || {err: true});
      script.remove();
    }
    const script = document.createElement('script');
    script.src = getUrl(words);
    document.body.appendChild(script);
  }
}