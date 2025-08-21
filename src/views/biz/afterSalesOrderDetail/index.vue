<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="售后订单号" prop="afterSalesOrderNo">
              <el-input v-model="queryParams.afterSalesOrderNo" placeholder="请输入售后订单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="原订单明细ID" prop="orderDetailNo">
              <el-input v-model="queryParams.orderDetailNo" placeholder="请输入原订单明细ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="SPU ID" prop="spuId">
              <el-input v-model="queryParams.spuId" placeholder="请输入SPU ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="SPU名称" prop="spuName">
              <el-input v-model="queryParams.spuName" placeholder="请输入SPU名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="SKU ID" prop="skuId">
              <el-input v-model="queryParams.skuId" placeholder="请输入SKU ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="商品名称" prop="skuName">
              <el-input v-model="queryParams.skuName" placeholder="请输入商品名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="商品规格" prop="skuAttr">
              <el-input v-model="queryParams.skuAttr" placeholder="请输入商品规格" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="商品售后数量" prop="skuNum">
              <el-input v-model="queryParams.skuNum" placeholder="请输入商品售后数量" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="退款金额" prop="afterSalesPrice">
              <el-input v-model="queryParams.afterSalesPrice" placeholder="请输入退款金额" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['biz:afterSalesOrderDetail:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['biz:afterSalesOrderDetail:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['biz:afterSalesOrderDetail:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['biz:afterSalesOrderDetail:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="afterSalesOrderDetailList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键ID" align="center" prop="id" v-if="true" />
        <el-table-column label="售后订单号" align="center" prop="afterSalesOrderNo" />
        <el-table-column label="原订单明细ID" align="center" prop="orderDetailNo" />
        <el-table-column label="SPU ID" align="center" prop="spuId" />
        <el-table-column label="SPU名称" align="center" prop="spuName" />
        <el-table-column label="SKU ID" align="center" prop="skuId" />
        <el-table-column label="商品名称" align="center" prop="skuName" />
        <el-table-column label="商品规格" align="center" prop="skuAttr" />
        <el-table-column label="商品售后数量" align="center" prop="skuNum" />
        <el-table-column label="退款金额" align="center" prop="afterSalesPrice" />
        <el-table-column label="售后备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['biz:afterSalesOrderDetail:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['biz:afterSalesOrderDetail:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改售后订单明细对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="afterSalesOrderDetailFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="售后订单号" prop="afterSalesOrderNo">
          <el-input v-model="form.afterSalesOrderNo" placeholder="请输入售后订单号" />
        </el-form-item>
        <el-form-item label="原订单明细ID" prop="orderDetailNo">
          <el-input v-model="form.orderDetailNo" placeholder="请输入原订单明细ID" />
        </el-form-item>
        <el-form-item label="SPU ID" prop="spuId">
          <el-input v-model="form.spuId" placeholder="请输入SPU ID" />
        </el-form-item>
        <el-form-item label="SPU名称" prop="spuName">
          <el-input v-model="form.spuName" placeholder="请输入SPU名称" />
        </el-form-item>
        <el-form-item label="SKU ID" prop="skuId">
          <el-input v-model="form.skuId" placeholder="请输入SKU ID" />
        </el-form-item>
        <el-form-item label="商品名称" prop="skuName">
          <el-input v-model="form.skuName" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品规格" prop="skuAttr">
          <el-input v-model="form.skuAttr" placeholder="请输入商品规格" />
        </el-form-item>
        <el-form-item label="商品售后数量" prop="skuNum">
          <el-input v-model="form.skuNum" placeholder="请输入商品售后数量" />
        </el-form-item>
        <el-form-item label="退款金额" prop="afterSalesPrice">
          <el-input v-model="form.afterSalesPrice" placeholder="请输入退款金额" />
        </el-form-item>
        <el-form-item label="售后备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入售后备注" />
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

<script setup name="AfterSalesOrderDetail" lang="ts">
import { listAfterSalesOrderDetail, getAfterSalesOrderDetail, delAfterSalesOrderDetail, addAfterSalesOrderDetail, updateAfterSalesOrderDetail } from '@/api/biz/afterSalesOrderDetail';
import { AfterSalesOrderDetailVO, AfterSalesOrderDetailQuery, AfterSalesOrderDetailForm } from '@/api/biz/afterSalesOrderDetail/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const afterSalesOrderDetailList = ref<AfterSalesOrderDetailVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const afterSalesOrderDetailFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: AfterSalesOrderDetailForm = {
  id: undefined,
  afterSalesOrderNo: undefined,
  orderDetailNo: undefined,
  spuId: undefined,
  spuName: undefined,
  skuId: undefined,
  skuName: undefined,
  skuAttr: undefined,
  skuNum: undefined,
  afterSalesPrice: undefined,
  remark: undefined,
}
const data = reactive<PageData<AfterSalesOrderDetailForm, AfterSalesOrderDetailQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    afterSalesOrderNo: undefined,
    orderDetailNo: undefined,
    spuId: undefined,
    spuName: undefined,
    skuId: undefined,
    skuName: undefined,
    skuAttr: undefined,
    skuNum: undefined,
    afterSalesPrice: undefined,
    params: {
    }
  },
  rules: {
    orderDetailNo: [
      { required: true, message: "原订单明细ID不能为空", trigger: "blur" }
    ],
    skuNum: [
      { required: true, message: "商品售后数量不能为空", trigger: "blur" }
    ],
    remark: [
      { required: true, message: "售后备注不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询售后订单明细列表 */
const getList = async () => {
  loading.value = true;
  const res = await listAfterSalesOrderDetail(queryParams.value);
  afterSalesOrderDetailList.value = res.rows;
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
  afterSalesOrderDetailFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: AfterSalesOrderDetailVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加售后订单明细";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: AfterSalesOrderDetailVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getAfterSalesOrderDetail(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改售后订单明细";
}

/** 提交按钮 */
const submitForm = () => {
  afterSalesOrderDetailFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateAfterSalesOrderDetail(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addAfterSalesOrderDetail(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: AfterSalesOrderDetailVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除售后订单明细编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delAfterSalesOrderDetail(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('biz/afterSalesOrderDetail/export', {
    ...queryParams.value
  }, `afterSalesOrderDetail_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
