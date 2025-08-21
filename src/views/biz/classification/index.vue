<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="分类名称" prop="className">
              <el-input v-model="queryParams.className" placeholder="请输入分类名称" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd()" v-hasPermi="['biz:classification:add']"> 新增 </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="info" plain icon="Sort" @click="handleToggleExpandAll">展开/折叠</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>
      <el-table
        ref="classificationTableRef"
        v-loading="loading"
        :data="classificationList"
        row-key="id"
        :default-expand-all="isExpandAll"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="分类名称" align="center" prop="className" />
        <el-table-column label="分类级别" align="center" prop="classLevel" />
        <el-table-column label="分类编码" align="center" prop="classCode" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <div class="flex gap-2">
              <div v-if="scope.row.classLevel !== 3">
                <el-button link type="primary" @click="handleAdd(scope.row)" v-hasPermi="['biz:classification:add']"> 新增分类 </el-button>
              </div>
              <div>
                <el-button link type="primary" @click="handleUpdate(scope.row)" v-hasPermi="['biz:classification:edit']">编辑 </el-button>
              </div>
              <div>
                <el-button link type="primary" @click="handleDelete(scope.row)" v-hasPermi="['biz:classification:remove']">删除 </el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加或修改自营商品平台商品分类对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="classificationFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="父级分类ID" prop="parentId">
          <el-tree-select
            v-model="form.parentId"
            :data="classificationOptions"
            :props="{ value: 'id', label: 'className', children: 'children' }"
            value-key="id"
            placeholder="请选择父级分类ID"
            check-strictly
          />
        </el-form-item>
        <el-form-item label="分类名称" prop="className">
          <el-input v-model="form.className" placeholder="请输入分类名称" />
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

<script setup name="Classification" lang="ts">
import { listClassification, getClassification, delClassification, addClassification, updateClassification } from '@/api/biz/classification';
import { ClassificationVO, ClassificationQuery, ClassificationForm } from '@/api/biz/classification/types';

type ClassificationOption = {
  id: number;
  className: string;
  children?: ClassificationOption[];
};

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const classificationList = ref<ClassificationVO[]>([]);
const classificationOptions = ref<ClassificationOption[]>([]);
const buttonLoading = ref(false);
const showSearch = ref(true);
const isExpandAll = ref(true);
const loading = ref(false);

const queryFormRef = ref<ElFormInstance>();
const classificationFormRef = ref<ElFormInstance>();
const classificationTableRef = ref<ElTableInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ClassificationForm = {
  id: undefined,
  parentId: undefined,
  classLevel: undefined,
  className: undefined,
  classCode: undefined,
  icon: undefined,
  showStatus: undefined,
  sort: undefined,
  status: undefined,
  remark: undefined
};

const data = reactive<PageData<ClassificationForm, ClassificationQuery>>({
  form: { ...initFormData },
  queryParams: {
    parentId: undefined,
    classLevel: undefined,
    className: undefined,
    classCode: undefined,
    icon: undefined,
    showStatus: undefined,
    sort: undefined,
    status: undefined,
    params: {}
  },
  rules: {
    parentId: [{ required: true, message: '父级分类ID不能为空', trigger: 'blur' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询自营商品平台商品分类列表 */
const getList = async () => {
  loading.value = true;
  const res = await listClassification(queryParams.value);
  const data = proxy?.handleTree<ClassificationVO>(res.data, 'id', 'parentId');
  if (data) {
    classificationList.value = data;
    loading.value = false;
  }
};

/** 查询自营商品平台商品分类下拉树结构 */
const getTreeselect = async () => {
  const res = await listClassification();
  classificationOptions.value = [];
  const data: ClassificationOption = { id: 0, className: '顶级节点', children: [] };
  data.children = proxy?.handleTree<ClassificationOption>(res.data, 'id', 'parentId');
  classificationOptions.value.push(data);
};

// 取消按钮
const cancel = () => {
  reset();
  dialog.visible = false;
};

// 表单重置
const reset = () => {
  form.value = { ...initFormData };
  classificationFormRef.value?.resetFields();
};

/** 搜索按钮操作 */
const handleQuery = () => {
  getList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
};

/** 新增按钮操作 */
const handleAdd = (row?: ClassificationVO) => {
  reset();
  getTreeselect();
  if (row != null && row.id) {
    form.value.parentId = row.id;
  } else {
    form.value.parentId = 0;
  }
  dialog.visible = true;
  dialog.title = '添加自营商品平台商品分类';
};

/** 展开/折叠操作 */
const handleToggleExpandAll = () => {
  isExpandAll.value = !isExpandAll.value;
  toggleExpandAll(classificationList.value, isExpandAll.value);
};

/** 展开/折叠操作 */
const toggleExpandAll = (data: ClassificationVO[], status: boolean) => {
  data.forEach((item) => {
    classificationTableRef.value?.toggleRowExpansion(item, status);
    if (item.children && item.children.length > 0) toggleExpandAll(item.children, status);
  });
};

/** 修改按钮操作 */
const handleUpdate = async (row: ClassificationVO) => {
  reset();
  await getTreeselect();
  if (row != null) {
    form.value.parentId = row.parentId;
  }
  const res = await getClassification(row.id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改自营商品平台商品分类';
};

/** 提交按钮 */
const submitForm = () => {
  classificationFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateClassification(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addClassification(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row: ClassificationVO) => {
  await proxy?.$modal.confirm('是否确认删除自营商品平台商品分类编号为"' + row.id + '"的数据项？');
  loading.value = true;
  await delClassification(row.id).finally(() => (loading.value = false));
  await getList();
  proxy?.$modal.msgSuccess('删除成功');
};



onMounted(() => {
  getList();
});
</script>
