<template>
  <el-dialog v-model="visible" title="规则设置" width="600px">
    <el-form :model="form" label-width="120px">
      <!-- 商品发布至渠道 -->
      <el-form-item label="商品发布至渠道">
        <el-radio-group v-model="form.publishRule">
          <el-radio :label="0">发布成功手动上架</el-radio>
          <el-radio :label="1">发布成功自动上架</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 结算规则 -->
      <el-form-item label="结算规则">
        <el-radio-group v-model="form.settleRule">
          <el-radio :label="0">订单日期+0天结算</el-radio>
          <el-radio :label="1">订单日期+15天结算</el-radio>
          <el-radio :label="2">发货日期+0天结算</el-radio>
          <el-radio :label="3">发货日期+15天结算</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- SPU编码生成规则 -->
      <el-form-item label="SPU编码生成规则">
        <el-radio-group v-model="form.spuRule">
          <el-radio :label="0">系统默认规则</el-radio>
          <el-radio :label="1">自定义规则</el-radio>
          <el-radio :label="2">外部供应商编码</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- SKU编码生成规则 -->
      <el-form-item label="SKU编码生成规则">
        <el-radio-group v-model="form.skuRule">
          <el-radio :label="0">系统默认规则</el-radio>
          <el-radio :label="1">自定义规则</el-radio>
          <el-radio :label="2">外部供应商编码</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
const form = ref({
  publishRule: 0,
  settleRule: 0,
  spuRule: 0,
  skuRule: 0,
});

function open(ruleData?: any) {
  if (ruleData) {
    Object.assign(form.value, ruleData);
  }
  visible.value = true;
}

function submit() {
  console.log("保存规则", form.value);
  visible.value = false;
  // TODO: 调用后端接口保存规则
}

defineExpose({ open });
</script>
