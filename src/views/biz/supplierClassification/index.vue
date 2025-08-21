<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="商品中心三级分类名称" prop="className">
              <el-input v-model="queryParams.className" placeholder="请输入商品中心三级分类名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="供应商ID" prop="supplierId">
              <el-input v-model="queryParams.supplierId" placeholder="请输入供应商ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="供应商名称" prop="supplierName">
              <el-input v-model="queryParams.supplierName" placeholder="请输入供应商名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="供应商三级分类ID" prop="supplierClassId">
              <el-input v-model="queryParams.supplierClassId" placeholder="请输入供应商三级分类ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="供应商三级分类名称" prop="supplierClassName">
              <el-input v-model="queryParams.supplierClassName" placeholder="请输入供应商三级分类名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="供应商三级分类编码" prop="supplierClassCode">
              <el-input v-model="queryParams.supplierClassCode" placeholder="请输入供应商三级分类编码" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['biz:supplierClassification:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['biz:supplierClassification:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['biz:supplierClassification:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['biz:supplierClassification:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="supplierClassificationList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键ID" align="center" prop="id" v-if="true" />
        <el-table-column label="运营主体ID" align="center" prop="tenantId" />
        <el-table-column label="商品中心三级分类名称" align="center" prop="className" />
        <el-table-column label="供应商ID" align="center" prop="supplierId" />
        <el-table-column label="供应商名称" align="center" prop="supplierName" />
        <el-table-column label="供应商三级分类ID" align="center" prop="supplierClassId" />
        <el-table-column label="供应商三级分类名称" align="center" prop="supplierClassName" />
        <el-table-column label="供应商三级分类编码" align="center" prop="supplierClassCode" />
        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['biz:supplierClassification:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['biz:supplierClassification:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改供应商对应分类对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="supplierClassificationFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="运营主体ID" prop="tenantId">
          <el-input v-model="form.tenantId" placeholder="请输入运营主体ID" />
        </el-form-item>
        <el-form-item label="商品中心三级分类名称" prop="className">
          <el-input v-model="form.className" placeholder="请输入商品中心三级分类名称" />
        </el-form-item>
        <el-form-item label="供应商ID" prop="supplierId">
          <el-input v-model="form.supplierId" placeholder="请输入供应商ID" />
        </el-form-item>
        <el-form-item label="供应商名称" prop="supplierName">
          <el-input v-model="form.supplierName" placeholder="请输入供应商名称" />
        </el-form-item>
        <el-form-item label="供应商三级分类ID" prop="supplierClassId">
          <el-input v-model="form.supplierClassId" placeholder="请输入供应商三级分类ID" />
        </el-form-item>
        <el-form-item label="供应商三级分类名称" prop="supplierClassName">
          <el-input v-model="form.supplierClassName" placeholder="请输入供应商三级分类名称" />
        </el-form-item>
        <el-form-item label="供应商三级分类编码" prop="supplierClassCode">
          <el-input v-model="form.supplierClassCode" placeholder="请输入供应商三级分类编码" />
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

<script setup name="SupplierClassification" lang="ts">
import { listSupplierClassification, getSupplierClassification, delSupplierClassification, addSupplierClassification, updateSupplierClassification } from '@/api/biz/supplierClassification';
import { SupplierClassificationVO, SupplierClassificationQuery, SupplierClassificationForm } from '@/api/biz/supplierClassification/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const supplierClassificationList = ref<SupplierClassificationVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const supplierClassificationFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: SupplierClassificationForm = {
  id: undefined,
  tenantId: undefined,
  className: undefined,
  supplierId: undefined,
  supplierName: undefined,
  supplierClassId: undefined,
  supplierClassName: undefined,
  supplierClassCode: undefined,
  status: undefined,
  remark: undefined,
}
const data = reactive<PageData<SupplierClassificationForm, SupplierClassificationQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    className: undefined,
    supplierId: undefined,
    supplierName: undefined,
    supplierClassId: undefined,
    supplierClassName: undefined,
    supplierClassCode: undefined,
    status: undefined,
    params: {
    }
  },
  rules: {
    supplierClassId: [
      { required: true, message: "供应商三级分类ID不能为空", trigger: "blur" }
    ],
    supplierClassName: [
      { required: true, message: "供应商三级分类名称不能为空", trigger: "blur" }
    ],
    supplierClassCode: [
      { required: true, message: "供应商三级分类编码不能为空", trigger: "blur" }
    ],
    remark: [
      { required: true, message: "备注不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询供应商对应分类列表 */
const getList = async () => {
  loading.value = true;
  const res = await listSupplierClassification(queryParams.value);
  supplierClassificationList.value = res.rows;
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
  supplierClassificationFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: SupplierClassificationVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加供应商对应分类";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: SupplierClassificationVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getSupplierClassification(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改供应商对应分类";
}

/** 提交按钮 */
const submitForm = () => {
  supplierClassificationFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateSupplierClassification(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addSupplierClassification(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: SupplierClassificationVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除供应商对应分类编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delSupplierClassification(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('biz/supplierClassification/export', {
    ...queryParams.value
  }, `supplierClassification_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
