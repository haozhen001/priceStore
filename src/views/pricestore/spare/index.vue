<template>
    <div class="app-container">
            <!--工具栏-->
            <div class="head-container">
                <eHeader/>
            </div>
            <el-row :getters="20">
               <el-button
                    class="filter-item"
                    size="mini"
                    type="warning"
                    icon="el-icon-download"
                    @click="doImport"
                >导入</el-button>
               <el-button
                    class="filter-item"
                    size="mini"
                    type="warning"
                    icon="el-icon-download"
                    @click="crud.doExport()"
                >导出</el-button>
            </el-row>
            <!--表格渲染-->
            <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;">
            <el-table-column type="index" width="50"/>
            <el-table-column prop="category" label="大类" />
            <el-table-column prop="type" label="类别"/>
            <el-table-column prop="goodsDescribe" label="标的描述" align="center"/>
             <el-table-column prop="unit" label="单位" />
            <el-table-column prop="specificationDescribe" label="规格/描述" />
            <el-table-column prop="noTaxPrice" label="未税单价" />
            <el-table-column prop="taxRate" label="税率">
                 <template slot-scope="scope">
                    {{ scope.row.taxRate? scope.row.taxRate+'%':0 }}
                    </template>
            </el-table-column>
            <el-table-column prop="supplier" label="供应商" />
            <el-table-column prop="materialNumber" label="物料号" />
            <el-table-column prop="effecticeDate" label="年月">
            </el-table-column>
            <el-table-column prop="elecPrice" label="电商价" />
            <el-table-column prop="marketPrice" label="市场价" />
            <el-table-column prop="inputer" label="录入者" />
            </el-table>
            <!--分页组件-->
            <pagination />
    </div>
</template>

<script>
    import eHeader from './header'
    import CRUD, { presenter } from '@crud/crud'
    import crudOperation from '@crud/CRUD.operation'
    import pagination from '@crud/Pagination'
    import udOperation from '@crud/UD.operation'

    export default {
        name: 'SparePart',
        components: { eHeader, crudOperation, pagination, udOperation },
        cruds() {
            return CRUD({
            title: 'IT组价格库',
            url: 'api/goodspricelibaray/findGoodsPriceSparePart',
            sort: ['id,desc'],
            })
        },
        mixins: [presenter()],
        // 数据字典
        //dicts: ['job_status'],
        data() {
            return {
            }
        },
        methods: {
            doImport(){
            },
        }
    }
</script>

<style>
    
</style>
