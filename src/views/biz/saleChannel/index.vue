<template>
  <div class="p-2">
    <!-- 卡片展示区域 -->
    <el-card shadow="never">
      <el-row :gutter="20">
        <el-col v-for="item in saleChannelList" :key="item.id" :xs="24" :sm="12" :md="8" :lg="6">
          <div class="channel-card">
            <div class="channel-info">
              <img
                :src="item.channelImageUrl || item.channelImage"
                class="channel-icon"
                alt="logo"
              />
              <span class="channel-name">{{ item.channelName }}</span>
            </div>
            <el-switch
              v-model="item.status"
              :active-value="'1'"
              :inactive-value="'0'"
              @change="(val) => onToggle(item, val)"
            />
          </div>
        </el-col>
      </el-row>

      <!-- 分页 -->
      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>

    <!-- 修改渠道对话框，保留编辑功能 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="saleChannelFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="渠道名称" prop="channelName">
          <el-input v-model="form.channelName" placeholder="请输入渠道名称" />
        </el-form-item>
        <el-form-item label="渠道图标URL" prop="channelImage">
          <image-upload v-model="form.channelImage" />
        </el-form-item>
        <el-form-item label="渠道编码" prop="channelCode">
          <el-input v-model="form.channelCode" placeholder="请输入渠道编码" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="SaleChannel" lang="ts">
import { listSaleChannel, getSaleChannel, delSaleChannel, updateSaleChannel } from '@/api/biz/saleChannel';
import { SaleChannelVO, SaleChannelQuery, SaleChannelForm } from '@/api/biz/saleChannel/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const saleChannelList = ref<SaleChannelVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const saleChannelFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: SaleChannelForm = {
  id: undefined,
  channelName: undefined,
  channelImage: undefined,
  channelCode: undefined,
  status: undefined,
  remark: undefined
};
const data = reactive<PageData<SaleChannelForm, SaleChannelQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    channelName: undefined,
    channelImage: undefined,
    channelCode: undefined,
    status: undefined,
    params: {}
  },
  rules: {
    channelImage: [{ required: true, message: '渠道图标URL不能为空', trigger: 'blur' }],
    remark: [{ required: true, message: '备注不能为空', trigger: 'blur' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询销售渠道列表 */
const getList = async () => {
  loading.value = true;
  const res = await listSaleChannel(queryParams.value);
  saleChannelList.value = res.rows;
  total.value = res.total;
  loading.value = false;
};

/** 开关状态变更 */
const onToggle = async (item: SaleChannelVO, val: string) => {
  // 如果没有设置备注，给一个默认占位字符（例如一个空格或自定义描述）
  const remark = item.remark && item.remark.trim() ? item.remark : '状态变更';
  const data: SaleChannelForm = {
    id: item.id,
    channelImage: item.channelImage,
    remark: remark,
    status: val
  };
  await updateSaleChannel(data);
  proxy?.$modal.msgSuccess('状态更新成功');
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
};

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
};

/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData };
  saleChannelFormRef.value?.resetFields();
};

/** 修改按钮操作（若保留编辑功能） */
const handleUpdate = async (row?: SaleChannelVO) => {
  reset();
  const _id = row?.id;
  if (!_id) return;
  const res = await getSaleChannel(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改销售渠道';
};

/** 提交按钮 */
const submitForm = () => {
  saleChannelFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) return;
    if (form.value.id) {
      buttonLoading.value = true;
      try {
        await updateSaleChannel(form.value);
        proxy?.$modal.msgSuccess('修改成功');
        dialog.visible = false;
        await getList();
      } finally {
        buttonLoading.value = false;
      }
    } else {
      proxy?.$modal.msgWarning('新增渠道功能已关闭');
      dialog.visible = false;
    }
  });
};

onMounted(() => {
  getList();
});
</script>

<style scoped>
.channel-card {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  position: relative;
}
.status-switch {
  position: absolute;
  top: 10px;
  right: 10px;
}
.channel-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}
.channel-name {
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
<style scoped>
.channel-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 12px 16px;
  height: 80px;
}
.channel-info {
  display: flex;
  align-items: center;
}
.channel-icon {
  width: 60px;
  height: 50px;
  margin-right: 12px;
}
.channel-name {
  font-weight: bold;
  font-size: 16px;
}
</style>
