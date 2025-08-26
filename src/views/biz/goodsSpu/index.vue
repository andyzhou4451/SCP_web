<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="商品名称" prop="spuName">
              <el-input v-model="queryParams.spuName" placeholder="商品名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="商品编码/条码" prop="productCode" label-width="120px">
              <el-input v-model="queryParams.productCode" placeholder="编码/条码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="商品分类" prop="productClass">
              <el-cascader
                v-model="queryParams.productClass"
                placeholder="商品分类"
                :options="productClassOptions"
                clearable
                filterable
                @keyup.enter="handleQuery"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="商品品牌" prop="brandId">
              <el-select v-model="queryParams.brandId" filterable placeholder="请选择">
                <el-option  v-for="item in brandLibraryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品仓库" prop="productCode">
              <el-input v-model="queryParams.productCode" placeholder="编码/条码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="供应商" prop="tenantId">
              <el-input v-model="queryParams.tenantId" placeholder="请输入租户编号" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['biz:goodsSpu:add']">新增 </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['biz:goodsSpu:edit']"
              >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['biz:goodsSpu:remove']"
              >删除
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['biz:goodsSpu:export']"> 导出 </el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="goodsSpuList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="商品编码" align="center" prop="productCode" />
        <el-table-column label="商品名称" align="center" prop="spuName" />
        <el-table-column label="预览图" align="center" prop="spuImg" />
        <el-table-column label="计价方式" align="center" prop="priceMethod" />
        <el-table-column label="商品分类" align="center" prop="productClassName" />
        <el-table-column label="供货商" align="center" prop="supplierId" />
        <el-table-column label="商品品牌" align="center" prop="brandName" />
        <el-table-column label="仓库" align="center" prop="warehouseId" />
        <el-table-column label="商品总库存" align="center" prop="warehouseId" />
        <el-table-column label="信息完善进度" align="center" prop="warehouseId" />
        <el-table-column label="发布状态" align="center" prop="publishStatus" />
        <el-table-column label="已发布渠道" align="center" prop="warehouseId" />
        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['biz:goodsSpu:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['biz:goodsSpu:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改spu信息对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="goodsSpuFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商品名称" prop="spuName">
          <el-input v-model="form.spuName" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="spu描述" prop="spuDesc">
          <el-input v-model="form.spuDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="商品编码/条码" prop="productCode">
          <el-input v-model="form.productCode" placeholder="请输入商品编码/条码" />
        </el-form-item>
        <el-form-item label="商品预览图" prop="spuImg">
          <el-input v-model="form.spuImg" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="商品分类名称" prop="productClassName">
          <el-input v-model="form.productClassName" placeholder="请输入商品分类名称" />
        </el-form-item>
        <el-form-item label="品牌名称" prop="brandName">
          <el-input v-model="form.brandName" placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item label="成色" prop="quality">
          <el-input v-model="form.quality" placeholder="请输入成色" />
        </el-form-item>
        <el-form-item label="标签id，逗号分隔" prop="labelId">
          <el-input v-model="form.labelId" placeholder="请输入标签id，逗号分隔" />
        </el-form-item>
        <el-form-item label="供货商商品id(一个商品有一个供应商）" prop="supplierSpuId">
          <el-input v-model="form.supplierSpuId" placeholder="请输入供货商商品id(一个商品有一个供应商）" />
        </el-form-item>
        <el-form-item label="是否允许其分销：0-否，1-是" prop="isAllowDistribu">
          <el-input v-model="form.isAllowDistribu" placeholder="请输入是否允许其分销：0-否，1-是" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
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

<script setup name="GoodsSpu" lang="ts">
import {
  listGoodsSpu,
  getGoodsSpu,
  delGoodsSpu,
  addGoodsSpu,
  updateGoodsSpu,
  getClassificationAll,
  getBrandLibraryAll
} from '@/api/biz/goodsSpu';
import { GoodsSpuVO, GoodsSpuQuery, GoodsSpuForm } from '@/api/biz/goodsSpu/types';
import { ref } from 'vue';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const goodsSpuList = ref<GoodsSpuVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const goodsSpuFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: GoodsSpuForm = {
  id: undefined,
  spuName: undefined,
  spuDesc: undefined,
  productCode: undefined,
  productClass: undefined,
  spuImg: undefined,
  productClassName: undefined,
  brandId: undefined,
  brandName: undefined,
  supplierId: undefined,
  warehouseId: undefined,
  productSource: undefined,
  publishStatus: undefined,
  priceMethod: undefined,
  invoiceType: undefined,
  quality: undefined,
  labelId: undefined,
  supplierSpuId: undefined,
  isAllowDistribu: undefined,
  status: undefined,
  remark: undefined
};
const data = reactive<PageData<GoodsSpuForm, GoodsSpuQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    spuName: undefined,
    productCode: undefined,
    productClass: undefined,
    brandId: undefined,
    supplierId: undefined,
    warehouseId: undefined,
    tenantId: undefined,
    params: {}
  },
  rules: {
    productCode: [{ required: true, message: '商品编码/条码不能为空', trigger: 'blur' }],
    productClass: [{ required: true, message: '商品分类不能为空', trigger: 'change' }],
    spuImg: [{ required: true, message: '商品预览图不能为空', trigger: 'blur' }],
    brandId: [{ required: true, message: '品牌id不能为空', trigger: 'change' }],
    brandName: [{ required: true, message: '品牌名称不能为空', trigger: 'blur' }],
    supplierId: [{ required: true, message: '商品供货商不能为空', trigger: 'change' }],
    warehouseId: [{ required: true, message: '商品仓库不能为空', trigger: 'change' }],
    productSource: [{ required: true, message: '商品来源：0-自建商品，1-供货商同步不能为空', trigger: 'change' }],
    publishStatus: [{ required: true, message: '发布状态：0-新建，1-上架，2-下架，3-待审核不能为空', trigger: 'change' }],
    priceMethod: [{ required: true, message: '计价方式：0-记重商品，1-一口价商品不能为空', trigger: 'change' }],
    invoiceType: [{ required: true, message: '开票类型  01金条  02黄金饰品不能为空', trigger: 'change' }],
    labelId: [{ required: true, message: '标签id，逗号分隔不能为空', trigger: 'blur' }],
    supplierSpuId: [{ required: true, message: '供货商商品id(一个商品有一个供应商）不能为空', trigger: 'blur' }],
    isAllowDistribu: [{ required: true, message: '是否允许其分销：0-否，1-是不能为空', trigger: 'blur' }],
    status: [{ required: true, message: '状态：1-正常，0-禁用不能为空', trigger: 'change' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询spu信息列表 */
const getList = async () => {
  loading.value = true;
  const res = await listGoodsSpu(queryParams.value);
  goodsSpuList.value = res.rows;
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
  goodsSpuFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: GoodsSpuVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加spu信息';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: GoodsSpuVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getGoodsSpu(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改spu信息';
};

/** 提交按钮 */
const submitForm = () => {
  goodsSpuFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateGoodsSpu(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addGoodsSpu(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: GoodsSpuVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除spu信息编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delGoodsSpu(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'biz/goodsSpu/export',
    {
      ...queryParams.value
    },
    `goodsSpu_${new Date().getTime()}.xlsx`
  );
};

//商品分类
const productClassOptions = ref([]);
//商品品牌
const brandLibraryOptions = ref([]);

/** 查询商品分类 */
const getProductClassOptions = async () => {
  const res = await getClassificationAll();
  console.info(res);
  if (res.code == 200) {
    productClassOptions.value = res.data;
  } else {
    proxy?.$modal.msgError('获取商品分类失败');
  }
};
/** 查询商品品牌 */
const getBrandLibraryOptions = async () => {
  const res = await getBrandLibraryAll();
  console.info(res);
  if (res.code == 200) {
    productClassOptions.value = res.data;
  } else {
    proxy?.$modal.msgError('获取商品品牌失败');
  }
};

onMounted(() => {
  getProductClassOptions();
  getBrandLibraryOptions();
  getList();
});
</script>
