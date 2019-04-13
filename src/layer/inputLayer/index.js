import Vue from 'vue';
import component from './inputLayer.vue';

const inputLayerConsteuctor = Vue.extend(component);

const inputLayer = (options) => {
  if(Vue.prototype.$isServer) return;
  const instance = new inputLayerConsteuctor({
    propsData: options
  });
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
}

export default (Vue) => {
  Vue.component('inputLayer', inputLayerConsteuctor);
  Vue.prototype.$inputLayer = inputLayer
}