<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="订单号" prop="orderNo">
              <el-input v-model="queryParams.orderNo" placeholder="请输入订单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="物流公司" prop="deliverCompany">
              <el-input v-model="queryParams.deliverCompany" placeholder="请输入物流公司" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="物流单号" prop="deliverNo">
              <el-input v-model="queryParams.deliverNo" placeholder="请输入物流单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="发货时间" prop="shippingTime">
              <el-date-picker clearable
                v-model="queryParams.shippingTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择发货时间"
              />
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
            <el-form-item label="收货人" prop="receiverName">
              <el-input v-model="queryParams.receiverName" placeholder="请输入收货人" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="收货电话" prop="receiverPhone">
              <el-input v-model="queryParams.receiverPhone" placeholder="请输入收货电话" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="收货地址" prop="receiverAddress">
              <el-input v-model="queryParams.receiverAddress" placeholder="请输入收货地址" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="发货时间" prop="deliverTime">
              <el-date-picker clearable
                v-model="queryParams.deliverTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择发货时间"
              />
            </el-form-item>
            <el-form-item label="签收时间" prop="signTime">
              <el-date-picker clearable
                v-model="queryParams.signTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择签收时间"
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['biz:shippingInfo:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['biz:shippingInfo:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['biz:shippingInfo:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['biz:shippingInfo:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="shippingInfoList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键ID" align="center" prop="id" v-if="true" />
        <el-table-column label="订单号" align="center" prop="orderNo" />
        <el-table-column label="物流公司" align="center" prop="deliverCompany" />
        <el-table-column label="物流单号" align="center" prop="deliverNo" />
        <el-table-column label="发货时间" align="center" prop="shippingTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.shippingTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="SKU ID" align="center" prop="skuId" />
        <el-table-column label="商品名称" align="center" prop="skuName" />
        <el-table-column label="商品规格" align="center" prop="skuAttr" />
        <el-table-column label="商品售后数量" align="center" prop="skuNum" />
        <el-table-column label="收货人" align="center" prop="receiverName" />
        <el-table-column label="收货电话" align="center" prop="receiverPhone" />
        <el-table-column label="收货地址" align="center" prop="receiverAddress" />
        <el-table-column label="发货时间" align="center" prop="deliverTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.deliverTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="签收时间" align="center" prop="signTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.signTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['biz:shippingInfo:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['biz:shippingInfo:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改物流信息对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="shippingInfoFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单号" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入订单号" />
        </el-form-item>
        <el-form-item label="物流公司" prop="deliverCompany">
          <el-input v-model="form.deliverCompany" placeholder="请输入物流公司" />
        </el-form-item>
        <el-form-item label="物流单号" prop="deliverNo">
          <el-input v-model="form.deliverNo" placeholder="请输入物流单号" />
        </el-form-item>
        <el-form-item label="发货时间" prop="shippingTime">
          <el-date-picker clearable
            v-model="form.shippingTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择发货时间">
          </el-date-picker>
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
        <el-form-item label="收货人" prop="receiverName">
          <el-input v-model="form.receiverName" placeholder="请输入收货人" />
        </el-form-item>
        <el-form-item label="收货电话" prop="receiverPhone">
          <el-input v-model="form.receiverPhone" placeholder="请输入收货电话" />
        </el-form-item>
        <el-form-item label="收货地址" prop="receiverAddress">
          <el-input v-model="form.receiverAddress" placeholder="请输入收货地址" />
        </el-form-item>
        <el-form-item label="发货时间" prop="deliverTime">
          <el-date-picker clearable
            v-model="form.deliverTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择发货时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签收时间" prop="signTime">
          <el-date-picker clearable
            v-model="form.signTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择签收时间">
          </el-date-picker>
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

<script setup name="ShippingInfo" lang="ts">
import { listShippingInfo, getShippingInfo, delShippingInfo, addShippingInfo, updateShippingInfo } from '@/api/biz/shippingInfo';
import { ShippingInfoVO, ShippingInfoQuery, ShippingInfoForm } from '@/api/biz/shippingInfo/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const shippingInfoList = ref<ShippingInfoVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const shippingInfoFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ShippingInfoForm = {
  id: undefined,
  orderNo: undefined,
  deliverCompany: undefined,
  deliverNo: undefined,
  shippingTime: undefined,
  skuId: undefined,
  skuName: undefined,
  skuAttr: undefined,
  skuNum: undefined,
  receiverName: undefined,
  receiverPhone: undefined,
  receiverAddress: undefined,
  deliverTime: undefined,
  signTime: undefined,
}
const data = reactive<PageData<ShippingInfoForm, ShippingInfoQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    orderNo: undefined,
    deliverCompany: undefined,
    deliverNo: undefined,
    shippingTime: undefined,
    skuId: undefined,
    skuName: undefined,
    skuAttr: undefined,
    skuNum: undefined,
    receiverName: undefined,
    receiverPhone: undefined,
    receiverAddress: undefined,
    deliverTime: undefined,
    signTime: undefined,
    params: {
    }
  },
  rules: {
    skuNum: [
      { required: true, message: "商品售后数量不能为空", trigger: "blur" }
    ],
    deliverTime: [
      { required: true, message: "发货时间不能为空", trigger: "blur" }
    ],
    signTime: [
      { required: true, message: "签收时间不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询物流信息列表 */
const getList = async () => {
  loading.value = true;
  const res = await listShippingInfo(queryParams.value);
  shippingInfoList.value = res.rows;
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
  shippingInfoFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ShippingInfoVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加物流信息";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ShippingInfoVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getShippingInfo(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改物流信息";
}

/** 提交按钮 */
const submitForm = () => {
  shippingInfoFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateShippingInfo(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addShippingInfo(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ShippingInfoVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除物流信息编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delShippingInfo(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('biz/shippingInfo/export', {
    ...queryParams.value
  }, `shippingInfo_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
