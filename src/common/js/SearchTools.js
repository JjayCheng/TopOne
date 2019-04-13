
const searchApiList = [
  {
    name: 'Google',
    getSearchUrl(keyWorld) {
      return　'https://b.glgoo.top/scholar?lr=lang_zh-CN|lang_zh-TW&hl=zh-CN&as_sdt=0,5&q='
        + keyWorld
    }
  },
  {
    name: 'Baidu',
    getSearchUrl(keyWorld) {
      return　'https://www.baidu.com/s?ie=UTF-8&wd='
        + keyWorld
    }
  },
  {
    name: 'Sogou',
    getSearchUrl(keyWorld) {
      return　'https://www.sogou.com/web?query='
        + keyWorld
    }
  }
];

const getPromptUrl = (keyWorld) => {
  return 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&p=3&sid=&req=2&csor=2&cb=stjk_cb&wd='
    + keyWorld
}

let historySearch = [];

export default {
  searchApiList,
  toSearch(keyWorld) {
    const openUrl = searchApiList[SettingTools.getSettings().selectedSearchEngine].getSearchUrl(keyWorld);
    window.open(openUrl);
    SettingTools.getSettings().enableHistory && this.addHistorySearch(keyWorld);
  },
  getPromptList(keyWorld, cb) {
    window.stjk_cb = function(res) {
      cb && cb(res.s.slice(0, 5));
      script.remove();
    }
    const script = document.createElement('script');
    script.src = getPromptUrl(keyWorld);
    document.body.appendChild(script);
  },
  getHistorySearch() {
    let localHistorySearch = localStorage.historySearch;
    if(localHistorySearch) {
      historySearch = JSON.parse(localHistorySearch);
    } else {
      localStorage.historySearch = '[]';
    }
    return historySearch;
  },
  addHistorySearch(keyWorld) {
    historySearch.indexOf(keyWorld) === -1 && historySearch.unshift(keyWorld);
    this.setHistorySearch();
  },
  setHistorySearch() {
    localStorage.historySearch = JSON.stringify(historySearch.slice(0, 5));
  }
}