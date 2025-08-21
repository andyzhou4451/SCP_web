<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="售后单号" prop="afterSalesNo">
              <el-input v-model="queryParams.afterSalesNo" placeholder="请输入售后单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单号" prop="originalSalesOrderNo">
              <el-input v-model="queryParams.originalSalesOrderNo" placeholder="请输入订单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="原始售后单号" prop="originalAfterSalesNo">
              <el-input v-model="queryParams.originalAfterSalesNo" placeholder="请输入原始售后单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="售后日期" prop="applyTime">
              <el-date-picker clearable v-model="queryParams.applyTime" type="date" value-format="YYYY-MM-DD" placeholder="请选择售后日期" />
            </el-form-item>
            <el-form-item label="售后状态" prop="orderId">
              <el-input v-model="queryParams.orderId" placeholder="请输入关联订单ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="售后手机号" prop="afterSalesMobile">
              <el-input v-model="queryParams.afterSalesMobile" placeholder="请输入售后手机号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="仓库" prop="afterSalesName">
              <el-input v-model="queryParams.afterSalesName" placeholder="请输入售后人" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="销售渠道" prop="saleChannelId">
              <el-input v-model="queryParams.saleChannelId" placeholder="请输入销售渠道ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="店铺名称" prop="saleShoppeName">
              <el-input v-model="queryParams.saleShoppeName" placeholder="请输入店铺名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
              <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['biz:afterSalesOrder:export']">导出 </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <el-table v-loading="loading" border :data="afterSalesOrderList" @selection-change="handleSelectionChange">
        <el-table-column label="售后单号" align="center" prop="afterSalesNo" />
        <el-table-column label="原始售后单号" align="center" prop="originalAfterSalesNo" />
        <el-table-column label="订单号" align="center" prop="orderId" />
        <el-table-column label="售后日期" align="center" prop="applyTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.applyTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="售后状态" align="center" prop="afterSalesStatus" />
        <el-table-column label="售后电话" align="center" prop="afterSalesMobile" />
        <el-table-column label="退货仓库ID" align="center" prop="warehouseId" />
        <el-table-column label="销售渠道" align="center" prop="saleChannelName" />
        <el-table-column label="店铺名称" align="center" prop="saleShoppeName" />
        <el-table-column label="实退金额" align="center" prop="afterSalesPrice" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-button link type="primary" icon="Edit" @click="checkInfo(scope.row)" v-hasPermi="['biz:afterSalesOrder:edit']">详情</el-button>
            <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['biz:afterSalesOrder:remove']"
              >审核
            </el-button>
            <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['biz:afterSalesOrder:remove']"
              >查看物流
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>

    <el-dialog title="售后详情" width="900px" :model-value="visible" @close="handleClose">
      <!-- 订单信息 -->
      <el-divider content-position="left">订单信息</el-divider>
      <el-table :data="orderInfo" border size="small">
        <el-table-column prop="label" label="字段" width="140" />
        <el-table-column prop="value" label="内容" />
      </el-table>

      <!-- 售后商品 -->
      <el-divider content-position="left">售后商品</el-divider>
      <el-table :data="goods" border size="small">
        <el-table-column prop="productName" label="商品名称" width="140" />
        <el-table-column prop="productCode" label="商品编码" width="120" />
        <el-table-column prop="spec" label="商品规格" width="100" />
        <el-table-column prop="skuCode" label="sku编码" width="120" />
        <el-table-column prop="quantity" label="商品数量" width="90" />
        <el-table-column prop="refundAmount" label="实退金额" width="90" />
        <el-table-column prop="brand" label="商品品牌" width="100" />
        <el-table-column prop="category" label="商品分类" width="100" />
        <el-table-column prop="shipTime" label="发货时间" width="160" />
      </el-table>

      <!-- 物流信息 -->
      <el-divider content-position="left">物流信息</el-divider>
      <el-table :data="logistics" border size="small">
        <el-table-column prop="skuName" label="商品sku名称" />
        <el-table-column prop="quantity" label="商品数量" />
        <el-table-column prop="express" label="快递公司" />
        <el-table-column prop="trackingNo" label="快递单号" />
      </el-table>

      <!-- 售后记录 -->
      <el-divider content-position="left">售后记录</el-divider>
      <el-table :data="records" border size="small">
        <el-table-column prop="operator" label="操作人" />
        <el-table-column prop="action" label="操作" />
        <el-table-column prop="time" label="操作时间" />
        <el-table-column prop="remark" label="备注" />
      </el-table>

      <!-- 底部按钮 -->
      <template #footer>
        <el-button @click="handleClose">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="AfterSalesOrder" lang="ts">
import { listAfterSalesOrder, getAfterSalesOrder, delAfterSalesOrder, addAfterSalesOrder, updateAfterSalesOrder } from '@/api/biz/afterSalesOrder';
import { AfterSalesOrderVO, AfterSalesOrderQuery, AfterSalesOrderForm } from '@/api/biz/afterSalesOrder/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const emit = defineEmits(['update:visible']);
const afterSalesOrderList = ref<AfterSalesOrderVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const visible = ref(false);

const queryFormRef = ref<ElFormInstance>();
const afterSalesOrderFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: AfterSalesOrderForm = {
  id: undefined,
  afterSalesNo: undefined,
  originalAfterSalesNo: undefined,
  originalSalesOrderNo: undefined,
  orderId: undefined,
  afterSalesType: undefined,
  afterSalesStatus: undefined,
  afterSalesMobile: undefined,
  afterSalesName: undefined,
  afterSalesPrice: undefined,
  warehouseId: undefined,
  saleChannelId: undefined,
  saleChannelName: undefined,
  saleShoppeId: undefined,
  saleShoppeName: undefined,
  applyTime: undefined,
  auditReturnTime: undefined,
  returnAuditor: undefined,
  auditRefundTime: undefined,
  refundAuditor: undefined,
  reason: undefined,
  remark: undefined
};
const data = reactive<PageData<AfterSalesOrderForm, AfterSalesOrderQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    afterSalesNo: undefined,
    originalAfterSalesNo: undefined,
    originalSalesOrderNo: undefined,
    orderId: undefined,
    afterSalesType: undefined,
    afterSalesStatus: undefined,
    afterSalesMobile: undefined,
    afterSalesName: undefined,
    afterSalesPrice: undefined,
    warehouseId: undefined,
    saleChannelId: undefined,
    saleChannelName: undefined,
    saleShoppeId: undefined,
    saleShoppeName: undefined,
    applyTime: undefined,
    auditReturnTime: undefined,
    returnAuditor: undefined,
    auditRefundTime: undefined,
    refundAuditor: undefined,
    reason: undefined,
    params: {}
  },
  rules: {}
});

/* 关闭事件 */
const handleClose = () => emit('update:visible', false);

const { queryParams, form, rules } = toRefs(data);

const rawData = {
  afterSaleNo: '20000001',
  originalAfterSaleNo: '200000001',
  orderNo: '10000001',
  originalOrderNo: '100000001',
  orderStatus: '待收货',
  afterSaleStatus: '退货待收货',
  orderDate: '2025-04-18 13:53:03',
  afterSaleDate: '2025-04-19 13:53:03',
  channel: '鲁商生活',
  store: '银座黄金',
  warehouse: '金小宇仓库',
  afterSalePhone: '15665258896',
  refundAmount: 3200,
  product: {
    productName: '金卡',
    productCode: 'JDZ11110',
    spec: '1g',
    skuCode: 'JDKKKL',
    quantity: 4,
    refundAmount: 3200,
    brand: '悦豪',
    category: '999.99足金',
    shipTime: '2025-04-18 13:53:03'
  },
  logistics: {
    skuName: '金卡1g',
    quantity: 4,
    express: '京东物流',
    trackingNo: 'JD1222200000'
  },
  record: {
    operator: '顾客',
    action: '申请退货',
    time: '2025-04-19 13:53:03',
    remark: '不想要了'
  }
};

/* 把对象转成数组，方便 el-table 渲染 key-value */
const orderInfo = computed(() => [
  { label: '售后单号', value: rawData.afterSaleNo },
  { label: '原始售后单号', value: rawData.originalAfterSaleNo },
  { label: '订单号', value: rawData.orderNo },
  { label: '原始单号', value: rawData.originalOrderNo },
  { label: '订单状态', value: rawData.orderStatus },
  { label: '售后状态', value: rawData.afterSaleStatus },
  { label: '订单日期', value: rawData.orderDate },
  { label: '售后日期', value: rawData.afterSaleDate },
  { label: '渠道', value: rawData.channel },
  { label: '店铺', value: rawData.store },
  { label: '仓库', value: rawData.warehouse },
  { label: '售后电话', value: rawData.afterSalePhone },
  { label: '实退金额', value: rawData.refundAmount }
]);

/* 商品数组 */
const goods = computed(() => [rawData.product]);

/* 物流数组 */
const logistics = computed(() => [rawData.logistics]);

/* 售后记录数组 */
const records = computed(() => [rawData.record]);

/** 查询售后订单列表 */
const getList = async () => {
  loading.value = true;
  const res = await listAfterSalesOrder(queryParams.value);
  afterSalesOrderList.value = res.rows;
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
  afterSalesOrderFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: AfterSalesOrderVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 详情按钮操作 */
const checkInfo = async (row?: AfterSalesOrderVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getAfterSalesOrder(_id);
  Object.assign(form.value, res.data);
  visible.value = true;
  dialog.title = '售后订单详情';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: AfterSalesOrderVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getAfterSalesOrder(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改售后订单';
};

/** 提交按钮 */
const submitForm = () => {
  afterSalesOrderFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateAfterSalesOrder(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addAfterSalesOrder(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: AfterSalesOrderVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除售后订单编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delAfterSalesOrder(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'biz/afterSalesOrder/export',
    {
      ...queryParams.value
    },
    `afterSalesOrder_${new Date().getTime()}.xlsx`
  );
};

onMounted(() => {
  getList();
});
</script>
