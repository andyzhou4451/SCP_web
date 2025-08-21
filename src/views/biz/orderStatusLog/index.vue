<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="订单ID" prop="orderNo">
              <el-input v-model="queryParams.orderNo" placeholder="请输入订单ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="操作人ID" prop="operatorId">
              <el-input v-model="queryParams.operatorId" placeholder="请输入操作人ID" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['biz:orderStatusLog:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['biz:orderStatusLog:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['biz:orderStatusLog:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['biz:orderStatusLog:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="orderStatusLogList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键ID" align="center" prop="id" v-if="true" />
        <el-table-column label="订单ID" align="center" prop="orderNo" />
        <el-table-column label="订单类型 1 销售单 2 退货单" align="center" prop="orderType" />
        <el-table-column label="原状态" align="center" prop="oldStatus" />
        <el-table-column label="新状态" align="center" prop="newStatus" />
        <el-table-column label="操作人ID" align="center" prop="operatorId" />
        <el-table-column label="操作内容" align="center" prop="operatorType" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['biz:orderStatusLog:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['biz:orderStatusLog:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改订单状态变更日志对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="orderStatusLogFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单ID" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="操作人ID" prop="operatorId">
          <el-input v-model="form.operatorId" placeholder="请输入操作人ID" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
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

<script setup name="OrderStatusLog" lang="ts">
import { listOrderStatusLog, getOrderStatusLog, delOrderStatusLog, addOrderStatusLog, updateOrderStatusLog } from '@/api/biz/orderStatusLog';
import { OrderStatusLogVO, OrderStatusLogQuery, OrderStatusLogForm } from '@/api/biz/orderStatusLog/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const orderStatusLogList = ref<OrderStatusLogVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const orderStatusLogFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: OrderStatusLogForm = {
  id: undefined,
  orderNo: undefined,
  orderType: undefined,
  oldStatus: undefined,
  newStatus: undefined,
  operatorId: undefined,
  operatorType: undefined,
  remark: undefined,
}
const data = reactive<PageData<OrderStatusLogForm, OrderStatusLogQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    orderNo: undefined,
    orderType: undefined,
    oldStatus: undefined,
    newStatus: undefined,
    operatorId: undefined,
    operatorType: undefined,
    params: {
    }
  },
  rules: {
    operatorId: [
      { required: true, message: "操作人ID不能为空", trigger: "blur" }
    ],
    remark: [
      { required: true, message: "备注不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询订单状态变更日志列表 */
const getList = async () => {
  loading.value = true;
  const res = await listOrderStatusLog(queryParams.value);
  orderStatusLogList.value = res.rows;
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
  orderStatusLogFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: OrderStatusLogVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加订单状态变更日志";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: OrderStatusLogVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getOrderStatusLog(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改订单状态变更日志";
}

/** 提交按钮 */
const submitForm = () => {
  orderStatusLogFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateOrderStatusLog(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addOrderStatusLog(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: OrderStatusLogVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除订单状态变更日志编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delOrderStatusLog(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('biz/orderStatusLog/export', {
    ...queryParams.value
  }, `orderStatusLog_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
