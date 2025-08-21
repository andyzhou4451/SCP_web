<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="内部订单号" prop="orderId">
              <el-input v-model="queryParams.orderId" placeholder="请输入内部订单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="外部系统订单号" prop="externalOrderId">
              <el-input v-model="queryParams.externalOrderId" placeholder="请输入外部系统订单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="系统来源 " prop="systemSource">
              <el-input v-model="queryParams.systemSource" placeholder="请输入系统来源 " clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="请求方向 (1 入站 2 出站)" prop="direction">
              <el-input v-model="queryParams.direction" placeholder="请输入请求方向 (1 入站 2 出站)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="请求时间(精确到毫秒)" prop="requestTime">
              <el-date-picker clearable
                v-model="queryParams.requestTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择请求时间(精确到毫秒)"
              />
            </el-form-item>
            <el-form-item label="响应时间(精确到毫秒)" prop="responseTime">
              <el-date-picker clearable
                v-model="queryParams.responseTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择响应时间(精确到毫秒)"
              />
            </el-form-item>
            <el-form-item label="请求处理时长(毫秒)" prop="durationMs">
              <el-input v-model="queryParams.durationMs" placeholder="请输入请求处理时长(毫秒)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="请求内容" prop="requestBody">
              <el-input v-model="queryParams.requestBody" placeholder="请输入请求内容" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="响应内容" prop="responseBody">
              <el-input v-model="queryParams.responseBody" placeholder="请输入响应内容" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="HTTP状态码" prop="responseCode">
              <el-input v-model="queryParams.responseCode" placeholder="请输入HTTP状态码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="是否成功 (0-失败, 1-成功)" prop="success">
              <el-input v-model="queryParams.success" placeholder="请输入是否成功 (0-失败, 1-成功)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="错误信息" prop="errorMessage">
              <el-input v-model="queryParams.errorMessage" placeholder="请输入错误信息" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['biz:orderLog:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['biz:orderLog:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['biz:orderLog:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['biz:orderLog:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="orderLogList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键ID" align="center" prop="id" v-if="true" />
        <el-table-column label="内部订单号" align="center" prop="orderId" />
        <el-table-column label="外部系统订单号" align="center" prop="externalOrderId" />
        <el-table-column label="系统来源 " align="center" prop="systemSource" />
        <el-table-column label="接口类型 " align="center" prop="interfaceType" />
        <el-table-column label="请求方向 (1 入站 2 出站)" align="center" prop="direction" />
        <el-table-column label="请求时间(精确到毫秒)" align="center" prop="requestTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.requestTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="响应时间(精确到毫秒)" align="center" prop="responseTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.responseTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="请求处理时长(毫秒)" align="center" prop="durationMs" />
        <el-table-column label="请求内容" align="center" prop="requestBody" />
        <el-table-column label="响应内容" align="center" prop="responseBody" />
        <el-table-column label="HTTP状态码" align="center" prop="responseCode" />
        <el-table-column label="是否成功 (0-失败, 1-成功)" align="center" prop="success" />
        <el-table-column label="错误信息" align="center" prop="errorMessage" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['biz:orderLog:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['biz:orderLog:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改外部订单交互日志对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="orderLogFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="内部订单号" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入内部订单号" />
        </el-form-item>
        <el-form-item label="外部系统订单号" prop="externalOrderId">
          <el-input v-model="form.externalOrderId" placeholder="请输入外部系统订单号" />
        </el-form-item>
        <el-form-item label="系统来源 " prop="systemSource">
          <el-input v-model="form.systemSource" placeholder="请输入系统来源 " />
        </el-form-item>
        <el-form-item label="请求方向 (1 入站 2 出站)" prop="direction">
          <el-input v-model="form.direction" placeholder="请输入请求方向 (1 入站 2 出站)" />
        </el-form-item>
        <el-form-item label="请求时间(精确到毫秒)" prop="requestTime">
          <el-date-picker clearable
            v-model="form.requestTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择请求时间(精确到毫秒)">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="响应时间(精确到毫秒)" prop="responseTime">
          <el-date-picker clearable
            v-model="form.responseTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择响应时间(精确到毫秒)">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="请求处理时长(毫秒)" prop="durationMs">
          <el-input v-model="form.durationMs" placeholder="请输入请求处理时长(毫秒)" />
        </el-form-item>
        <el-form-item label="请求内容" prop="requestBody">
            <el-input v-model="form.requestBody" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="响应内容" prop="responseBody">
            <el-input v-model="form.responseBody" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="HTTP状态码" prop="responseCode">
          <el-input v-model="form.responseCode" placeholder="请输入HTTP状态码" />
        </el-form-item>
        <el-form-item label="是否成功 (0-失败, 1-成功)" prop="success">
          <el-input v-model="form.success" placeholder="请输入是否成功 (0-失败, 1-成功)" />
        </el-form-item>
        <el-form-item label="错误信息" prop="errorMessage">
            <el-input v-model="form.errorMessage" type="textarea" placeholder="请输入内容" />
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

<script setup name="OrderLog" lang="ts">
import { listOrderLog, getOrderLog, delOrderLog, addOrderLog, updateOrderLog } from '@/api/biz/orderLog';
import { OrderLogVO, OrderLogQuery, OrderLogForm } from '@/api/biz/orderLog/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const orderLogList = ref<OrderLogVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const orderLogFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: OrderLogForm = {
  id: undefined,
  orderId: undefined,
  externalOrderId: undefined,
  systemSource: undefined,
  interfaceType: undefined,
  direction: undefined,
  requestTime: undefined,
  responseTime: undefined,
  durationMs: undefined,
  requestBody: undefined,
  responseBody: undefined,
  responseCode: undefined,
  success: undefined,
  errorMessage: undefined,
  remark: undefined,
}
const data = reactive<PageData<OrderLogForm, OrderLogQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    orderId: undefined,
    externalOrderId: undefined,
    systemSource: undefined,
    interfaceType: undefined,
    direction: undefined,
    requestTime: undefined,
    responseTime: undefined,
    durationMs: undefined,
    requestBody: undefined,
    responseBody: undefined,
    responseCode: undefined,
    success: undefined,
    errorMessage: undefined,
    params: {
    }
  },
  rules: {
    orderId: [
      { required: true, message: "内部订单号不能为空", trigger: "blur" }
    ],
    externalOrderId: [
      { required: true, message: "外部系统订单号不能为空", trigger: "blur" }
    ],
    responseTime: [
      { required: true, message: "响应时间(精确到毫秒)不能为空", trigger: "blur" }
    ],
    durationMs: [
      { required: true, message: "请求处理时长(毫秒)不能为空", trigger: "blur" }
    ],
    requestBody: [
      { required: true, message: "请求内容不能为空", trigger: "blur" }
    ],
    responseBody: [
      { required: true, message: "响应内容不能为空", trigger: "blur" }
    ],
    responseCode: [
      { required: true, message: "HTTP状态码不能为空", trigger: "blur" }
    ],
    success: [
      { required: true, message: "是否成功 (0-失败, 1-成功)不能为空", trigger: "blur" }
    ],
    errorMessage: [
      { required: true, message: "错误信息不能为空", trigger: "blur" }
    ],
    remark: [
      { required: true, message: "备注不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询外部订单交互日志列表 */
const getList = async () => {
  loading.value = true;
  const res = await listOrderLog(queryParams.value);
  orderLogList.value = res.rows;
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
  orderLogFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: OrderLogVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加外部订单交互日志";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: OrderLogVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getOrderLog(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改外部订单交互日志";
}

/** 提交按钮 */
const submitForm = () => {
  orderLogFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateOrderLog(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addOrderLog(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: OrderLogVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除外部订单交互日志编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delOrderLog(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('biz/orderLog/export', {
    ...queryParams.value
  }, `orderLog_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
