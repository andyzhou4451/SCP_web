<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="经营主体" prop="tenantId" v-if="tenantId === '000000'">
              <el-select v-model="queryParams.tenantId" placeholder="请选择经营主体" clearable @change="handleQuery">
                <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.companyName" :value="item.tenantId" />
              </el-select>
            </el-form-item>
            <el-form-item label="订单号" prop="orderNo">
              <el-input v-model="queryParams.orderNo" placeholder="订单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="原始单号" prop="originalOrderNo">
              <el-input v-model="queryParams.originalOrderNo" placeholder="请输入原始单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单日期" prop="createTime">
              <el-date-picker clearable v-model="queryParams.createTime" type="date" value-format="YYYY-MM-DD" placeholder="请选择订单日期" />
            </el-form-item>
            <el-form-item label="订单状态" prop="receiverName">
              <el-input v-model="queryParams.receiverName" placeholder="请选择订单状态" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="售后状态" prop="receiverName">
              <el-input v-model="queryParams.receiverName" placeholder="请选择售后状态" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="收货电话" prop="receiverMobile">
              <el-input v-model="queryParams.receiverMobile" placeholder="请输入收货电话" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="仓库" prop="warehouseId">
              <el-input v-model="queryParams.warehouseId" placeholder="请选择仓库" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="销售渠道" prop="saleChannelId">
              <el-input v-model="queryParams.saleChannelId" placeholder="请选择销售渠道" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="销售店铺" prop="saleShopepName">
              <el-input v-model="queryParams.saleShopepName" placeholder="请输入销售店铺" clearable @keyup.enter="handleQuery" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button type="primary" icon="Refresh" @click="resetQuery">重置</el-button>
              <el-button type="primary" icon="TopRight" @click="resetQuery">批量发货</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <el-table v-loading="loading" border :data="orderList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column v-if="tenantId === '000000'" label="经营主体" align="center" prop="tenantId" />
        <el-table-column label="订单号" align="center" prop="orderNo" />
        <el-table-column label="原始单号" align="center" prop="originalOrderNo" />
        <el-table-column label="订单日期" align="center" prop="createTime" />
        <el-table-column label="订单状态" align="center" prop="saleStatus" />
        <el-table-column label="售后状态" align="center" prop="afterSalesStatus" />
        <el-table-column label="收货电话" align="center" prop="receiverMobile" />
        <el-table-column label="收货人" align="center" prop="receiverName" />
        <el-table-column label="收货地址" align="center" prop="receiverAddress" />
        <el-table-column label="仓库" align="center" prop="warehouseName" />
        <el-table-column label="销售渠道" align="center" prop="saleChannelName" />
        <el-table-column label="店铺名称" align="center" prop="saleShoppeName" />
        <el-table-column label="订单金额" align="center" prop="orderPrice" />
        <el-table-column label="运费" align="center" prop="shippingFee" />
        <el-table-column label="优惠" align="center" prop="discountFee" />
        <el-table-column label="实付金额" align="center" prop="paidPrice" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="详情" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['biz:order:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="发货" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['biz:order:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="查看物流" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['biz:order:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改销售订单对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="orderFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="系统订单号(拆单后生成)" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入系统订单号(拆单后生成)" />
        </el-form-item>
        <el-form-item label="原始订单号" prop="originalOrderNo">
          <el-input v-model="form.originalOrderNo" placeholder="请输入原始订单号" />
        </el-form-item>
        <el-form-item label="仓库ID" prop="warehouseId">
          <el-input v-model="form.warehouseId" placeholder="请输入仓库ID" />
        </el-form-item>
        <el-form-item label="仓库名称" prop="warehouseName">
          <el-input v-model="form.warehouseName" placeholder="请输入仓库名称" />
        </el-form-item>
        <el-form-item label="收货人姓名" prop="receiverName">
          <el-input v-model="form.receiverName" placeholder="请输入收货人姓名" />
        </el-form-item>
        <el-form-item label="收货电话" prop="receiverMobile">
          <el-input v-model="form.receiverMobile" placeholder="请输入收货电话" />
        </el-form-item>
        <el-form-item label="收货地址" prop="receiverAddress">
          <el-input v-model="form.receiverAddress" placeholder="请输入收货地址" />
        </el-form-item>
        <el-form-item label="销售渠道id" prop="saleChannelId">
          <el-input v-model="form.saleChannelId" placeholder="请输入销售渠道id" />
        </el-form-item>
        <el-form-item label="销售渠道名称" prop="saleChannelName">
          <el-input v-model="form.saleChannelName" placeholder="请输入销售渠道名称" />
        </el-form-item>
        <el-form-item label="销售店铺ID" prop="saleShoppeId">
          <el-input v-model="form.saleShoppeId" placeholder="请输入销售店铺ID" />
        </el-form-item>
        <el-form-item label="销售店铺名称" prop="saleShopepName">
          <el-input v-model="form.saleShopepName" placeholder="请输入销售店铺名称" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="拆分后订单金额" prop="orderPrice">
          <el-input v-model="form.orderPrice" placeholder="请输入拆分后订单金额" />
        </el-form-item>
        <el-form-item label="拆分后运费" prop="shippingFee">
          <el-input v-model="form.shippingFee" placeholder="请输入拆分后运费" />
        </el-form-item>
        <el-form-item label="拆分后优惠金额" prop="discountFee">
          <el-input v-model="form.discountFee" placeholder="请输入拆分后优惠金额" />
        </el-form-item>
        <el-form-item label="拆分后实付金额" prop="paidPrice">
          <el-input v-model="form.paidPrice" placeholder="请输入拆分后实付金额" />
        </el-form-item>
        <el-form-item label="支付方式" prop="paymentMethod">
          <el-input v-model="form.paymentMethod" placeholder="请输入支付方式" />
        </el-form-item>
        <el-form-item label="支付时间" prop="paymentTime">
          <el-date-picker clearable v-model="form.paymentTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择支付时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发货时间" prop="shippingTime">
          <el-date-picker clearable v-model="form.shippingTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择发货时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="取消时间" prop="cancelTime">
          <el-date-picker clearable v-model="form.cancelTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择取消时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="完成时间" prop="finishTime">
          <el-date-picker clearable v-model="form.finishTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择完成时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单备注" prop="remark">
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

<script setup name="Order" lang="ts">
import { listOrder, getOrder, delOrder, addOrder, updateOrder } from '@/api/biz/order';
import { OrderVO, OrderQuery, OrderForm } from '@/api/biz/order/types';
import { useUserStore } from '@/store/modules/user';
import { listAllTenant } from '@/api/system/tenant';
import { TenantVO } from '@/api/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const orderList = ref<OrderVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const tenantList = ref<TenantVO[]>([]);

const queryFormRef = ref<ElFormInstance>();
const orderFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const userStore = useUserStore();
const { tenantId, userId } = storeToRefs(userStore);

const initFormData: OrderForm = {
  id: undefined,
  orderNo: undefined,
  originalOrderNo: undefined,
  warehouseId: undefined,
  warehouseName: undefined,
  receiverName: undefined,
  receiverMobile: undefined,
  receiverAddress: undefined,
  saleChannelId: undefined,
  saleChannelName: undefined,
  saleShoppeId: undefined,
  saleShopepName: undefined,
  userId: undefined,
  saleStatus: undefined,
  afterSalesStatus: undefined,
  orderPrice: undefined,
  shippingFee: undefined,
  discountFee: undefined,
  paidPrice: undefined,
  paymentMethod: undefined,
  paymentTime: undefined,
  shippingTime: undefined,
  cancelTime: undefined,
  finishTime: undefined,
  remark: undefined
};
const data = reactive<PageData<OrderForm, OrderQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    tenantId: undefined,
    orderNo: undefined,
    originalOrderNo: undefined,
    warehouseId: undefined,
    warehouseName: undefined,
    receiverName: undefined,
    receiverMobile: undefined,
    receiverAddress: undefined,
    saleChannelId: undefined,
    saleChannelName: undefined,
    saleShoppeId: undefined,
    saleShopepName: undefined,
    userId: undefined,
    saleStatus: undefined,
    afterSalesStatus: undefined,
    orderPrice: undefined,
    shippingFee: undefined,
    discountFee: undefined,
    paidPrice: undefined,
    paymentMethod: undefined,
    paymentTime: undefined,
    shippingTime: undefined,
    cancelTime: undefined,
    finishTime: undefined,
    createTime: undefined,
    params: {}
  },
  rules: {
    userId: [{ required: true, message: '用户ID不能为空', trigger: 'blur' }],
    afterSalesStatus: [{ required: true, message: '售后状态不能为空', trigger: 'change' }],
    paymentMethod: [{ required: true, message: '支付方式不能为空', trigger: 'blur' }],
    paymentTime: [{ required: true, message: '支付时间不能为空', trigger: 'blur' }],
    shippingTime: [{ required: true, message: '发货时间不能为空', trigger: 'blur' }],
    cancelTime: [{ required: true, message: '取消时间不能为空', trigger: 'blur' }],
    finishTime: [{ required: true, message: '完成时间不能为空', trigger: 'blur' }],
    remark: [{ required: true, message: '订单备注不能为空', trigger: 'blur' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询销售订单列表 */
const getList = async () => {
  loading.value = true;
  const res = await listOrder(queryParams.value);
  orderList.value = res.rows;
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
  orderFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: OrderVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加销售订单';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: OrderVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getOrder(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改销售订单';
};

/** 提交按钮 */
const submitForm = () => {
  orderFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateOrder(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addOrder(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: OrderVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除销售订单编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delOrder(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'biz/order/export',
    {
      ...queryParams.value
    },
    `order_${new Date().getTime()}.xlsx`
  );
};

const getAllTenantList = async () => {
  const res = await listAllTenant();
  tenantList.value = res;
};

onMounted(() => {
  getList();
  getAllTenantList();
});
</script>
