<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="品牌名称" prop="className">
              <el-input v-model="queryParams.className" placeholder="请输入商品中心品牌名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="品牌编码" prop="brandCode">
              <el-input
                v-model="queryParams.brandCode"
                maxlength="20"
                placeholder="请输入品牌编码"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item label="渠道" prop="channelName">
              <el-input
                v-model="queryParams.channelName"
                maxlength="20"
                placeholder="请输入渠道名称"
                clearable
                @keyup.enter="handleQuery"
              />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['biz:channelBrandRel:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['biz:channelBrandRel:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['biz:channelBrandRel:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['biz:channelBrandRel:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="channelBrandRelList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="品牌编码" align="center" prop="brandId" />
        <el-table-column label="品牌名称" align="center" prop="className" />
        <el-table-column label="销售渠道" align="center" prop="channelName" />
        <el-table-column label="渠道品牌编码" align="center" prop="channelBrandId" />
        <el-table-column label="渠道品牌名称" align="center" prop="channelBrandName" />
        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['biz:channelBrandRel:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['biz:channelBrandRel:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改销售渠道品牌对应关系对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="channelBrandRelFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="运营主体ID" prop="businessId">
          <el-input v-model="form.businessId" placeholder="请输入运营主体ID" />
        </el-form-item>
        <el-form-item label="商品中心品牌ID" prop="brandId">
          <el-input v-model="form.brandId" placeholder="请输入商品中心品牌ID" />
        </el-form-item>
        <el-form-item label="商品中心品牌名称" prop="className">
          <el-input v-model="form.className" placeholder="请输入商品中心品牌名称" />
        </el-form-item>
        <el-form-item label="渠道ID" prop="channelId">
          <el-input v-model="form.channelId" placeholder="请输入渠道ID" />
        </el-form-item>
        <el-form-item label="渠道名称" prop="channelName">
          <el-input v-model="form.channelName" placeholder="请输入渠道名称" />
        </el-form-item>
        <el-form-item label="渠道侧品牌ID" prop="channelBrandId">
          <el-input v-model="form.channelBrandId" placeholder="请输入渠道侧品牌ID" />
        </el-form-item>
        <el-form-item label="渠道侧品牌名称" prop="channelBrandName">
          <el-input v-model="form.channelBrandName" placeholder="请输入渠道侧品牌名称" />
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

<script setup name="ChannelBrandRel" lang="ts">
import { listChannelBrandRel, getChannelBrandRel, delChannelBrandRel, addChannelBrandRel, updateChannelBrandRel } from '@/api/biz/channelBrandRel';
import { ChannelBrandRelVO, ChannelBrandRelQuery, ChannelBrandRelForm } from '@/api/biz/channelBrandRel/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const channelBrandRelList = ref<ChannelBrandRelVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const channelBrandRelFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ChannelBrandRelForm = {
  id: undefined,
  businessId: undefined,
  brandId: undefined,
  className: undefined,
  channelId: undefined,
  channelName: undefined,
  channelBrandId: undefined,
  channelBrandName: undefined,
  status: undefined,
  remark: undefined,
}
const data = reactive<PageData<ChannelBrandRelForm, ChannelBrandRelQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    businessId: undefined,
    brandId: undefined,
    className: undefined,
    channelId: undefined,
    channelName: undefined,
    params: {
    }
  },
  rules: {
    channelBrandName: [
      { required: true, message: '渠道品牌名称不能为空', trigger: 'blur' },
      { min: 1, max: 20, message: '渠道品牌名称不能超过20个字符', trigger: 'blur' }
    ],
    channelBrandId: [
      { required: true, message: '渠道品牌编码不能为空', trigger: 'blur' },
      { min: 1, max: 20, message: '渠道品牌编码不能超过20个字符', trigger: 'blur' }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询销售渠道品牌对应关系列表 */
const getList = async () => {
  loading.value = true;
  const res = await listChannelBrandRel(queryParams.value);
  channelBrandRelList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  channelBrandRelFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: ChannelBrandRelVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加销售渠道品牌对应关系";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ChannelBrandRelVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getChannelBrandRel(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改销售渠道品牌对应关系";
}

/** 提交按钮 */
const submitForm = () => {
  channelBrandRelFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateChannelBrandRel(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addChannelBrandRel(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ChannelBrandRelVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除销售渠道品牌对应关系编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delChannelBrandRel(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('biz/channelBrandRel/export', {
    ...queryParams.value
  }, `channelBrandRel_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
