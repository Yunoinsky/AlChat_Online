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
  props: ["menuIndex"],
  methods: {
    handleSelect(key, _keyPath) {
      if (key == 4) {
        console.log(key);
        window.location.href = "./alchat";
      }
    },
  },

  template: `
    <el-menu :default-active="menuIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
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

const bookDBArray = [
  {
    title: "De agri cultura",
    ctitle: "农业志",
    author: "Cato",
    cauthor: "老加图",
    url: "http://thelatinlibrary.com/cato/cato.agri.html",
    filename: "De_agri_cultura",
  },
  {
    title: "Res rustica",
    ctitle: "农事三书",
    author: "Collumela",
    cauthor: "科卢麦拉",
    url: "http://thelatinlibrary.com/columella.html",
    filename: "Res_rustica",
  },
  {
    title: "Historia naturalis",
    ctitle: "自然志",
    author: "Pliny",
    cauthor: "老普林尼",
    url:
      "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3atext%3a1999.02.0138",
    filename: "Natura_Histori",
  },
  {
    title: "Collectanea rerum mirabilium",
    ctitle: "奇物志",
    author: "Solinus",
    cauthor: "索里努斯",
    url: "http://thelatinlibrary.com/solinus5.html",
    filename: "Collectanea_rerum_mirabilium",
  },
  {
    title: "Etymologiae",
    ctitle: "词源",
    author: "Isidore of Seville",
    cauthor: "塞维利亚的伊西多尔",
    url:
      "http://www.fh-augsburg.de/~harsch/Chronologia/Lspost07/Isidorus/isi_et00.html",
    filename: "Etymologiarum_libri_XX",
  },
  {
    title: "De universo",
    ctitle: "论万物",
    author: "Hrabanus Maurus",
    cauthor: "拉巴努斯·毛鲁斯",
    url: "http://www.intratext.com/X/LAT0385.HTM",
    filename: "De_rerum_naturis",
  },
  {
    title: "Physica",
    ctitle: "自然学",
    author: "Hildegard of Bingen",
    cauthor: "宾根的希尔德加尔德",
    url:
      "http://www.fh-augsburg.de/~harsch/Chronologia/Lspost12/Hildegard/hil_phy0.html",
    filename: "Physica_Bingensis",
  },
];

// const getKey = (prefix, id) => `${prefix}-${id}`;
const fetchBookData = () => {
  let id = 0;
  return bookDBArray.map((book) => {
      return {
      id: id++,
      label: `${book.title} 《${book.ctitle}》`,
      children: undefined,
    };
  });
};


/* 侧边栏 */
const BookTree = {
  data() {
    return {
      data: fetchBookData(4, 30, 40),
      props: {
        value: "id",
        label: "label",
        children: "children",
      },
      query: Vue.ref(''),
      treeRef: Vue.ref(),
      bookDBArray: bookDBArray,
      selectID: 0,
    };
  },
  template: `
  <el-tree-v2 :props=props :highlight-current="true" :data="data" :height="300" @node-click="nodeClick"></el-tree-v2>
  <el-descriptions title="Book Info" :column="1" :size="'small'" border>
    <el-descriptions-item label="Title"><em> {{ bookDBArray[selectID].title }} </em></el-descriptions-item>
    <el-descriptions-item label="标题"> {{ '《'+bookDBArray[selectID].ctitle+'》' }} </el-descriptions-item>
    <el-descriptions-item label="Author"> {{ bookDBArray[selectID].author }} </el-descriptions-item>
    <el-descriptions-item label="作者"> {{ bookDBArray[selectID].cauthor }} </el-descriptions-item>
    <el-descriptions-item label="url"><a :href="bookDBArray[selectID].url"> {{ bookDBArray[selectID].url }} </a></el-descriptions-item>
  </el-descriptions>
  <el-row class="mb-4">
  <el-button @click="onDownload">
      <el-icon>
        <download />
      </el-icon>
      <span> Book Download</span>
    </el-button>
    <el-button @click="this.onPlot(0)">
      <el-icon>
        <grape />
      </el-icon>
      <span> Plot QC </span>
    </el-button>
  </el-row>
  <el-row class="mb-4">
    <el-button @click="this.onPlot(1)">
      <el-icon>
        <grape />
      </el-icon>
      <span> Plot 2D UMAP </span>
    </el-button>
    <el-button @click="this.onPlot(2)">
      <el-icon>
        <grape />
      </el-icon>
      <span> Plot 3D UMAP </span>
    </el-button>
  </el-row>
  <span class="linkcloze">由于带宽限制，后台下载速度缓慢。
  如难以下载，可访问
  <el-link type="primary" 
          href="https://cloud.tsinghua.edu.cn/d/1cc7c1f1001a47b4a94b/" 
          target="_blank">
          AlChat Data</el-link></span>`
  ,

  methods: {
    nodeClick(data, node) {
      if (node.level==1){
        this.selectID = data.id;
      }
    },
    onDownload() {
      const fn = bookDBArray[this.selectID].filename;
      const form = new FormData();
      form.append('fileName', fn);
      form.append('downloadType', 'emb');
      fetch('/download', {
        method: 'POST',
        body: form,
        responseType: 'blob',
      }).then((res)=> {
        return res.blob()
      }).then((data) => {
        const bl = new Blob([data], {type: "text/javascript"})
        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(bl);
        a.download = `${fn}.json`;
        a.click();
        window.URL.revokeObjectURL(a.href);
      })
    },
    onPlot(ind) {
      const fn = ['qc_control.json','umap_embedding.json', 'umap_embedding3d.json'];
      fetch('/plot/'+fn[ind], {
        method: 'GET',
        // responseType: 'blob'
      }).then((res)=>{
        return res.json()
      }).then((fig)=>{
        fig.layout.height=600
        fig.layout.width=750
        PLOTER = document.getElementById('ploter');
        Plotly.newPlot(PLOTER, fig.data, fig.layout)
      })
    }
  }
};

const YunoPage = {
  props: ["pageIndex"],
  components: {
    "yuno-menu": YunoMenu,
    "book-tree": BookTree
  },

  template: `
    <el-container id="main-container">
      <el-header>
        <yuno-menu :menuIndex="pageIndex"></yuno-menu>
      </el-header>
      <el-container>
        <el-aside>
          <book-tree></book-tree>
        </el-aside>
        <el-main>
          <div id="ploter"></div>
        </el-main>
      </el-container>
      <el-footer>
        <span title="来点籥的昆虫行为学研究日志">京ICP备2022018448号-1 <em>On developement</em></span>
      </el-footer>
    </el-container>`,
};

app.component("yuno-page", YunoPage);
app.mount(".index");


	

