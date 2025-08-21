<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="供应商名称" prop="supplierName">
              <el-input v-model="queryParams.supplierName" placeholder="请输入供应商名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="供应商编码" prop="supplierCode">
              <el-input v-model="queryParams.supplierCode" placeholder="请输入供应商编码" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['biz:supplierInfo:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['biz:supplierInfo:edit']"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['biz:supplierInfo:remove']"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['biz:supplierInfo:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="supplierInfoList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="供应商名称" align="center" prop="supplierName" />
        <el-table-column label="供应商编码" align="center" prop="supplierCode" />
        <el-table-column label="供应商类型" align="center" prop="supplierType" />
        <el-table-column label="联系人" align="center" prop="contactorName" />
        <el-table-column label="联系人手机号" align="center" prop="contactorMobile" />
        <el-table-column label="供应商地址" align="center" prop="address" />
        <el-table-column label="仓库" align="center" prop="wareHouseNames" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="{ row }">
            <el-button link type="primary" @click="openRuleDialog(row)">规则设置</el-button>
            <el-button link type="primary" @click="handleUpdate(row)">编辑</el-button>
            <el-button link type="primary" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改供应商信息对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="supplierInfoFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="supplierName">
          <el-input v-model="form.supplierName" placeholder="请输入供应商名称" />
        </el-form-item>
        <el-form-item label="类型" prop="supplierType">
          <el-select v-model="form.supplierType" placeholder="请选择类型">
            <el-option label="系统互通供应商" :value="1" />
            <el-option label="传统供应商" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="外部编码" prop="externalCode">
          <el-input v-model="form.externalCode" placeholder="请输入外部供应商编码" maxlength="20" />
        </el-form-item>
        <el-form-item label="联系人" prop="contactorName">
          <el-input v-model="form.contactorName" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="电话" prop="contactorMobile">
          <el-input v-model="form.contactorMobile" placeholder="请输入联系人电话" />
        </el-form-item>
        <el-form-item label="省市区" prop="province">
          <div class="address-row">
            <el-select v-model="form.province" placeholder="选择省" @change="onProvinceChange">
              <el-option v-for="p in provinces" :key="p.code" :label="p.name" :value="p.code" />
            </el-select>
            <el-select v-model="form.city" placeholder="选择市" @change="onCityChange">
              <el-option v-for="c in cities" :key="c.code" :label="c.name" :value="c.code" />
            </el-select>
            <el-select v-model="form.district" placeholder="选择区/县">
              <el-option v-for="d in districts" :key="d.code" :label="d.name" :value="d.code" />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入详细地址" maxlength="100" />
        </el-form-item>
        <el-form-item label="仓库" prop="wareHouseIds">
          <el-select v-model="form.wareHouseIds" :multiple="form.supplierType === 2" placeholder="请选择仓库">
            <el-option v-for="wh in warehouseOptions" :key="wh.id" :label="wh.warehouseName" :value="wh.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">保 存</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="SupplierInfo" lang="ts">
import { listSupplierInfo, getSupplierInfo, delSupplierInfo, addSupplierInfo, updateSupplierInfo } from '@/api/biz/supplierInfo';
import { SupplierInfoVO, SupplierInfoQuery, SupplierInfoForm } from '@/api/biz/supplierInfo/types';
import { listProvinces, listChildren } from '@/api/biz/region';
import type { RegionVO } from '@/api/biz/region';
import { listWarehouseInfo } from '@/api/biz/warehouseInfo';
import { listAllTenant } from '@/api/system/tenant';
import type { TenantVO } from '@/api/system/tenant/types';

const businessList = ref<TenantVO[]>([]);
const warehouseOptions = ref<{ id: number; warehouseName: string }[]>([]);

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const loadAllBusiness = async () => {
  const res = await listAllTenant();
  businessList.value = res.data;
};
const supplierInfoList = ref<SupplierInfoVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const provinces = ref<RegionVO[]>([]);
const cities = ref<RegionVO[]>([]);
const districts = ref<RegionVO[]>([]);

const onProvinceChange = async (code: string) => {
  // 根据省份编码获取城市列表
  const res = await listChildren(code);
  cities.value = res.data;
  // 重置下级选择
  form.value.city = undefined;
  form.value.district = undefined;
  districts.value = [];
};

const onCityChange = async (code: string) => {
  // 根据城市编码获取区县列表
  const res = await listChildren(code);
  districts.value = res.data;
  form.value.district = undefined;
};
async function loadWarehouses() {
  const res = await listWarehouseInfo({ status: '1' });
  warehouseOptions.value = res.rows.map((item) => ({
    id: item.id,
    warehouseName: item.warehouseName
  }));
}

const queryFormRef = ref<ElFormInstance>();
const supplierInfoFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: SupplierInfoForm = {
  id: undefined,
  supplierName: '',
  supplierType: undefined,
  externalCode: '',
  contactorName: '',
  contactorMobile: '',
  province: undefined,
  city: undefined,
  district: undefined,
  address: '',
  wareHouseIds: [],
  remark: ''
};

const data = reactive<PageData<SupplierInfoForm, SupplierInfoQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    supplierName: undefined,
    supplierCode: undefined,
    supplierType: undefined,
    contactorName: undefined,
    contactorMobile: undefined,
    address: undefined,
    status: undefined,
    params: {}
  },
  rules: {
    supplierName: [
      { required: true, message: '名称不能为空', trigger: 'blur', max: 20 }
    ],
    supplierType: [
      { required: true, message: '类型不能为空', trigger: 'change' }
    ],
    contactorName: [
      { required: true, message: '联系人不能为空', trigger: 'blur', max: 10 }
    ],
    contactorMobile: [
      { required: true, message: '电话不能为空', trigger: 'blur' },
      { max: 20, message: '电话不能超过20个字符', trigger: 'blur' },
      { pattern: /^(1[3-9]\d{9}|0\d{2,3}-?\d{7,8})$/, message: '电话格式不正确', trigger: 'blur' }
    ],
    province: [
      { required: true, message: '请选择省', trigger: 'change' }
    ],
    address: [
      { required: true, message: '地址不能为空', trigger: 'blur', max: 100 }
    ],
    wareHouseIds: [
      { required: true, message: '请选择仓库', trigger: 'change' }
    ]
  }
});


const { queryParams, form, rules } = toRefs(data);

/** 查询供应商信息列表 */
const getList = async () => {
  loading.value = true;
  const res = await listSupplierInfo(queryParams.value);
  supplierInfoList.value = res.rows;
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
  supplierInfoFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: SupplierInfoVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '新增供应商';
};

/** 修改按钮操作 */
const handleUpdate = async (row: SupplierInfoVO) => {
  reset();
  const { data } = await getSupplierInfo(row.id);

  Object.assign(form.value, data);

  form.value.province = data.provinceCode;
  if (data.provinceCode) {
    const cityRes = await listChildren(data.provinceCode);
    cities.value = cityRes.data;
  }
  form.value.city = data.cityCode;
  if (data.cityCode) {
    const districtRes = await listChildren(data.cityCode);
    districts.value = districtRes.data;
  }
  form.value.district = data.districtCode;
  form.value.wareHouseIds = data.wareHouseIds
    ? data.wareHouseIds.split(',').map(id => Number(id))
    : [];

  dialog.title = '修改供应商信息';
  dialog.visible = true;
};


/** 提交按钮 */
const submitForm = () => {
  supplierInfoFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateSupplierInfo(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addSupplierInfo(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: SupplierInfoVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除供应商信息编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delSupplierInfo(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'biz/supplierInfo/export',
    {
      ...queryParams.value
    },
    `supplierInfo_${new Date().getTime()}.xlsx`
  );
};

onMounted(async () => {
  provinces.value = (await listProvinces()).data;
  await loadWarehouses();

  await loadAllBusiness();

  await getList();
});
</script>
