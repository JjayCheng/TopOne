import Vue from 'vue';
import component from './promptBox.vue';

const PromptBoxConsteuctor = Vue.extend(component);

const promptBox = (options) => {
  if(Vue.prototype.$isServer) return;
  const instance = new PromptBoxConsteuctor({
    propsData: options
  });
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
}

export default (Vue) => {
  Vue.component('promptBox', PromptBoxConsteuctor);
  Vue.prototype.$promptBox = promptBox
}