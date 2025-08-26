<template>
  <div class="p-2">
    <!-- 搜索区域 -->
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <!-- 经营主体（仅平台账号展示） -->
            <el-form-item v-if="canSelectTenant" label="经营主体" prop="tenantId" label-width="90px">
              <el-select
                v-model="queryParams.tenantId"
                filterable
                clearable
                placeholder="请选择经营主体"
                style="width: 220px"
                @change="onTenantChange"
              >
                <el-option v-for="t in tenantOptions" :key="t.tenantId" :label="t.companyName + '（' + t.tenantId + '）'" :value="t.tenantId" />
              </el-select>
            </el-form-item>

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

    <!-- 列表区域 -->
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
          <right-toolbar v-model:show-search="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="supplierInfoList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column v-if="canSelectTenant" label="经营主体" align="center" width="200">
          <template #default="{ row }">
            {{ tenantNameMap[row.tenantId] || row.tenantName || row.tenantId || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="供应商名称" align="center" prop="supplierName" />
        <el-table-column label="供应商编码" align="center" prop="supplierCode" />
        <el-table-column label="供应商类型" align="center" prop="supplierType" />
        <el-table-column label="联系人" align="center" prop="contactorName" />
        <el-table-column label="联系人手机号" align="center" prop="contactorMobile" />
        <el-table-column label="供应商地址" align="center" prop="address" />
        <el-table-column label="仓库" align="center" min-width="200">
          <template #default="{ row }">
            <span>{{ row.wareHouseNames || formatWarehouses(row.wareHouseIds) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-space size="10">
              <el-link type="primary" @click="openRule(row)">规则设置</el-link>
              <el-link type="primary" @click="handleUpdate(row)">编辑</el-link>
              <el-link type="danger" @click="handleDelete(row)">删除</el-link>
            </el-space>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>

    <!-- 添加 / 修改供应商对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="720px" append-to-body>
      <el-form ref="supplierInfoFormRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="名称" prop="supplierName">
          <el-input v-model="form.supplierName" placeholder="请输入供应商名称" maxlength="20" />
        </el-form-item>
        <el-form-item label="类型" prop="supplierType">
          <el-select v-model="form.supplierType" placeholder="请选择类型" @change="onTypeChange">
            <el-option label="系统互通供应商" :value="1" />
            <el-option label="传统供应商" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="外部编码" prop="externalCode">
          <el-input v-model="form.externalCode" placeholder="请输入外部供应商编码" maxlength="20" />
        </el-form-item>
        <el-form-item label="联系人" prop="contactorName">
          <el-input v-model="form.contactorName" placeholder="请输入联系人" maxlength="10" />
        </el-form-item>
        <el-form-item label="电话" prop="contactorMobile">
          <el-input v-model="form.contactorMobile" placeholder="请输入联系人电话" maxlength="20" />
        </el-form-item>

        <!-- 省市区 -->
        <el-form-item label="省市区" prop="provinceCode">
          <div class="address-row">
            <el-select v-model="form.provinceCode" placeholder="省" clearable @change="onProvinceChange">
              <el-option v-for="p in provinces" :key="p.code" :label="p.name" :value="p.code" />
            </el-select>
            <el-select v-model="form.cityCode" placeholder="市" clearable @change="onCityChange">
              <el-option v-for="c in cities" :key="c.code" :label="c.name" :value="c.code" />
            </el-select>
            <el-select v-model="form.districtCode" placeholder="区/县" clearable>
              <el-option v-for="d in districts" :key="d.code" :label="d.name" :value="d.code" />
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入详细地址" maxlength="100" />
        </el-form-item>

        <!-- 仓库：互通=单选；传统=多选 -->
        <el-form-item label="仓库" prop="wareHouseIds">
          <el-select
            v-model="warehouseValue"
            :multiple="form.supplierType === 2"
            :collapse-tags="form.supplierType === 2"
            placeholder="请选择仓库"
            style="width: 100%"
            clearable
          >
            <el-option v-for="w in warehouseOptions" :key="w.id" :label="w.warehouseName" :value="w.id" />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 规则设置弹窗 -->
    <RuleDialog ref="ruleRef" @success="getList" />
  </div>
</template>

<script setup name="SupplierInfo" lang="ts">
import { getCurrentInstance, ref, reactive, toRefs, onMounted, computed, type ComponentInternalInstance } from 'vue';
import { listSupplierInfo, getSupplierInfo, addSupplierInfo, updateSupplierInfo, delSupplierInfo } from '@/api/biz/supplierInfo'; // :contentReference[oaicite:2]{index=2}
import type { SupplierInfoVO, SupplierInfoForm, SupplierInfoQuery } from '@/api/biz/supplierInfo/types';
import { listWarehouseInfo } from '@/api/biz/warehouseInfo';
import { listAllTenant, dynamicTenant } from '@/api/system/tenant';
import type { TenantVO } from '@/api/system/tenant/types';
import { listProvinces, listChildren, type RegionVO } from '@/api/biz/region';
import RuleDialog from '@/views/biz/supplierRule/RuleDialog.vue';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

// ===== 列表查询状态 =====
const supplierInfoList = ref<SupplierInfoVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

// ===== 经营主体相关 =====
const tenantOptions = ref<TenantVO[]>([]);
const tenantNameMap = reactive<Record<string, string>>({});
const canSelectTenant = computed(() => {
  try {
    return proxy?.$hasPermi?.(['system:tenant:list']) || (proxy as any)?.userStore?.userId === 1;
  } catch {
    return false;
  }
});
const loadTenantOptions = async () => {
  if (!canSelectTenant.value) return;
  const res = await listAllTenant();
  tenantOptions.value = res.data || [];
  res.data?.forEach((t: any) => (tenantNameMap[t.tenantId] = t.companyName));
};
const onTenantChange = async (tenantId?: string | number) => {
  if (!tenantId) return getList();
  await dynamicTenant(tenantId);
  await getList();
};

// ===== 地区联动（三级）=====
const provinces = ref<RegionVO[]>([]);
const cities = ref<RegionVO[]>([]);
const districts = ref<RegionVO[]>([]);
const onProvinceChange = async (code?: string) => {
  const res = code ? await listChildren(code) : { data: [] };
  cities.value = res.data || [];
  districts.value = [];
  form.value.cityCode = undefined;
  form.value.districtCode = undefined;
};
const onCityChange = async (code?: string) => {
  const res = code ? await listChildren(code) : { data: [] };
  districts.value = res.data || [];
  form.value.districtCode = undefined;
};

// ===== 仓库选项 =====
const warehouseOptions = ref<{ id: number; warehouseName: string }[]>([]);
async function loadWarehouses() {
  const res = await listWarehouseInfo({ status: '1', pageNum: 1, pageSize: 9999 });
  warehouseOptions.value = (res.rows || []).map((item: any) => ({
    id: item.id,
    warehouseName: item.warehouseName
  }));
}
const formatWarehouses = (ids: any) => {
  if (!ids) return '';
  const arr = Array.isArray(ids)
    ? ids.map((i: any) => Number(i))
    : String(ids)
        .split(',')
        .filter(Boolean)
        .map((i: any) => Number(i));
  return warehouseOptions.value
    .filter((w) => arr.includes(Number(w.id)))
    .map((w) => w.warehouseName)
    .join(' / ');
};

// ===== 表单与校验 =====
const queryFormRef = ref<ElFormInstance>();
const supplierInfoFormRef = ref<ElFormInstance>();
const dialog = reactive<DialogOption>({ visible: false, title: '' });

type FormModel = SupplierInfoForm & {
  externalCode?: string;
  provinceCode?: string;
  cityCode?: string;
  districtCode?: string;
};

const initFormData: FormModel = {
  id: undefined,
  supplierName: '',
  supplierType: undefined,
  externalCode: '',
  contactorName: '',
  contactorMobile: '',
  address: '',
  wareHouseIds: [],
  remark: '',
  provinceCode: undefined,
  cityCode: undefined,
  districtCode: undefined
};

const data = reactive<PageData<FormModel, SupplierInfoQuery>>({
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
    tenantId: undefined,
    params: {}
  },
  rules: {
    supplierName: [
      { required: true, message: '名称不能为空', trigger: 'blur' },
      { max: 20, message: '最多20字符', trigger: 'blur' }
    ],
    supplierType: [{ required: true, message: '类型不能为空', trigger: 'change' }],
    contactorName: [
      { required: true, message: '联系人不能为空', trigger: 'blur' },
      { max: 10, message: '最多10字符', trigger: 'blur' }
    ],
    contactorMobile: [
      { required: true, message: '电话不能为空', trigger: 'blur' },
      { max: 20, message: '电话不能超过20个字符', trigger: 'blur' },
      {
        pattern: /^(1[3-9]\d{9}|0\d{2,3}-?\d{7,8})$/,
        message: '仅支持手机号或固话格式',
        trigger: 'blur'
      }
    ],
    provinceCode: [{ required: true, message: '请选择省市区', trigger: 'change' }],
    address: [
      { required: true, message: '地址不能为空', trigger: 'blur' },
      { max: 100, message: '最多100字符', trigger: 'blur' }
    ],
    wareHouseIds: [{ required: true, message: '请选择仓库', trigger: 'change' }]
  }
});
const { queryParams, form, rules } = toRefs(data);

/** 【修改】computed 代理：保证 <el-select> 的 v-model 与 form.wareHouseIds（数组）打通 */
const warehouseValue = computed({
  get() {
    // 传统供应商（2）可多选 -> 直接用数组
    if (form.value.supplierType === 2) return form.value.wareHouseIds;
    // 互通供应商（1）单选 -> 取数组第一个
    return form.value.wareHouseIds && form.value.wareHouseIds.length > 0 ? Number(form.value.wareHouseIds[0]) : undefined;
  },
  set(val: any) {
    if (form.value.supplierType === 2) {
      const arr = Array.isArray(val) ? val : val != null ? [val] : [];
      form.value.wareHouseIds = arr.map((n: any) => Number(n));
    } else {
      form.value.wareHouseIds = val != null && val !== '' ? [Number(val)] : [];
    }
  }
});

// ===== 列表方法 =====
const getList = async () => {
  loading.value = true;
  const res = await listSupplierInfo(queryParams.value);
  supplierInfoList.value = res.rows;
  total.value = res.total;
  loading.value = false;
};

const cancel = () => {
  reset();
  dialog.visible = false;
};
const reset = () => {
  form.value = { ...initFormData };
  cities.value = [];
  districts.value = [];
  supplierInfoFormRef.value?.resetFields();
};
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
};
const handleSelectionChange = (selection: SupplierInfoVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length !== 1;
  multiple.value = !selection.length;
};
const handleAdd = () => {
  reset();
  dialog.title = '新增供应商';
  dialog.visible = true;
};
const onTypeChange = () => {
  form.value.wareHouseIds = [];
};

// ===== 编辑回显 =====
const handleUpdate = async (row?: SupplierInfoVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  if (!_id) return;
  const res = await getSupplierInfo(_id);
  const entity: any = (res as any).data || res;

  form.value.id = entity.id;
  form.value.supplierName = entity.supplierName;
  form.value.supplierType = entity.supplierType != null ? Number(entity.supplierType) : undefined;
  form.value.externalCode = entity.externalCode;
  form.value.contactorName = entity.contactorName;
  form.value.contactorMobile = entity.contactorMobile;
  form.value.address = entity.address;
  form.value.remark = entity.remark;

  form.value.provinceCode = entity.provinceCode;
  form.value.cityCode = entity.cityCode;
  form.value.districtCode = entity.districtCode;

  if (entity.provinceCode) {
    const cityRes = await listChildren(entity.provinceCode);
    cities.value = cityRes.data || [];
  }
  if (entity.cityCode) {
    const districtRes = await listChildren(entity.cityCode);
    districts.value = districtRes.data || [];
  }

  if (Array.isArray(entity.wareHouseIds)) {
    form.value.wareHouseIds = entity.wareHouseIds.map((n: any) => Number(n));
  } else if (entity.wareHouseIds != null) {
    form.value.wareHouseIds = String(entity.wareHouseIds)
      .split(',')
      .filter((s: string) => s !== '')
      .map((s: string) => Number(s));
  } else {
    form.value.wareHouseIds = [];
  }

  dialog.title = '修改供应商信息';
  dialog.visible = true;
};

const submitForm = () => {
  supplierInfoFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) return;
    buttonLoading.value = true;
    try {
      const payload: any = { ...form.value };
      if (!Array.isArray(payload.wareHouseIds)) {
        payload.wareHouseIds = payload.wareHouseIds != null && payload.wareHouseIds !== '' ? [payload.wareHouseIds] : [];
      }
      payload.wareHouseIds = payload.wareHouseIds.map((n: any) => Number(n));

      if (payload.id) await updateSupplierInfo(payload as SupplierInfoForm);
      else await addSupplierInfo(payload as SupplierInfoForm);
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    } finally {
      buttonLoading.value = false;
    }
  });
};

const handleDelete = async (row?: SupplierInfoVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除供应商信息编号为 "' + _ids + '" 的数据项？').finally(() => (loading.value = false));
  await delSupplierInfo(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

const handleExport = () => {
  proxy?.download('biz/supplierInfo/export', { ...queryParams.value }, `供应商信息表_${new Date().getTime()}.xlsx`);
};

const ruleRef = ref<InstanceType<typeof RuleDialog> | null>(null);
const openRule = (row: SupplierInfoVO) => {
  ruleRef.value?.open({
    supplierId: row.id,
    supplierName: (row as any).supplierName
  });
};

onMounted(async () => {
  provinces.value = (await listProvinces()).data || [];
  await loadWarehouses();
  await loadTenantOptions();
  await getList();
});
</script>

<style scoped>
.address-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
}
</style>
