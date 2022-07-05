<template>
  <div class="content-body">
    <page-wrapper>
      <!-- 左侧内容 -->
      <el-card class="box-card">
        <div>
          <el-input :placeholder="label_result(select)" v-model="input" class="input-with-select" style="width: 600px">
            <template #prepend>
              <el-select v-model="select"  placeholder="请选择" style="width: 76px">
                <el-option label="主题" value="1"></el-option>
                <el-option label="内容" value="2"></el-option>
              </el-select>
            </template>
            <template #append>
              <el-button type="primary" class="search_button">搜索</el-button>
            </template>
          </el-input>
          <el-button
            class="add-topic-btn"
            style="float:right"
            type="primary"
            @click="addTopic"
          >发布话题</el-button>
        </div>
        <!-- tab标签 -->
        <el-tabs
          v-model="activeTypeName"
          class="topic-tabs"
          @tab-click="handleTabClick">
          <el-tab-pane
            v-for="(item, i) in topicTypeList"
            :key="i"
            :label="item.name"
            :name="item.key"
          ></el-tab-pane>
          <!-- 列表 -->
          <list-comp
            :isLoading="isLoading"
            :limit="limit"
            :listData="listData"
            @seeDetail="seeDetail"
          />
          <!-- 分页 -->
          <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :pager-count="5"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </el-tabs>
      </el-card>
      <!-- 右侧内容 -->
      <template #right>
        <user-info-comp />
        <client-qr-code-comp />
      </template>
    </page-wrapper>
  </div>
</template>

<script lang="ts">
import useHttpRequest, { resDataType } from '@/utils/request';
import { ElCard, ElMessage, ElTabPane, ElTabs } from 'element-plus';
import { defineComponent, ref } from 'vue';
import { topicListItemType } from '@/components/list-item/index.vue';
import ListComp from '@/components/list/index.vue';
import ClientQrCodeComp from '@/components/client-qr-code/index.vue';
import UserInfoComp from '@/components/user-info/index.vue';
import { topicTypeList } from '@/constant';
import { AxiosResponse } from 'axios';
import { useRoute, useRouter } from 'vue-router';

interface getTopicListType {
  page?: number;
  tab?: string;
  limit?: number;
  mdrender?: boolean;
}

export default defineComponent({
  components: {
    ElCard,
    ElTabs,
    ElTabPane,
    ListComp,
    ClientQrCodeComp,
    UserInfoComp
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    // 列表数据获取
    const { isLoading, adornUrl, httpRequest } = useHttpRequest();
    const listData = ref<topicListItemType[]>([]);
    const getTopicList = (data: getTopicListType) => {
      httpRequest({
        url: adornUrl('/api/v1/topics'),
        method: 'get',
        params: {
          page: page.value ?? 1,
          tab: activeTypeName.value ?? 'all',
          limit: limit.value ?? 20,
          mdrender: false,
          ...data
        }
      }).then((res: AxiosResponse<resDataType<topicListItemType[]>>) => {
        if (res?.data?.success) {
          listData.value = res?.data.data ?? [];
        }
      }).catch((e) => {
        ElMessage.error('请求失败');
        console.error(e);
      });
    };

    // 类型tab选中态及点击事件
    const activeTypeName = ref('all');
    const handleTabClick = (tab: { paneName: string; }) => {
      page.value = 1;
      activeTypeName.value = tab.paneName;
      getTopicList({
        tab: tab.paneName
      });
    };

    // 发布话题
    const addTopic = () => {
      router.push({
        path: '/add-topic',
        query: {
          listParm: `${activeTypeName.value}|${page.value}|${limit.value}`
        }
      });
    };

    // 页码、页面显示条数、换页及切换显示条数
    const page = ref(1);
    const limit = ref(20);
    const handleCurrentChange = (val: number) => {
      page.value = val;
      getTopicList({
        page: val
      });
    };
    const handleSizeChange = (val: number) => {
      page.value = 1;
      limit.value = val;
      getTopicList({
        limit: val
      });
    };

    // 初始化获取数据、根据路由修改tab、页码及页面显示条数
    const [tab, pageNum, limitNum] = String(route.params.listParm).split('|') ?? [];
    if (tab && pageNum && limitNum) {
      activeTypeName.value = tab;
      page.value = Number(pageNum);
      limit.value = Number(limitNum);
    }
    getTopicList({});

    // 查看详情
    const seeDetail = (id: string) => {
      router.push({
        path: `/detail`,
        query: {
          id: id,
          listParm: `${activeTypeName.value}|${page.value}|${limit.value}`
        }
      });
    };

    const input = ref("");
    const select = ref("1");
    function label_result(select : string) {
      if (select === "1") {
        return "请输入主题";
      } else {
        return "请输入内容";
      }
    }

    return {
      topicTypeList,
      isLoading,
      listData,
      activeTypeName,
      handleTabClick,
      addTopic,
      seeDetail,
      page,
      limit,
      handleCurrentChange,
      handleSizeChange,
      select,
      input,
      label_result,
    };
  },
})
</script>

<style lang="scss" src="./index.scss"></style>