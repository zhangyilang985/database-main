<template>
  <el-scrollbar height="100%">
    <el-menu class="left-menu" @select="updateSelected">
      <slot name="topslot"></slot>
      <template v-for="menu in subMenus" :key="menu.id">
        <el-sub-menu :index="menu.id"  v-if="menuHasChildren.includes(menu)">
          <template #title>
            {{menu.title}}
          </template>
          <el-menu-item   v-for="item in menu.items" :key="item.id" :index="item.id">
            {{item.title}}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else  :index="menu.id">{{menu.title}}</el-menu-item>
      </template>
      <slot name="bottomslot"></slot>
    </el-menu>
  </el-scrollbar>
</template>

<script>
/*
* subMenus.items[
*   {
*     title:''
*     text:''
*   }
* ]
*
*
*
* */
export default {
  name: "AsideTopic",
  data() {
    return {
      subMenus: [{
        id:"1",
        title: "标题1",
        text: "",
        items: [{
          id:"2",
          title: "子标题1",
          text: "233",
        }]
      }],
      selectedId:"",
    };

  },
  methods: {
    addItem(subMenu) {
      this.subMenus.push(subMenu);
    },
    updateSelected(index){
      this.selectedId=index;
      console.log(this.selectedId);
      this.$emit('selected',index)
    }
  },

  computed: {
    menuHasChildren() {
      return this.subMenus.filter(menu=>menu.text=="");
    },
    nowSelectedID(){
      return this.selectedID;
    }
  }
};
</script>

<style>
.left-menu {
  border-bottom: solid 1px var(--el-menu-border-color);
  border-left: solid 1px var(--el-menu-border-color);
  border-top: solid 1px var(--el-menu-border-color);
  height: 800px;
  width: 100%;
}

</style>