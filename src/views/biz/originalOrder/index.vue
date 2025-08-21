<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="原始订单号(渠道订单号)" prop="originalOrderNo">
              <el-input v-model="queryParams.originalOrderNo" placeholder="请输入原始订单号(渠道订单号)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="销售渠道(如:鲁商生活)" prop="saleChannelId">
              <el-input v-model="queryParams.saleChannelId" placeholder="请输入销售渠道(如:鲁商生活)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="店铺ID" prop="saleShoppeId">
              <el-input v-model="queryParams.saleShoppeId" placeholder="请输入店铺ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="店铺名称" prop="saleShoppeName">
              <el-input v-model="queryParams.saleShoppeName" placeholder="请输入店铺名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="用户ID" prop="userId">
              <el-input v-model="queryParams.userId" placeholder="请输入用户ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单日期" prop="orderDate">
              <el-date-picker clearable
                v-model="queryParams.orderDate"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择订单日期"
              />
            </el-form-item>
            <el-form-item label="收货人" prop="receiverName">
              <el-input v-model="queryParams.receiverName" placeholder="请输入收货人" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="收货电话" prop="receiverMobile">
              <el-input v-model="queryParams.receiverMobile" placeholder="请输入收货电话" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="收货地址" prop="receiverAddress">
              <el-input v-model="queryParams.receiverAddress" placeholder="请输入收货地址" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单总金额" prop="orderPrice">
              <el-input v-model="queryParams.orderPrice" placeholder="请输入订单总金额" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="运费金额" prop="shippingFee">
              <el-input v-model="queryParams.shippingFee" placeholder="请输入运费金额" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="优惠金额" prop="discountFee">
              <el-input v-model="queryParams.discountFee" placeholder="请输入优惠金额" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="实付金额(支付后填写)" prop="paidPrice">
              <el-input v-model="queryParams.paidPrice" placeholder="请输入实付金额(支付后填写)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="支付方式" prop="paymentMethod">
              <el-input v-model="queryParams.paymentMethod" placeholder="请输入支付方式" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="支付时间" prop="paymentTime">
              <el-date-picker clearable
                v-model="queryParams.paymentTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择支付时间"
              />
            </el-form-item>
            <el-form-item label="原始信息" prop="rawInfo">
              <el-input v-model="queryParams.rawInfo" placeholder="请输入原始信息" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['biz:originalOrder:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['biz:originalOrder:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['biz:originalOrder:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['biz:originalOrder:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="originalOrderList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键ID" align="center" prop="id" v-if="true" />
        <el-table-column label="原始订单号(渠道订单号)" align="center" prop="originalOrderNo" />
        <el-table-column label="销售渠道(如:鲁商生活)" align="center" prop="saleChannelId" />
        <el-table-column label="店铺ID" align="center" prop="saleShoppeId" />
        <el-table-column label="店铺名称" align="center" prop="saleShoppeName" />
        <el-table-column label="用户ID" align="center" prop="userId" />
        <el-table-column label="订单日期" align="center" prop="orderDate" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.orderDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center" prop="saleStatus" />
        <el-table-column label="售后状态" align="center" prop="afterSalesStatus" />
        <el-table-column label="收货人" align="center" prop="receiverName" />
        <el-table-column label="收货电话" align="center" prop="receiverMobile" />
        <el-table-column label="收货地址" align="center" prop="receiverAddress" />
        <el-table-column label="订单总金额" align="center" prop="orderPrice" />
        <el-table-column label="运费金额" align="center" prop="shippingFee" />
        <el-table-column label="优惠金额" align="center" prop="discountFee" />
        <el-table-column label="实付金额(支付后填写)" align="center" prop="paidPrice" />
        <el-table-column label="支付方式" align="center" prop="paymentMethod" />
        <el-table-column label="支付时间" align="center" prop="paymentTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.paymentTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单来源(APP/小程序/PC)" align="center" prop="sourceType" />
        <el-table-column label="配送方式(快递/自提)" align="center" prop="deliveryType" />
        <el-table-column label="订单备注" align="center" prop="remark" />
        <el-table-column label="原始信息" align="center" prop="rawInfo" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['biz:originalOrder:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['biz:originalOrder:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改原始销售订单对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="originalOrderFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="原始订单号(渠道订单号)" prop="originalOrderNo">
          <el-input v-model="form.originalOrderNo" placeholder="请输入原始订单号(渠道订单号)" />
        </el-form-item>
        <el-form-item label="销售渠道(如:鲁商生活)" prop="saleChannelId">
          <el-input v-model="form.saleChannelId" placeholder="请输入销售渠道(如:鲁商生活)" />
        </el-form-item>
        <el-form-item label="店铺ID" prop="saleShoppeId">
          <el-input v-model="form.saleShoppeId" placeholder="请输入店铺ID" />
        </el-form-item>
        <el-form-item label="店铺名称" prop="saleShoppeName">
          <el-input v-model="form.saleShoppeName" placeholder="请输入店铺名称" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="订单日期" prop="orderDate">
          <el-date-picker clearable
            v-model="form.orderDate"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择订单日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="收货人" prop="receiverName">
          <el-input v-model="form.receiverName" placeholder="请输入收货人" />
        </el-form-item>
        <el-form-item label="收货电话" prop="receiverMobile">
          <el-input v-model="form.receiverMobile" placeholder="请输入收货电话" />
        </el-form-item>
        <el-form-item label="收货地址" prop="receiverAddress">
          <el-input v-model="form.receiverAddress" placeholder="请输入收货地址" />
        </el-form-item>
        <el-form-item label="订单总金额" prop="orderPrice">
          <el-input v-model="form.orderPrice" placeholder="请输入订单总金额" />
        </el-form-item>
        <el-form-item label="运费金额" prop="shippingFee">
          <el-input v-model="form.shippingFee" placeholder="请输入运费金额" />
        </el-form-item>
        <el-form-item label="优惠金额" prop="discountFee">
          <el-input v-model="form.discountFee" placeholder="请输入优惠金额" />
        </el-form-item>
        <el-form-item label="实付金额(支付后填写)" prop="paidPrice">
          <el-input v-model="form.paidPrice" placeholder="请输入实付金额(支付后填写)" />
        </el-form-item>
        <el-form-item label="支付方式" prop="paymentMethod">
          <el-input v-model="form.paymentMethod" placeholder="请输入支付方式" />
        </el-form-item>
        <el-form-item label="支付时间" prop="paymentTime">
          <el-date-picker clearable
            v-model="form.paymentTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择支付时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单备注" prop="remark">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="原始信息" prop="rawInfo">
            <el-input v-model="form.rawInfo" type="textarea" placeholder="请输入内容" />
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

<script setup name="OriginalOrder" lang="ts">
import { listOriginalOrder, getOriginalOrder, delOriginalOrder, addOriginalOrder, updateOriginalOrder } from '@/api/biz/originalOrder';
import { OriginalOrderVO, OriginalOrderQuery, OriginalOrderForm } from '@/api/biz/originalOrder/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const originalOrderList = ref<OriginalOrderVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const originalOrderFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: OriginalOrderForm = {
  id: undefined,
  originalOrderNo: undefined,
  saleChannelId: undefined,
  saleShoppeId: undefined,
  saleShoppeName: undefined,
  userId: undefined,
  orderDate: undefined,
  saleStatus: undefined,
  afterSalesStatus: undefined,
  receiverName: undefined,
  receiverMobile: undefined,
  receiverAddress: undefined,
  orderPrice: undefined,
  shippingFee: undefined,
  discountFee: undefined,
  paidPrice: undefined,
  paymentMethod: undefined,
  paymentTime: undefined,
  sourceType: undefined,
  deliveryType: undefined,
  remark: undefined,
  rawInfo: undefined,
}
const data = reactive<PageData<OriginalOrderForm, OriginalOrderQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    originalOrderNo: undefined,
    saleChannelId: undefined,
    saleShoppeId: undefined,
    saleShoppeName: undefined,
    userId: undefined,
    orderDate: undefined,
    saleStatus: undefined,
    afterSalesStatus: undefined,
    receiverName: undefined,
    receiverMobile: undefined,
    receiverAddress: undefined,
    orderPrice: undefined,
    shippingFee: undefined,
    discountFee: undefined,
    paidPrice: undefined,
    paymentMethod: undefined,
    paymentTime: undefined,
    sourceType: undefined,
    deliveryType: undefined,
    rawInfo: undefined,
    params: {
    }
  },
  rules: {
    userId: [
      { required: true, message: "用户ID不能为空", trigger: "blur" }
    ],
    afterSalesStatus: [
      { required: true, message: "售后状态不能为空", trigger: "change" }
    ],
    paidPrice: [
      { required: true, message: "实付金额(支付后填写)不能为空", trigger: "blur" }
    ],
    paymentMethod: [
      { required: true, message: "支付方式不能为空", trigger: "blur" }
    ],
    paymentTime: [
      { required: true, message: "支付时间不能为空", trigger: "blur" }
    ],
    sourceType: [
      { required: true, message: "订单来源(APP/小程序/PC)不能为空", trigger: "change" }
    ],
    deliveryType: [
      { required: true, message: "配送方式(快递/自提)不能为空", trigger: "change" }
    ],
    remark: [
      { required: true, message: "订单备注不能为空", trigger: "blur" }
    ],
    rawInfo: [
      { required: true, message: "原始信息不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询原始销售订单列表 */
const getList = async () => {
  loading.value = true;
  const res = await listOriginalOrder(queryParams.value);
  originalOrderList.value = res.rows;
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
  originalOrderFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: OriginalOrderVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加原始销售订单";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: OriginalOrderVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getOriginalOrder(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改原始销售订单";
}

/** 提交按钮 */
const submitForm = () => {
  originalOrderFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateOriginalOrder(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addOriginalOrder(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: OriginalOrderVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除原始销售订单编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delOriginalOrder(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('biz/originalOrder/export', {
    ...queryParams.value
  }, `originalOrder_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
