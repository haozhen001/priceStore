<template>
  <div>
  <el-form ref="form"  label-width="80px">
           <el-row :getters="20">
         <el-col :span="6">
         <el-form-item label="类型:">
            <el-input v-model="query.type" clearable size="small" placeholder="输入类型"
                  style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
         </el-form-item>  
         </el-col> 
         <el-col :span="6">
   <el-form-item label="等級:">
          <el-input v-model="query.level" clearable size="small" placeholder="输入等级"
               style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        </el-form-item>   
          </el-col> 
         <el-col :span="6">
   <el-form-item label="标的描述:">
          <el-input v-model="query.goodsDescribe" clearable size="small" placeholder="标的描述"
               style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
            </el-form-item>
              </el-col> 
         <el-col :span="6">   
         <el-form-item label="供应商:">
          <el-input v-model="query.supplier" clearable size="small" placeholder="供应商"
               style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
          </el-form-item> 
            </el-col> 
      </el-row>
                  <el-row>
         <el-col :span="6">   
           </el-form-item>   
   <el-form-item label="地区:">
          <el-input v-model="query.region" clearable size="small" placeholder="地区"
               style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        </el-form-item>   
             </el-col> 
         <el-col :span="6">   
   <el-form-item label="驻场:">
          <el-input v-model="query.site" clearable size="small" placeholder="驻场"
               style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        </el-form-item>   
             </el-col> 
         <el-col :span="6">   
         <el-form-item label="生效起始日期:" label-width="110px">
               <date-range-picker v-model="query.effecticeStartDate"  class="date-item" />
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