<template>
  <el-container>
    <el-aside width="200px" style="margin-top: 30px;margin-left: 10%">
      <!--      <el-scrollbar height="100%">-->
      <!--        <el-menu class="left-menu">-->
      <!--          <el-sub-menu index="1">-->
      <!--            <template #title>1</template>-->
      <!--            <el-menu-item index="1-1">1-1</el-menu-item>-->
      <!--          </el-sub-menu>-->
      <!--          <el-menu-item index="2">2</el-menu-item>-->
      <!--          <el-menu-item index="3">3</el-menu-item>-->

      <!--        </el-menu>-->
      <!--      </el-scrollbar>-->
      <AsideTopic ref="topic" @selected="printIndex">
        <template #bottomslot v-if="isAssistant()">
          <el-menu-item index="release_announcement" @select="printIndex">发布公告</el-menu-item>
          <el-menu-item index="release_material" @select="printIndex">发布资料</el-menu-item>
        </template>
      </AsideTopic>
    </el-aside>
    <el-main class="main">
      <div class="markdown_render">
        <div style="text-align: left" class="to_release" v-if="this.nowIndex=='release_announcement'">
          <el-form :model="release_anno" label-width="50px" label-position="left">
            <p style="font-size: 12px">请在此输入相关信息来进行公告的发布</p>
            <el-form-item label="标题">
              <el-input v-model="release_anno.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item style="height: auto" label="内容">
              <el-input v-model="release_anno.text" type="textarea" rows="15"
                        placeholder="请注意，您的内容会以markdown格式渲染"></el-input>
              <p style="width: 100%">预览</p>


            </el-form-item>
            <el-form-item>

                <div class="inputpre" style="width:100%;min-height: 100px;max-height: 300px;overflow-y: auto">

                    <div v-html="preview"></div>


                </div>

            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onsubmit()">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
        <p v-else v-html="message"></p>
      </div>


      <!--        <el-menu style="background-color:  #ecf5ff">-->
      <!--          <el-sub-menu>-->
      <!--            <template #title>-->
      <!--              公告-->
      <!--            </template>-->
      <!--            <el-menu-item index="0">1</el-menu-item>-->
      <!--            <el-menu-item index="1">2</el-menu-item>-->
      <!--          </el-sub-menu>-->
      <!--          <el-menu-item index="2">666</el-menu-item>-->
      <!--        </el-menu>-->


      <!--      <el-tabs class="left-tab" type="border-card" tab-position="left" style="text-align: center">-->
      <!--        <el-scrollbar height="50px" :always="true">-->
      <!--          <el-tab-pane label="oo">-->
      <!--            <p>sasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss-->
      <!--              ssssssssssssssssssssss-->
      <!--              ssssssssssssssssssssssssssssssssssssssssss-->
      <!--              ssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>-->
      <!--          </el-tab-pane>-->
      <!--          <el-tab-pane label="oo456156"></el-tab-pane>-->
      <!--          <el-tab-pane>-->
      <!--            <template #label>-->
      <!--              <el-dropdown>-->
      <!--                <span>dasdsa</span>-->
      <!--                <el-dropdown-item>sadsadsa</el-dropdown-item>-->
      <!--              </el-dropdown>-->
      <!--            </template>-->
      <!--          </el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--          <el-tab-pane label="oo"></el-tab-pane>-->
      <!--        </el-scrollbar>-->

      <!--      </el-tabs>-->


    </el-main>
  </el-container>
</template>

<script>
import Markdownit from "markdown-it";
import AsideTopic from "@/components/AsideTopic";
import { reactive } from "vue";

const md = new Markdownit();
md.configure("commonmark");
let result = md.render("# markdown!\n  \n## markdown!\n### markdown!\n #### markdown!");
let preview = "";
const release_anno = reactive({
  title: "",
  text: ""
});

export default {
  components: { AsideTopic },
  data() {
    return {
      message: result,
      nowIndex: "",
      release_anno: release_anno,
    };
  },
  mounted() {
    this.$refs.topic.addItem({
      id: "233",
      title: "标题2",
      text: "emmm",
      items: [{
        title: "12",
        text: "sasa"
      }]
    });
    console.log("sasasa");
  },
  methods: {
    printIndex(index) {
      this.message = "23333";
      this.nowIndex = index;
      console.log("father:" + index);
    },
    isAssistant() {
      console.log("woyaocaonia");
      //console.log(this.$store)
      //console.log(this.$store.getters['user'].isloggedIn)
      //console.log(this.$store.getters['user'].role=='assistant')
      return this.$store.getters["user/role"] == "assistant";

    },
    onsubmit() {
      console.log(release_anno);
    }
  },
  computed:{
    preview(){
      return md.render(this.release_anno.text)
    }
  }
};
</script>

<style>
.inputpre {
  border-bottom: solid 1px var(--el-menu-border-color);
  border-left: solid 1px var(--el-menu-border-color);
  border-top: solid 1px var(--el-menu-border-color);
  border-right: solid 1px var(--el-menu-border-color);
}

.main {
  padding: 0;
  /*margin: 30px 200px 0px;*/
  border-bottom: solid 1px var(--el-menu-border-color);
  border-left: solid 1px var(--el-menu-border-color);
  border-top: solid 1px var(--el-menu-border-color);
  border-right: solid 1px var(--el-menu-border-color);
  margin-right: 10%;
  margin-top: 30px;
  height: 100%;
  min-height: 1000px;
}

.left-menu {
  border-bottom: solid 1px var(--el-menu-border-color);
  border-left: solid 1px var(--el-menu-border-color);
  border-top: solid 1px var(--el-menu-border-color);
  height: 800px;
  width: 100%;
}


.markdown_render h1 {
  font-size: 2em;
}


</style>