<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    title="修改页面"
    width="1000px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="110px">
      <el-col :span="12">
        <el-form-item label="类型:" prop="type">
          <el-input
            v-model="form.type"
            clearable
            size="small"
            placeholder="输入类型"
            readonly="ture"
            style="width: 200px;"
            class="filter-item"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="等級:" prop="level">
          <el-input
            v-model="form.level"
            clearable
            size="small"
            placeholder="输入等级"
            readonly="ture"
            style="width: 200px;"
            class="filter-item"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="标的描述:" prop="goodsDescribe">
          <el-input
            v-model="form.goodsDescribe"
            clearable
            size="small"
            placeholder="标的描述"
            readonly="ture"
            style="width: 200px;"
            class="filter-item"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="单位:" prop="goodsDescribe">
          <el-input
            v-model="form.unit"
            clearable
            size="small"
            placeholder="单位"
            readonly="ture"
            style="width: 200px;"
            class="filter-item"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="供应商:">
          <el-input
            v-model="form.supplier"
            clearable
            size="small"
            placeholder="供应商"
            readonly="ture"
            style="width: 200px;"
            class="filter-item"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="非税单价:">
          <el-input
            v-model="form.noTaxPrice"
            type="number"
            clearable
            size="small"
            placeholder="非税单价"
            style="width: 200px;"
            class="filter-item"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="税率:">
          <el-input
            v-model="form.taxRate"
            type="number"
            clearable
            size="small"
            placeholder="税率"
            style="width: 200px;"
            class="filter-item"
          />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="市场价:">
          <el-input
            v-model="form.marketPrice"
            type="number"
            clearable
            size="small"
            placeholder="市场价"
            style="width: 200px;"
            class="filter-item"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="市场行情:">
          <el-input
            v-model="form.marketSource"
            clearable
            size="small"
            placeholder="市场行情"
            style="width: 200px;"
            class="filter-item"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="地区:">
          <el-input
            v-model="form.region"
            clearable
            size="small"
            placeholder="地区"
            style="width: 200px;"
            class="filter-item"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="驻场:">
          <el-input
            v-model="form.site"
            clearable
            size="small"
            placeholder="驻场"
            style="width: 200px;"
            class="filter-item"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="录入日期:" label-width="110px">
          <el-date-picker v-model="form.createTime" readonly="ture" placeholder="录入日期" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="生效起始日期:" label-width="110px">
          <el-date-picker v-model="form.effecticeStartDate" placeholder="生效起始日期" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="生效截止日期:" label-width="110px">
          <el-date-picker v-model="form.effecticeEndDate" placeholder="生效截止日期" />
        </el-form-item>
      </el-col>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="crud.cancelCU">取消</el-button>
      <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { form } from '@crud/crud'
import DateRangePicker from '@/components/DateRangePicker'
const defaultForm = {
  type: '',
  level: '',
  goodsDescribe: '',
  supplier: '',
  region: '',
  site: '',
  effecticeStartDate: null,
  effecticeEndDate: null
}
export default {
  mixins: [form(defaultForm)],
  components: { DateRangePicker },
  props: {},
  data() {
    return {
      rules: {
        type: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        level: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        goodsDescribe: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
