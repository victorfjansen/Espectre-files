import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from '@/router/index.js'
import store from '@/store/index.js'
import VueApexCharts from 'vue3-apexcharts'

createApp(App)
  .use(Antd)
  .use(router)
  .use(store)
  .use(VueApexCharts)
  .mount('#app').config.productionTip = false
