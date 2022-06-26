const App = {
  data() {
    return {
      message: "Hello Element Plus",
    };
  },
};

const app = Vue.createApp(App);
for (const [key, comp] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, comp);
}
app.use(ElementPlus);

const YunoMenu = {
  data() {
    return {
      activeIndex: "4",
    };
  },
  methods: {
    handleSelect(key, _keyPath) {
        if (key==4) {
            console.log(key);
            window.location.href="./alchat";
        }
    },
  },

  template: `
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1" title="集虚纳空，以至心斋">
      <el-icon>
        <home-filled />
      </el-icon>
      集虚斋
    </el-menu-item>
    <el-menu-item index="2" title="好好学习，天天向上">
      <el-icon>
        <sunrise />
      </el-icon>
      每日进化中！
    </el-menu-item>
    <el-menu-item index="3" title="来听听虫鸣吧">
      <el-icon>
        <headset />
      </el-icon>
      夏日虫语
    </el-menu-item>
    <el-menu-item index="4" title="基于词嵌入与社群网络的博物学文本分析">
      <el-icon>
        <histogram />
      </el-icon>
      ALChat 来点博物学
    </el-menu-item>
     </el-menu>`,
};

app.component("yuno-menu", YunoMenu);
app.mount(".index");

