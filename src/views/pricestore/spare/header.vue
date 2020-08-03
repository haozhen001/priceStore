<template>
  <div>
   <el-form ref="form"  label-width="80px">
   <el-row>
   <el-col :span="4">
    <el-form-item label="类型:">
    <el-input v-model="query.category" clearable size="small" placeholder="请输入类型"
          class="filter-item" @keyup.enter.native="crud.toQuery" />
         </el-form-item> 
   </el-col>
   <el-col :span="4">
    <el-form-item label="类别:">
    <el-input v-model="query.type" clearable size="small" placeholder="请输入类别"
         class="filter-item" @keyup.enter.native="crud.toQuery" />
         </el-form-item> 
     </el-col>
   <el-col :span="4">
    <el-form-item label="物料号:">
    <el-input v-model="query.materialNumber" clearable size="small" placeholder="请输入物料号"
          class="filter-item" @keyup.enter.native="crud.toQuery" />
         </el-form-item> 
     </el-col>
   <el-col :span="5">
    <el-form-item label="录入日期:">
          <date-range-picker v-model="query.createTime"  class="date-item" />
          </el-form-item> 
    </el-col>

     </el-row>
     <el-row>
   <el-col :span="5">
    <el-form-item label="非税价格下限:"label-width="105px" >
     <el-input-number v-model="query.pricelt"   :precision="4" placeholder="非税价格下限" >
     </el-input-number>
     </el-form-item> 
  </el-col>
   <el-col :span="5">
    <el-form-item label="非税价格上限:"label-width="105px">
     <el-input-number v-model="query.pricegl"   :precision="4" placeholder="非税价格上限">
     </el-input-number>
     </el-form-item> 
      </el-col>
   <el-col :span="5">
    <el-form-item label="市场价格下限:"label-width="105px">
    <el-input-number v-model="query.marketPricelt"   :precision="4" placeholder="市场价格下限" >
    </el-input-number>
    </el-form-item> 
       </el-col>
   <el-col :span="5">
    <el-form-item label="市场价格上限:"label-width="105px">
     <el-input-number v-model="query.marketPricegl"  :precision="4" placeholder="市场价格上限">
     </el-input-number>
     </el-form-item> 
      </el-col>
    </el-row>
    <el-row>
       <el-col :span="6">
    <el-form-item label="年月:">
     <el-date-picker  
          v-model="query.effecticeDate"
          type="month"
          placeholder="选择年月">
     </el-date-picker>
     </el-form-item> 
     </el-col>
   <el-col :span="4">
    <el-form-item label="申请部门:">
     <el-input v-model="query.applyDepart" clearable size="small" placeholder="请输入申请部门"
           class="filter-item" @keyup.enter.native="crud.toQuery" />
          </el-form-item> 
      </el-col>
   <el-col :span="4">
    <el-form-item label="供应商:">
     <el-input v-model="query.supplier" clearable size="small" placeholder="请输入供应商"
          class="filter-item" @keyup.enter.native="crud.toQuery" />
          </el-form-item> 
   </el-col>
   <el-col :span="5">
    <el-form-item label="录入者:">
          <el-input v-model="query.inputer" clearable size="small" placeholder="请输入录入者"
           class="filter-item" @keyup.enter.native="crud.toQuery" />
          </el-form-item> 
      </el-col>
   <el-col :span="3" :offset="1">
     <rrOperation />
       </el-col>
    </el-row>
    </el-form>
  </div>
</template>


<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import DateRangePicker from '@/components/DateRangePicker'
export default {
  components: { rrOperation, DateRangePicker },
  mixins: [header()],
  props: {
  }
}
</script>

<style>
    
</style>