<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="店铺名称" prop="shoppeName">
              <el-input v-model="queryParams.shoppeName" placeholder="请输入渠道店铺名称" clearable maxlength="20" />
            </el-form-item>
            <el-form-item label="店铺编码" prop="shoppeCode">
              <el-input v-model="queryParams.shoppeCode" placeholder="请输入店铺编码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="渠道" prop="shoppeChannelId">
              <el-select v-model="queryParams.shoppeChannelId" placeholder="请选择渠道" clearable>
                <el-option v-for="item in channelOptions" :key="item.id" :label="item.channelName" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['biz:shoppeInfo:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['biz:shoppeInfo:edit']"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['biz:shoppeInfo:remove']"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['biz:shoppeInfo:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="shoppeInfoList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="店铺名称" align="center" prop="shoppeName" />
        <el-table-column label="店铺编码" align="center" prop="shoppeCode" />
        <el-table-column label="渠道" align="center" prop="shoppeChannelName" />
        <el-table-column label="启用" align="center">
          <template #default="{ row }">
            <el-switch v-model="row.status" :active-value="'1'" :inactive-value="'0'" @change="(val) => handleSwitchStatus(row, val)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="{ row }">
            <el-button type="primary" link icon="Edit" @click="handleUpdate(row)" v-hasPermi="['biz:shoppeInfo:edit']">编辑</el-button>
            <el-button type="primary" link icon="Delete" @click="handleDelete(row)" v-hasPermi="['biz:shoppeInfo:remove']">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改店铺，管理各渠道下的店铺信息对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="shoppeInfoFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="渠道" prop="shoppeChannelId">
          <el-select v-model="form.shoppeChannelId" placeholder="请选择渠道" clearable>
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.channelName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="店铺名称" prop="shoppeName">
          <el-input v-model="form.shoppeName" placeholder="请输入店铺名称" />
        </el-form-item>
        <el-form-item label="店铺编码" prop="shoppeCode">
          <el-input v-model="form.shoppeCode" placeholder="请输入店铺编码" />
        </el-form-item>
        <el-form-item label="店铺密文" prop="shoppeSecret">
          <el-input v-model="form.shoppeSecret" placeholder="请输入店铺密文" />
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

<script setup name="ShoppeInfo" lang="ts">
import { ref, reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { listShoppeInfo, getShoppeInfo, delShoppeInfo, addShoppeInfo, updateShoppeInfo } from '@/api/biz/shoppeInfo';
import type{ ShoppeInfoVO, ShoppeInfoQuery, ShoppeInfoForm } from '@/api/biz/shoppeInfo/types';
import { listSaleChannel } from '@/api/biz/saleChannel';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
import type { PageData } from '@/api/biz/shoppeInfo/types';
import type { ComponentInternalInstance } from 'vue';
import type { ElFormInstance } from 'element-plus';

// 声明渠道下拉选项
const channelOptions = ref<{ id: string | number; channelName: string }[]>([]);

const shoppeInfoList = ref<ShoppeInfoVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance | null>(null);
const shoppeInfoFormRef = ref<ElFormInstance | null>(null);

// 定义弹窗配置类型
interface DialogOption {
  visible: boolean;
  title: string;
}

interface PageData<F, Q> {
  form: F;
  queryParams: Q;
  rules: any;
}
const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ShoppeInfoForm = {
  id: undefined,
  shoppeChannelId: undefined,
  shoppeName: undefined,
  shoppeCode: undefined,
  shoppeSecret: undefined,
  status: undefined,
  remark: undefined
};
const data = reactive<PageData<ShoppeInfoForm, ShoppeInfoQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    shoppeChannelId: undefined,
    shoppeName: undefined,
    shoppeCode: undefined,
    shoppeSecret: undefined,
    status: undefined,
    params: {}
  },
  rules: {
    shoppeChannelId: [
      { required: true, message: '请选择渠道', trigger: 'change' }
    ],
    shoppeName: [
      { required: true, message: '店铺名称不能为空', trigger: 'blur' }
    ],
    shoppeCode: [
      { required: true, message: '店铺编码不能为空', trigger: 'blur' }
    ],
    shoppeSecret: [{ required: true, message: '店铺密文不能为空', trigger: 'blur' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询店铺，管理各渠道下的店铺信息列表 */
const getList = async () => {
  loading.value = true;
  const res = await listShoppeInfo(queryParams.value);
  // 如果渠道列表为空，则先查询渠道
  if (channelOptions.value.length === 0) {
    const chanRes = await listSaleChannel({ status: '1' });
    channelOptions.value = chanRes.rows.map(item => ({
      id: item.id,
      channelName: item.channelName
    }));
  }
  // 根据渠道ID映射名称
  shoppeInfoList.value = res.rows.map(item => {
    const match = channelOptions.value.find(c => c.id === item.shoppeChannelId);
    return {
      ...item,
      shoppeChannelName: match ? match.channelName : ''
    };
  });
  total.value = res.total;
  loading.value = false;
};


/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
};

/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData };
  shoppeInfoFormRef.value?.resetFields();
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

/** 多选框选中数据 */
const handleSelectionChange = (selection: ShoppeInfoVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '新增店铺';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: ShoppeInfoVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getShoppeInfo(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改店铺';
};

/** 提交按钮 */
const submitForm = () => {
  shoppeInfoFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateShoppeInfo(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addShoppeInfo(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: ShoppeInfoVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除店铺，管理各渠道下的店铺信息编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delShoppeInfo(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'biz/shoppeInfo/export',
    {
      ...queryParams.value
    },
    `shoppeInfo_${new Date().getTime()}.xlsx`
  );
};

/** 修改：加载启用渠道列表 */
const loadChannels = async () => {
  const res = await listSaleChannel();
  channelOptions.value = res.rows.map((item) => ({ id: item.id, channelName: item.channelName }));
};
/** 修改：状态开关变更调用后端接口 */
const handleSwitchStatus = async (row: ShoppeInfoVO, status: string) => {
  try {
    await proxy?.$axios.put(`/biz/shoppeInfo/${row.id}/status/${status}`);
    proxy?.$modal.msgSuccess('状态更新成功');
  } catch (e: any) {
    proxy?.$modal.msgError(e.msg || '状态更新失败');
    // 回退开关状态
    row.status = row.status === '1' ? '0' : '1';
  }
};
onMounted(() => {
   loadChannels();
   getList();
});
</script>
