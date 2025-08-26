<template>
  <div class="p-2">
    <!-- 搜索区 -->
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="品牌名称" prop="className">
              <el-input
                v-model="queryParams.className"
                placeholder="请输入品牌名称"
                maxlength="20"
                show-word-limit
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>

            <el-form-item label="品牌编码" prop="params.brandCode">
              <el-input v-model="queryParams.params.brandCode" placeholder="请输入品牌编码" maxlength="20" clearable @keyup.enter="handleQuery" />
            </el-form-item>


            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <!-- 列表/工具条 -->
    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5" v-if="!isPlatformTenant" v-hasPermi="['biz:supplierBrandRel:import']">
            <el-upload
              :action="importUrl"
              :headers="uploadHeaders"
              :data="{ updateSupport: true }"
              :show-file-list="false"
              accept=".xlsx,.xls"
              :on-success="onImportSuccess"
              :on-error="onImportError"
            >
              <el-button type="primary" plain icon="Upload">导入</el-button>
            </el-upload>
          </el-col>

          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['biz:supplierBrandRel:export']">导出</el-button>
          </el-col>

          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="supplierBrandRelList" @selection-change="handleSelectionChange">
        <el-table-column label="品牌名称" align="center" prop="className" />
        <el-table-column label="品牌编码" align="center" prop="brandCode" />
        <el-table-column label="供应商名称" align="center" prop="supplierName" />
        <el-table-column label="供应商品牌名称" align="center" prop="supplierBrandName" />
        <el-table-column label="供应商品牌编码" align="center" prop="supplierBrandCode" />

        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button
                link
                type="primary"
                icon="Edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['biz:supplierBrandRel:edit']"
                :disabled="isPlatformTenant"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="supplierBrandRelFormRef" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="品牌名称">
          <el-input v-model="form.className" disabled />
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input v-model="form.supplierName" disabled />
        </el-form-item>
        <el-form-item label="供应商品牌名称" prop="supplierBrandName">
          <el-input v-model="form.supplierBrandName" maxlength="20" show-word-limit placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item label="供应商品牌编码" prop="supplierBrandCode">
          <el-input v-model="form.supplierBrandCode" maxlength="20" placeholder="请输入品牌编码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm" :disabled="isPlatformTenant">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="SupplierBrandRel" lang="ts">
import { listSupplierBrandRel, getSupplierBrandRel, updateSupplierBrandRel } from '@/api/biz/supplierBrandRel';
import type { SupplierBrandRelVO, SupplierBrandRelQuery, SupplierBrandRelForm } from '@/api/biz/supplierBrandRel/types';
import { getToken } from '@/utils/auth';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const isPlatformTenant = computed(() => userStore?.tenantId === '000000');

const supplierBrandRelList = ref<SupplierBrandRelVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const supplierBrandRelFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

// 供应商下拉数据
const supplierOptions = ref<Array<{ id: number; supplierName: string }>>([]);

const initFormData: SupplierBrandRelForm = {
  id: undefined,
  className: undefined,
  supplierName: undefined,
  supplierBrandCode: undefined,
  supplierBrandName: undefined
};
const data = reactive<PageData<SupplierBrandRelForm, SupplierBrandRelQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    // 平台账号增加 businessId 筛选
    businessId: undefined as unknown as string | undefined,
    // 查询项
    supplierId: undefined,
    className: undefined,
    params: {
      brandCode: undefined,
      isMatched: undefined
    }
  },
  rules: {
    supplierBrandCode: [{ required: true, message: '供应商品牌编码不能为空', trigger: 'blur' }],
    supplierBrandName: [{ required: true, message: '供应商品牌名称不能为空', trigger: 'blur' }]
  }
});
const { queryParams, form, rules } = toRefs(data);

/** 上传相关 */
const importUrl = '/biz/supplierBrandRel/importData';
const uploadHeaders = {
  Authorization: 'Bearer ' + getToken()
};
const onImportSuccess = (res: any) => {
  proxy?.$modal.msgSuccess(res?.msg || '导入成功');
  getList();
};
const onImportError = () => proxy?.$modal.msgError('导入失败');

/** 查询列表 */
const getList = async () => {
  loading.value = true;
  const res = await listSupplierBrandRel(queryParams.value);
  supplierBrandRelList.value = res.rows || [];
  total.value = res.total || 0;
  loading.value = false;
};

/** 取消&重置 */
const cancel = () => {
  reset();
  dialog.visible = false;
};
const reset = () => {
  form.value = { ...initFormData };
  supplierBrandRelFormRef.value?.resetFields();
};

/** 搜索&重置 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
const resetQuery = () => {
  // 只重置我们定义的查询字段
  queryParams.value.supplierId = undefined;
  queryParams.value.className = undefined;
  queryParams.value.params = { brandCode: undefined, isMatched: undefined };
  if (isPlatformTenant.value) queryParams.value.businessId = undefined as any;
  handleQuery();
};

/** 多选（这里列表没有批量操作，保留以防后续需要） */
const handleSelectionChange = (selection: SupplierBrandRelVO[]) => {
  ids.value = selection.map((item) => item.id as number);
};

/** 修改 */
const handleUpdate = async (row: SupplierBrandRelVO) => {
  reset();
  const res = await getSupplierBrandRel(row.id as number);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改供应商品牌对应关系';
};

/** 提交 */
const submitForm = () => {
  supplierBrandRelFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) return;
    buttonLoading.value = true;
    try {
      await updateSupplierBrandRel(form.value);
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    } finally {
      buttonLoading.value = false;
    }
  });
};

/** 导出 */
const handleExport = () => {
  proxy?.download('biz/supplierBrandRel/export', { ...queryParams.value }, `supplierBrandRel_${new Date().getTime()}.xlsx`);
};

/** 加载“供应商”下拉选项（当前经营主体下） */
const loadSupplierOptions = async () => {
  const res = await proxy?.request?.get('/biz/supplierInfo/simpleList'); // 自行替换
  supplierOptions.value = res?.data || [];
};

onMounted(async () => {
  await Promise.all([loadSupplierOptions(), getList()]);
});
</script>
