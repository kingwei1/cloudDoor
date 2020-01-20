import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueQuillEditor from 'vue-quill-editor' // 引入富文本工具
import Qs from 'qs'

Vue.use(ElementUI);
Vue.use(vueQuillEditor);
Vue.config.productionTip = false;
Vue.prototype.$axios=axios;
Vue.prototype.$qs=Qs;
//测试环境
Vue.prototype.$pictrueShowUrl='http://api.succy.cn';
Vue.prototype.$baseUrl='http://api.succy.cn/v1/portal';
Vue.prototype.$userUrl='http://api.succy.cn/v1/portal/basic';
Vue.prototype.$schoolCompanyUrl='http://api.succy.cn/v1/portal/schoolEnterprise';
//生产环境
/* Vue.prototype.$pictrueShowUrl='http://47.104.170.122';
Vue.prototype.$baseUrl='http://47.104.170.122/v1/portal';
Vue.prototype.$userUrl='http://47.104.170.122/v1/portal/basic';
Vue.prototype.$schoolCompanyUrl='http://47.104.170.122/v1/portal/schoolEnterprise'; */
Vue.prototype.changeDate=function(date, fmt){
      date = date == undefined ? new Date() : date;
		    date = typeof date == 'number' ? new Date(date) : date;
		    fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
		    var obj =
		    {
		        'y': date.getFullYear(), // 年份，注意必须用getFullYear
		        'M': date.getMonth() + 1, // 月份，注意是从0-11
		        'd': date.getDate(), // 日期
		        'q': Math.floor((date.getMonth() + 3) / 3), // 季度
		        'w': date.getDay(), // 星期，注意是0-6
		        'H': date.getHours(), // 24小时制
		        'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
		        'm': date.getMinutes(), // 分钟
		        's': date.getSeconds(), // 秒
		        'S': date.getMilliseconds() // 毫秒
		    };
		    var week = ['天', '一', '二', '三', '四', '五', '六'];
		    for(var i in obj)
		    {
		        fmt = fmt.replace(new RegExp(i+'+', 'g'), function(m)
		        {
		            var val = obj[i] + '';
		            if(i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
		            for(var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
		            return m.length == 1 ? val : val.substring(val.length - m.length);
		        });
		    }
		    return fmt;
};
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
