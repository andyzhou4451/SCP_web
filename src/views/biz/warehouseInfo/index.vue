<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="仓库名称" prop="warehouseName">
              <el-input v-model="queryParams.warehouseName" placeholder="请输入仓库名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="仓库编码" prop="warehouseCode">
              <el-input v-model="queryParams.warehouseCode" placeholder="请输入仓库编码" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['biz:warehouseInfo:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['biz:warehouseInfo:edit']"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['biz:warehouseInfo:remove']"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['biz:warehouseInfo:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="warehouseInfoList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="仓库名称" align="center" prop="warehouseName" />
        <el-table-column label="仓库编码" align="center" prop="warehouseCode" />
        <el-table-column label="联系人" align="center" prop="contactorName" />
        <el-table-column label="联系电话" align="center" prop="contactorMobile" />
        <el-table-column label="发货地址" align="center">
          <template #default="{ row }">
            {{ row.shippingProvince }}{{ row.shippingCity }}{{ row.shippingDistrict }}{{ row.shippingStreet || '' }}{{ row.shippingDetail }}
          </template>
        </el-table-column>
        <el-table-column label="退货收货人" align="center" prop="returnName" />
        <el-table-column label="退货电话" align="center" prop="returnMobile" />
        <el-table-column label="退货地址" align="center">
          <template #default="{ row }">
            {{ row.returnProvince }}{{ row.returnCity }}{{ row.returnDistrict }}{{ row.returnStreet || '' }}{{ row.returnDetail }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['biz:warehouseInfo:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['biz:warehouseInfo:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改仓库，用于维护仓库信息对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="720px" append-to-body>
      <el-form ref="warehouseInfoFormRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="仓库名称" prop="warehouseName">
          <el-input v-model="form.warehouseName" placeholder="请输入仓库名称" maxlength="20" />
        </el-form-item>
        <el-form-item label="外部仓库编码" prop="outerWarehouseCode">
          <el-input v-model="form.outerWarehouseCode" placeholder="请输入外部仓库编码" maxlength="20" />
        </el-form-item>
        <el-form-item label="联系人" prop="contactorName">
          <el-input v-model="form.contactorName" placeholder="请输入联系人姓名" maxlength="20" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactorMobile">
          <el-input v-model="form.contactorMobile" placeholder="请输入联系人手机号" maxlength="20" />
        </el-form-item>
        <el-form-item label="发货地址" prop="shippingProvince">
          <div class="address-row">
            <el-select v-model="form.shippingProvince" placeholder="选择省份" clearable @change="onShippingProvinceChange">
              <el-option v-for="p in provinces" :key="p.code" :label="p.name" :value="p.name" />
            </el-select>
            <el-select v-model="form.shippingCity" placeholder="选择城市" clearable @change="onShippingCityChange">
              <el-option v-for="c in shippingCities" :key="c.code" :label="c.name" :value="c.name" />
            </el-select>
            <el-select v-model="form.shippingDistrict" placeholder="选择区/县" clearable @change="onShippingDistrictChange">
              <el-option v-for="d in shippingDistricts" :key="d.code" :label="d.name" :value="d.name" />
            </el-select>
            <el-select v-model="form.shippingStreet" placeholder="选择街道" clearable>
              <el-option v-for="s in shippingStreets" :key="s.code" :label="s.name" :value="s.name" />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="发货详细地址" prop="shippingDetail" class="no-label">
          <el-input v-model="form.shippingDetail" placeholder="请输入详细地址" maxlength="100" />
        </el-form-item>
        <el-form-item label="退货地址" prop="returnProvince">
          <div class="address-row">
            <el-select v-model="form.returnProvince" placeholder="选择省份" clearable @change="onReturnProvinceChange">
              <el-option v-for="p in provinces" :key="p.code" :label="p.name" :value="p.name" />
            </el-select>
            <el-select v-model="form.returnCity" placeholder="选择城市" clearable @change="onReturnCityChange">
              <el-option v-for="c in returnCities" :key="c.code" :label="c.name" :value="c.name" />
            </el-select>
            <el-select v-model="form.returnDistrict" placeholder="选择区/县" clearable @change="onReturnDistrictChange">
              <el-option v-for="d in returnDistricts" :key="d.code" :label="d.name" :value="d.name" />
            </el-select>
            <el-select v-model="form.returnStreet" placeholder="选择街道" clearable>
              <el-option v-for="s in returnStreets" :key="s.code" :label="s.name" :value="s.name" />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="退货详细地址" prop="returnDetail" class="no-label">
          <el-input v-model="form.returnDetail" placeholder="请输入详细地址" maxlength="100" />
        </el-form-item>
        <el-form-item label="收货人" prop="returnName">
          <el-input v-model="form.returnName" placeholder="请输入退货收货人姓名" maxlength="20" />
        </el-form-item>
        <el-form-item label="收货电话" prop="returnMobile">
          <el-input v-model="form.returnMobile" placeholder="请输入退货收货人电话" maxlength="20" />
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

<script setup name="WarehouseInfo" lang="ts">
import { getCurrentInstance, ref, reactive, toRefs, onMounted, type ComponentInternalInstance } from 'vue'
import { listWarehouseInfo, getWarehouseInfo, delWarehouseInfo, addWarehouseInfo, updateWarehouseInfo } from '@/api/biz/warehouseInfo'
import { WarehouseInfoVO, WarehouseInfoQuery, WarehouseInfoForm } from '@/api/biz/warehouseInfo/types'
import { listProvinces, listChildren, resolvePathByName, type RegionVO } from '@/api/biz/region'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const warehouseInfoList = ref<WarehouseInfoVO[]>([])
const buttonLoading = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const ids = ref<Array<string | number>>([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)

const queryFormRef = ref<ElFormInstance>()
const warehouseInfoFormRef = ref<ElFormInstance>()

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
})

interface WarehouseForm extends WarehouseInfoForm {
  outerWarehouseCode?: string
  shippingRegion?: string[]
  returnRegion?: string[]
  shippingProvinceCode?: string
  shippingCityCode?: string
  shippingDistrictCode?: string
  shippingStreetCode?: string

  returnProvinceCode?: string
  returnCityCode?: string
  returnDistrictCode?: string
  returnStreetCode?: string
}

const initFormData: WarehouseForm = {
  id: undefined,
  warehouseName: undefined,
  warehouseCode: undefined,
  contactorName: undefined,
  contactorMobile: undefined,
  shippingProvince: undefined,
  shippingCity: undefined,
  shippingDistrict: undefined,
  shippingStreet: undefined,
  shippingDetail: undefined,
  returnName: undefined,
  returnMobile: undefined,
  returnProvince: undefined,
  returnCity: undefined,
  returnDistrict: undefined,
  returnStreet: undefined,
  returnDetail: undefined,
  status: undefined,
  remark: undefined,
  outerWarehouseCode: undefined,
  shippingRegion: [],
  returnRegion: []
}

const data = reactive<PageData<WarehouseForm, WarehouseInfoQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    warehouseName: undefined,
    warehouseCode: undefined,
    contactorName: undefined,
    contactorMobile: undefined,
    shippingProvince: undefined,
    shippingCity: undefined,
    shippingDistrict: undefined,
    shippingStreet: undefined,
    shippingProvinceCode: undefined,
    shippingCityCode: undefined,
    shippingDistrictCode: undefined,
    shippingStreetCode: undefined,
    returnProvinceCode: undefined,
    returnCityCode: undefined,
    returnDistrictCode: undefined,
    returnStreetCode: undefined,
    shippingDetail: undefined,
    returnName: undefined,
    returnMobile: undefined,
    returnProvince: undefined,
    returnCity: undefined,
    returnDistrict: undefined,
    returnStreet: undefined,
    returnDetail: undefined,
    status: undefined,
    params: {}
  },
  rules: {
    warehouseName: [{ required: true, message: '仓库名称不能为空', trigger: 'blur' }],
    contactorName: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
    contactorMobile: [{ required: true, message: '联系电话不能为空', trigger: 'blur' }],

    shippingProvince: [{ required: true, message: '请选择发货省份', trigger: 'change' }],
    shippingCity: [{ required: true, message: '请选择发货城市', trigger: 'change' }],
    shippingDistrict: [{ required: true, message: '请选择发货区/县', trigger: 'change' }],
    shippingDetail: [{ required: true, message: '请输入发货详细地址', trigger: 'blur' }],

    returnProvince: [{ required: true, message: '请选择退货省份', trigger: 'change' }],
    returnCity: [{ required: true, message: '请选择退货城市', trigger: 'change' }],
    returnDistrict: [{ required: true, message: '请选择退货区/县', trigger: 'change' }],
    returnDetail: [{ required: true, message: '请输入退货详细地址', trigger: 'blur' }],

    returnName: [{ required: true, message: '收货人不能为空', trigger: 'blur' }],
    returnMobile: [{ required: true, message: '收货电话不能为空', trigger: 'blur' }]
  }
})

const { queryParams, form, rules } = toRefs(data)

// ================== 行政区划联动 ==================
const provinces = ref<RegionVO[]>([])
const shippingCities = ref<RegionVO[]>([])
const shippingDistricts = ref<RegionVO[]>([])
const shippingStreets = ref<RegionVO[]>([])
const returnCities = ref<RegionVO[]>([])
const returnDistricts = ref<RegionVO[]>([])
const returnStreets = ref<RegionVO[]>([])

const findName = (list: RegionVO[], code?: string) => list.find(i => i.code === code)?.name

async function loadAreas() {
  const { data } = await listProvinces()
  provinces.value = data || []
}

// ★发货地址联动
const onShippingProvinceChange = async (code?: string) => {
  form.value.shippingProvinceCode = code
  form.value.shippingProvince = findName(provinces.value, code) || undefined
  form.value.shippingCityCode = form.value.shippingCity = undefined
  form.value.shippingDistrictCode = form.value.shippingDistrict = undefined
  form.value.shippingStreetCode = form.value.shippingStreet = undefined

  shippingCities.value = code ? (await listChildren(code)).data || [] : []
  shippingDistricts.value = []
  shippingStreets.value = []
}

const onShippingCityChange = async (code?: string) => {
  form.value.shippingCityCode = code
  form.value.shippingCity = findName(shippingCities.value, code) || undefined
  form.value.shippingDistrictCode = form.value.shippingDistrict = undefined
  form.value.shippingStreetCode = form.value.shippingStreet = undefined

  shippingDistricts.value = code ? (await listChildren(code)).data || [] : []
  shippingStreets.value = []
}

const onShippingDistrictChange = async (code?: string) => {
  form.value.shippingDistrictCode = code
  form.value.shippingDistrict = findName(shippingDistricts.value, code) || undefined
  form.value.shippingStreetCode = form.value.shippingStreet = undefined
  shippingStreets.value = code ? (await listChildren(code)).data || [] : []
}

const onShippingStreetChange = (code?: string) => {
  form.value.shippingStreetCode = code
  form.value.shippingStreet = findName(shippingStreets.value, code) || undefined
}

// ★退货地址联动
const onReturnProvinceChange = async (code?: string) => {
  form.value.returnProvinceCode = code
  form.value.returnProvince = findName(provinces.value, code) || undefined
  form.value.returnCityCode = form.value.returnCity = undefined
  form.value.returnDistrictCode = form.value.returnDistrict = undefined
  form.value.returnStreetCode = form.value.returnStreet = undefined

  returnCities.value = code ? (await listChildren(code)).data || [] : []
  returnDistricts.value = []
  returnStreets.value = []
}

const onReturnCityChange = async (code?: string) => {
  form.value.returnCityCode = code
  form.value.returnCity = findName(returnCities.value, code) || undefined
  form.value.returnDistrictCode = form.value.returnDistrict = undefined
  form.value.returnStreetCode = form.value.returnStreet = undefined

  returnDistricts.value = code ? (await listChildren(code)).data || [] : []
  returnStreets.value = []
}

const onReturnDistrictChange = async (code?: string) => {
  form.value.returnDistrictCode = code
  form.value.returnDistrict = findName(returnDistricts.value, code) || undefined
  form.value.returnStreetCode = form.value.returnStreet = undefined
  returnStreets.value = code ? (await listChildren(code)).data || [] : []
}

const onReturnStreetChange = (code?: string) => {
  form.value.returnStreetCode = code
  form.value.returnStreet = findName(returnStreets.value, code) || undefined
}

// ================== 业务方法 ==================
const getList = async () => {
  loading.value = true
  const res = await listWarehouseInfo(queryParams.value)
  warehouseInfoList.value = res.rows
  total.value = res.total
  loading.value = false
}

const cancel = () => {
  reset()
  dialog.visible = false
}

const reset = () => {
  form.value = { ...initFormData }
  shippingCities.value = []
  shippingDistricts.value = []
  shippingStreets.value = []
  returnCities.value = []
  returnDistricts.value = []
  returnStreets.value = []
  warehouseInfoFormRef.value?.resetFields()
}

const handleQuery = () => {
  queryParams.value.pageNum = 1
  getList()
}

const resetQuery = () => {
  queryFormRef.value?.resetFields()
  handleQuery()
}

const handleSelectionChange = (selection: WarehouseInfoVO[]) => {
  ids.value = selection.map(item => item.id)
  single.value = selection.length != 1
  multiple.value = !selection.length
}

const handleAdd = () => {
  reset()
  dialog.visible = true
  dialog.title = '新增仓库'
}

const handleUpdate = async (row?: WarehouseInfoVO) => {
  reset()
  const _id = row?.id || ids.value[0]
  const res = await getWarehouseInfo(_id)
  Object.assign(form.value, res.data as Partial<WarehouseForm>)

  // 解析路径，回显
  const path = await resolvePathByName({
    province: form.value.shippingProvince!,
    city: form.value.shippingCity!,
    district: form.value.shippingDistrict!,
    street: form.value.shippingStreet
  })
  form.value.shippingProvinceCode = path.data.provinceCode
  shippingCities.value = (await listChildren(form.value.shippingProvinceCode!)).data || []
  form.value.shippingCityCode = path.data.cityCode
  shippingDistricts.value = (await listChildren(form.value.shippingCityCode!)).data || []
  form.value.shippingDistrictCode = path.data.districtCode
  shippingStreets.value = (await listChildren(form.value.shippingDistrictCode!)).data || []
  form.value.shippingStreetCode = path.data.streetCode

  if (form.value.returnProvince && form.value.returnCity && form.value.returnDistrict) {
    const rPath = await resolvePathByName({
      province: form.value.returnProvince!,
      city: form.value.returnCity!,
      district: form.value.returnDistrict!,
      street: form.value.returnStreet
    })
    form.value.returnProvinceCode = rPath.data.provinceCode
    returnCities.value = (await listChildren(form.value.returnProvinceCode!)).data || []
    form.value.returnCityCode = rPath.data.cityCode
    returnDistricts.value = (await listChildren(form.value.returnCityCode!)).data || []
    form.value.returnDistrictCode = rPath.data.districtCode
    returnStreets.value = (await listChildren(form.value.returnDistrictCode!)).data || []
    form.value.returnStreetCode = rPath.data.streetCode
  }

  dialog.visible = true
  dialog.title = '修改仓库'
}

const submitForm = () => {
  warehouseInfoFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) return
    buttonLoading.value = true
    try {
      if (form.value.id) {
        await updateWarehouseInfo(form.value)
      } else {
        await addWarehouseInfo(form.value)
      }
      proxy?.$modal.msgSuccess('操作成功')
      dialog.visible = false
      await getList()
    } finally {
      buttonLoading.value = false
    }
  })
}

const handleDelete = async (row?: WarehouseInfoVO) => {
  const _ids = row?.id || ids.value
  await proxy?.$modal.confirm('是否确认删除仓库编号为 "' + _ids + '" 的数据项？').finally(() => (loading.value = false))
  await delWarehouseInfo(_ids)
  proxy?.$modal.msgSuccess('删除成功')
  await getList()
}

const handleExport = () => {
  proxy?.download('biz/warehouseInfo/export', { ...queryParams.value }, `仓库信息表_${new Date().getTime()}.xlsx`)
}

onMounted(async () => {
  await loadAreas()
  getList()
})
</script>
