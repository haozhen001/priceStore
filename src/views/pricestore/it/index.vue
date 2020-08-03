<template>
    <div class="app-container">
            <!--工具栏-->
            <div class="head-container">
                <eHeader :permission="permission" />
            </div>
            <el-row :getters="20">
                 <el-button
                    class="filter-item"
                    size="mini"
                    type="primary"
                    icon="el-icon-plus"
                    @click="doImport" >
                    导入
                </el-button>
                <el-button
                    class="filter-item"
                    size="mini"
                    type="success"
                    icon="el-icon-edit"
                    @click="doUpdate">
                    修改
                </el-button>
                <el-button
                    class="filter-item"
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="toDelete">
                    删除
                </el-button>
               <el-button
                    class="filter-item"
                    size="mini"
                    type="warning"
                    icon="el-icon-download"
                    @click="doExport"
                >导出</el-button>
                <el-button
                    class="filter-item"
                    size="mini"
                    type="warning"
                    icon="el-icon-download"
                    @click="doExportTemplate"
                >模板导出</el-button>
                <el-button
                    class="filter-item"
                    size="mini"
                    type="warning"
                    icon="el-icon-data-line"
                    @click="drawLine"
                >价格走势</el-button>
            </el-row>
            <!--表格渲染-->
            <el-table ref="table" v-loading="crud.loading" highlight-current-row :data="crud.data" 
                    @current-change="handleCurrentChange" style="width: 100%;">
            <el-table-column type="index" width="50" label="序号" />
            <el-table-column prop="type" label="类型" />
            <el-table-column prop="level" label="等级"  width="50"/>
            <el-table-column prop="goodsDescribe" label="标的描述" align="center" width="150"/>
            <el-table-column prop="supplier" label="供应商" />
            <el-table-column prop="unit" label="单位" width="50"/>
            <el-table-column prop="noTaxPrice" label="未税单价" />
            <el-table-column prop="taxRate" label="税率" >
                     <template slot-scope="scope">
                    {{ scope.row.taxRate? scope.row.taxRate+'%':0 }}
                    </template>
            </el-table-column>
            <el-table-column prop="region" label="地区" />
            <el-table-column prop="site" label="驻场" />
            <el-table-column prop="marketPrice" label="市场价" />
            <el-table-column prop="marketSource" label="市场行情" />
            <el-table-column  label="生效日期"  width="180">
                <template slot-scope="scope">
                 <span>{{ parseTime(scope.row.effecticeStartDate,'{y}-{m}-{d}') +'——'+ parseTime(scope.row.effecticeEndDate,'{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
            </el-table>
            <!--分页组件-->
            <pagination />
            <el-dialog append-to-body 
                    :close-on-click-modal="false" 
                    :before-close="cancelCU" 
                    :visible.sync="uploadvisible" 
                    :title="'文件上传'" width="500px">
                <el-form ref="form" :model="form" size="small" label-width="80px">
                    </el-form-item>
                    <!--   上传文件   -->
                    <el-form-item label="上传">
                    <el-upload
                        ref="upload"
                        :limit="1"
                        :before-upload="beforeUpload"
                        :auto-upload="false"
                        :headers="headers"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :action="goodsPriceApi + '?type=IT'"
                    >
                        <div class="eladmin-upload"><i class="el-icon-upload" /> 添加文件</div>
                        <div slot="tip" class="el-upload__tip">仅支持excel文件，且不超过100M</div>
                    </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="text" @click="cancelCU">取消</el-button>
                    <el-button  :loading="loading" type="primary" @click="upload">确认</el-button>
            </div>
            </el-dialog>
            <eForm />
            <el-dialog  title="价格走势" :visible.sync="lineVisible">
                <el-row>
                    <el-col :span="6">
                            <h2>标的描述: {{goodsDescribe}}</h2>
                    </el-col>
                </el-row>
                <eLine ref="eline" :chart-data="lineChartData"   />
            </el-dialog>
    </div>
</template>

<script>
    import itApi from '@/api/pricestore/it'
    import eHeader from './header'
    import eForm from './form'
    import { getToken } from '@/utils/auth'
    import CRUD, { presenter,headers } from '@crud/crud'
    import { exportGoodsPriceIT,queryGoodsPriceITByDescipt } from '@/api/pricestore/it'
    import crudOperation from '@crud/CRUD.operation'
    import pagination from '@crud/Pagination'
    import udOperation from '@crud/UD.operation'
    import { mapGetters } from 'vuex'
    import eLine from './line'

    export default {
        name: 'it',
        components: { eHeader, eForm,  eLine, crudOperation, pagination, udOperation },
        cruds() {
            return CRUD({
            title: 'IT组价格库',
            url: 'api/goodspricelibaray/findGoodsPriceIT',
            sort: ['id,desc'],
            crudMethod: { ...itApi }
            })
        },
        computed: {
            ...mapGetters([
            'baseApi',
            'goodsPriceApi'
            ])
        },
        mixins: [presenter()],
        // 数据字典
        //dicts: ['job_status'],
        data() {
            return {
                lineVisible:false,
                goodsDescribe:'',
                lineChartData: {},
                permission:[],
                loading: false,
                headers: { 'Authorization': getToken() },
                form:{

                },
                uploadvisible:false,
            }
        },
        methods: {
            handleCurrentChange(val){
               this.currentRow = val;
            },
            drawLine(){
                if(!this.currentRow){
                    this.crud.notify('请选择一条记录！')
                    return;
                }
                this.goodsDescribe = this.currentRow.goodsDescribe;
                queryGoodsPriceITByDescipt({descript:this.currentRow.goodsDescribe}).then(response=>{
                    if(response){
                        this.lineChartData = response;
                        this.lineVisible = true;
                    }else{
                        this.goodsDescribe = '';
                        this.lineVisible = false;
                    }
                })
            },
            doUpdate(){
                if(!this.currentRow){
                    this.crud.notify('请选择要修改的记录！')
                    return;
                }
                this.crud.toEdit(this.currentRow)
            },
            toDelete(){
                if(!this.currentRow){
                    this.crud.notify('请选择要删除的记录！')
                    return;
                }
                 this.$confirm(`确认删除选中的数据?`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.crud.delAllLoading = true
                        this.crud.doDelete([this.currentRow])
                    }).catch(() => {
                    })
            },
            doImport(){
                this.uploadvisible = true;
            },
            cancelCU(){
                 this.crud.resetForm()
                this.crud.toQuery()
                this.uploadvisible = false;
            },
            doExport(){
                this.crud.doExport();
            },
            doExportTemplate(){
                this.crud.doExport("/api/goodspricelibaray/findGoodsPriceIT/downloadTemplate");
            },
            upload() {
                this.$refs.upload.submit()
            },
            beforeUpload(file) {
                let isLt2M = true
                isLt2M = file.size / 1024 / 1024 < 100
                if (!isLt2M) {
                    this.loading = false
                    this.$message.error('上传文件大小不能超过 100MB!')
                }
                if(file.type!="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
                    this.loading = false
                    this.$message.error('上传文件为xlsx格式')
                }
                this.form.name = file.name
                return isLt2M
                },
                handleSuccess(response, file, fileList) {
                this.crud.notify('上传成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
                this.$refs.upload.clearFiles()
                this.crud.status.add = CRUD.STATUS.NORMAL
               
            },
            // 监听上传失败
            handleError(e, file, fileList) {
                const msg = JSON.parse(e.message)
                this.$notify({
                    title: msg.message,
                    type: 'error',
                    duration: 2500
                })
                this.loading = false
            }
        }
    }
</script>

<style>
    
</style>
