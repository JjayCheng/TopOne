const init = () => {
  const initialSettings = {
    selectedSearchEngine: 0,
    autoOpenLinksBox: false,
    enableHistory: false
  }
  localStorage.settings = JSON.stringify(initialSettings);
  return initialSettings
}
const getSettings = () => {
  const localSettings = localStorage.settings;
  let settings;
  if(localSettings) {
    settings = JSON.parse(localSettings);
  } else {
    settings = init();
  }
  return settings;
}
const setSettings = (settings) => {
  localStorage.settings = JSON.stringify(settings);
}
export default {
  getSettings,
  setSettings
}