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
              <el-input v-model="queryParams.orderNo" placeholder="请输入订单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单日期" prop="createTime">
              <el-date-picker clearable v-model="queryParams.createTime" type="date" value-format="YYYY-MM-DD" placeholder="请选择订单日期" />
            </el-form-item>
            <el-form-item label="订单状态" prop="spuName">
              <el-input v-model="queryParams.spuName" placeholder="请选择订单状态" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="售后状态" prop="spuId">
              <el-input v-model="queryParams.spuId" placeholder="请输入SPU ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="收货电话" prop="spuId">
              <el-input v-model="queryParams.spuId" placeholder="请输入SPU ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="出库仓库" prop="warehouseId">
              <el-input v-model="queryParams.warehouseId" placeholder="请输入出库仓库" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单渠道" prop="warehouseId">
              <el-input v-model="queryParams.warehouseId" placeholder="请输入订单渠道" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="店铺名称" prop="spuId">
              <el-input v-model="queryParams.spuId" placeholder="请输入SPU ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button type="primary" icon="Refresh" @click="resetQuery">重置</el-button>
              <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['biz:orderDetail:export']">导出 </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <el-table v-loading="loading" border :data="orderDetailList" @selection-change="handleSelectionChange">
        <el-table-column label="订单号" align="center" prop="orderNo" />
        <el-table-column label="订单日期" align="center" prop="createTime" />
        <el-table-column label="订单状态" align="center" prop="spuName" />
        <el-table-column label="售后状态" align="center" prop="skuId" />
        <el-table-column label="收货电话" align="center" prop="skuName" />
        <el-table-column label="收货人" align="center" prop="skuAttr" />
        <el-table-column label="收货地址" align="center" prop="specification" />
        <el-table-column label="仓库" align="center" prop="classId" />
        <el-table-column label="订单渠道" align="center" prop="brandId" />
        <el-table-column label="店铺名称" align="center" prop="supplierId" />
        <el-table-column label="实付金额" align="center" prop="payAmount" />
        <el-table-column label="优惠金额" align="center" prop="discountAmount" />
        <el-table-column label="商品名称" align="center" prop="skuName" />
        <el-table-column label="商品编码" align="center" prop="skuName" />
        <el-table-column label="商品规格" align="center" prop="skuName" />
        <el-table-column label="商品售价" align="center" prop="skuName" />
        <el-table-column label="商品数量" align="center" prop="quantity" />
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改订单明细对话框 -->
    <!--    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>-->
    <!--      <el-form ref="orderDetailFormRef" :model="form" :rules="rules" label-width="80px">-->
    <!--        <el-form-item label="订单ID(关联拆单后订单)" prop="orderNo">-->
    <!--          <el-input v-model="form.orderNo" placeholder="请输入订单ID(关联拆单后订单)" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="SPU ID" prop="spuId">-->
    <!--          <el-input v-model="form.spuId" placeholder="请输入SPU ID" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="SPU名称" prop="spuName">-->
    <!--          <el-input v-model="form.spuName" placeholder="请输入SPU名称" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="商品编码ID" prop="skuId">-->
    <!--          <el-input v-model="form.skuId" placeholder="请输入商品编码ID" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="商品名称" prop="skuName">-->
    <!--          <el-input v-model="form.skuName" placeholder="请输入商品名称" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="商品规格" prop="skuAttr">-->
    <!--          <el-input v-model="form.skuAttr" placeholder="请输入商品规格" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="商品规格" prop="specification">-->
    <!--          <el-input v-model="form.specification" placeholder="请输入商品规格" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="商品分类ID" prop="classId">-->
    <!--          <el-input v-model="form.classId" placeholder="请输入商品分类ID" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="品牌ID" prop="brandId">-->
    <!--          <el-input v-model="form.brandId" placeholder="请输入品牌ID" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="供应商ID" prop="supplierId">-->
    <!--          <el-input v-model="form.supplierId" placeholder="请输入供应商ID" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="出库仓库ID" prop="warehouseId">-->
    <!--          <el-input v-model="form.warehouseId" placeholder="请输入出库仓库ID" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="商品数量" prop="quantity">-->
    <!--          <el-input v-model="form.quantity" placeholder="请输入商品数量" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="已退货数量" prop="returnQuantity">-->
    <!--          <el-input v-model="form.returnQuantity" placeholder="请输入已退货数量" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="商品单价" prop="salePriceUnit">-->
    <!--          <el-input v-model="form.salePriceUnit" placeholder="请输入商品单价" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="商品总价" prop="totalPrice">-->
    <!--          <el-input v-model="form.totalPrice" placeholder="请输入商品总价" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="优惠金额" prop="discountAmount">-->
    <!--          <el-input v-model="form.discountAmount" placeholder="请输入优惠金额" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="实付金额" prop="payAmount">-->
    <!--          <el-input v-model="form.payAmount" placeholder="请输入实付金额" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="计价方式(计重/计件)" prop="priceMethod">-->
    <!--          <el-input v-model="form.priceMethod" placeholder="请输入计价方式(计重/计件)" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="商品重量(克重商品使用)" prop="weight">-->
    <!--          <el-input v-model="form.weight" placeholder="请输入商品重量(克重商品使用)" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="工费(克重商品使用)" prop="processingFee">-->
    <!--          <el-input v-model="form.processingFee" placeholder="请输入工费(克重商品使用)" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="进价(供应商结算用)" prop="purchasePrice">-->
    <!--          <el-input v-model="form.purchasePrice" placeholder="请输入进价(供应商结算用)" />-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      <template #footer>-->
    <!--        <div class="dialog-footer">-->
    <!--          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>-->
    <!--          <el-button @click="cancel">取 消</el-button>-->
    <!--        </div>-->
    <!--      </template>-->
    <!--    </el-dialog>-->
  </div>
</template>

<script setup name="OrderDetail" lang="ts">
import { listOrderDetail, getOrderDetail, delOrderDetail, addOrderDetail, updateOrderDetail } from '@/api/biz/orderDetail';
import { OrderDetailVO, OrderDetailQuery, OrderDetailForm } from '@/api/biz/orderDetail/types';
import { listAllTenant } from '@/api/system/tenant';
import { TenantVO } from '@/api/types';
import { useUserStore } from '@/store/modules/user';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const orderDetailList = ref<OrderDetailVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const tenantList = ref<TenantVO[]>([]);

const queryFormRef = ref<ElFormInstance>();
const orderDetailFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const userStore = useUserStore();
const { tenantId, userId } = storeToRefs(userStore);

const initFormData: OrderDetailForm = {
  id: undefined,
  orderNo: undefined,
  spuId: undefined,
  spuName: undefined,
  skuId: undefined,
  skuName: undefined,
  skuAttr: undefined,
  specification: undefined,
  classId: undefined,
  brandId: undefined,
  supplierId: undefined,
  warehouseId: undefined,
  quantity: undefined,
  returnQuantity: undefined,
  salePriceUnit: undefined,
  totalPrice: undefined,
  discountAmount: undefined,
  payAmount: undefined,
  priceMethod: undefined,
  weight: undefined,
  processingFee: undefined,
  purchasePrice: undefined
};
const data = reactive<PageData<OrderDetailForm, OrderDetailQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    tenantId: undefined,
    orderNo: undefined,
    spuId: undefined,
    spuName: undefined,
    skuId: undefined,
    skuName: undefined,
    skuAttr: undefined,
    specification: undefined,
    classId: undefined,
    brandId: undefined,
    supplierId: undefined,
    warehouseId: undefined,
    quantity: undefined,
    returnQuantity: undefined,
    salePriceUnit: undefined,
    totalPrice: undefined,
    discountAmount: undefined,
    payAmount: undefined,
    priceMethod: undefined,
    weight: undefined,
    processingFee: undefined,
    purchasePrice: undefined,
    createTime: undefined,
    params: {}
  },
  rules: {
    classId: [{ required: true, message: '商品分类ID不能为空', trigger: 'blur' }],
    brandId: [{ required: true, message: '品牌ID不能为空', trigger: 'blur' }],
    supplierId: [{ required: true, message: '供应商ID不能为空', trigger: 'blur' }],
    warehouseId: [{ required: true, message: '出库仓库ID不能为空', trigger: 'blur' }],
    returnQuantity: [{ required: true, message: '已退货数量不能为空', trigger: 'blur' }],
    weight: [{ required: true, message: '商品重量(克重商品使用)不能为空', trigger: 'blur' }],
    processingFee: [{ required: true, message: '工费(克重商品使用)不能为空', trigger: 'blur' }],
    purchasePrice: [{ required: true, message: '进价(供应商结算用)不能为空', trigger: 'blur' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询订单明细列表 */
const getList = async () => {
  loading.value = true;
  const res = await listOrderDetail(queryParams.value);
  orderDetailList.value = res.rows;
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
  orderDetailFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: OrderDetailVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加订单明细';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: OrderDetailVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getOrderDetail(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改订单明细';
};

/** 提交按钮 */
const submitForm = () => {
  orderDetailFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateOrderDetail(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addOrderDetail(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: OrderDetailVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除订单明细编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delOrderDetail(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'biz/orderDetail/export',
    {
      ...queryParams.value
    },
    `orderDetail_${new Date().getTime()}.xlsx`
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
