<template>
  <div class="account">
    <div class="tit">
      账户管理
    </div>
    <div class="select-box">
      <span class="sel-lab sel-lab-first">角色名称：</span>
      <el-select v-model="rulevalue" placeholder="请选择角色">
        <el-option
          v-for="item in rules"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span class="sel-lab">用户状态：</span>
      <el-select v-model="typevalue" placeholder="请选择状态">
        <el-option
          v-for="item in statuslist"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" class="cha-btn" @click="getListby">查询</el-button>
      <el-button class="reset-btn" @click="resetList">重置</el-button>
    </div>
    <div class="add-btn">
      <el-button @click="adduser" type="primary" size="medium">新建用户</el-button>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        header-row-class-name="biao-head"
        :header-cell-style="biaostyle"
        :cell-style="cellStyle"
        
        style="width: 100%">
        <el-table-column
          prop="id"
          label="用户ID"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="roleName"
          align="center"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="statusKey"
          align="center"
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          >
          <template slot-scope="scope">
            <el-button @click="editUser(scope.row)"  type="text" size="small" style="color:#0087ED;font-size:14px">编辑</el-button>
            <el-button @click="resetpasword(scope.row)" type="text" size="small" style="color:#0087ED;font-size:14px">重置密码</el-button>
            <el-button @click="enable(scope.row)" type="text" size="small" :style="scope.row.status===0 ? status1: status0 ">{{scope.row.status === 0 ? '禁用' : '启用'}}</el-button>
            <el-button @click="deleteuser(scope.row)" type="text" size="small" style="color:#0087ED;font-size:14px">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="total,prev, pager, next,sizes,jumper"
        :page-size="totalPageSize"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 30, 40]"
        style="text-align: center"
        @current-change="gotoPage"
        :current-page="currentPageNum"
        :total="listNum">
      </el-pagination>
    </div>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible"  width="500px" @close="adduserCancel">
      <el-form :model="form" ref="form" :rules="addformRules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="form.userName"  placeholder="6-18位英文字母，数字组合"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" type="password"  placeholder="6-18位英文字母，数字组合"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="roleName">
          <el-select v-model="form.roleName" placeholder="请选择用户角色">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="操作员" value="操作员"></el-option>
            <el-option label="运营者" value="运营者"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-aline:center">
        <el-button @click="adduserCancel">取 消</el-button>
        <el-button type="primary" @click="adduserOk">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="editformVisble" width="500px" @close="edituserCancel">
      <el-form :model="editForm" ref="editForm" :rules="addformRules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="editForm.userName" autocomplete="off" placeholder="6-18位英文字母，数字组合"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="roleName">
          <el-select v-model="editForm.roleName" placeholder="请选择用户角色">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="操作员" value="操作员"></el-option>
            <el-option label="运营者" value="运营者"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-aline:center">
        <el-button @click="edituserCancel">取 消</el-button>
        <el-button type="primary" @click="edituserOk">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="重置密码" :visible.sync="passwordreset" width="500px" @close="passwordResetCancel">
      <el-form :model="resetForm" ref="resetForm" :rules="passwordRules">
        <el-form-item label="设置新密码" :label-width="formLabelWidth" prop="oldpassword">
          <el-input v-model="resetForm.oldpassword" type="password" autocomplete="off" placeholder="6-18位英文字母，数字组合"></el-input>
        </el-form-item>
        <el-form-item label="确定新密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="resetForm.password" type="password" autocomplete="off" placeholder="6-18位英文字母，数字组合"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-aline:center">
        <el-button @click="passwordResetCancel">取 消</el-button>
        <el-button type="primary" @click="passwordResetOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>
<script>
import api from '@/feath/api.js'
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback('请输入6-18位英文字母，数字组合');
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback('请输入6-18位英文字母，数字组合');
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (!reg.test(value)) {
        callback('请输入6-18位英文字母，数字组合');
      }else if (value !== this.resetForm.oldpassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      addformRules: {
        userName: [
          {required: true, message: '请输入密码', trigger: 'blur' },
          {validator: validateUser, trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur' },
          {validator: validatePass, trigger: 'blur' }
        ],
        roleName: [
          {required: true, message: '请选择用户角色', trigger: 'blur' }
        ]
      },
      passwordRules: {
        oldpassword: [
          {required: true, message: '请输入密码', trigger: 'blur' },
          {validator: validatePass, trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请再次输入密码', trigger: 'blur' },
          {validator: validatePass2, trigger: 'blur' }
        ]
      },
      biaostyle: {
        backgroundColor: '#F6F7FB',
        fontSize: '14px',
        color: '#333',
        fontWeight: '400'
      },
      status0: {
        color: '#64B523',
        fontSize: '14px'
      },
      status1: {
        color: '#FA453C',
        fontSize: '14px'
      },
      listNum: 0,
      rules: [
        {
          value: '管理员',
          label: '管理员'
        },
        {
          value: '操作员',
          label: '操作员'
        },
        {
          value: '运营者',
          label: '运营者'
        }
      ],
      statuslist: [
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '禁用'
        }
      ],
      rulevalue: '',
      typevalue: '',
      tableData: [
        
      ],
      currentPage: 0,
      dialogFormVisible: false,
      form: {
        userName: '',
        password: '',
        roleName: '',
      },
      formLabelWidth: '120px',
      passwordreset: false,
      resetForm: {
        oldpassword: '',
        password: '',
        id: ''
      },
      editformVisble: false,
      editForm: {
        userName: '',
        roleName: '',
        id: ''
      },
      currentPageNum: 1,
      totalPageSize: 10
    }
  },
  mounted() {
    
  },
  created () {
    this.getList()
  },
  methods: {
    cellStyle (row, column, rowIndex, columnIndex) {
      if (row.columnIndex === 3 || row.columnIndex === 4) {
        if (row.row.status === 0) {
          return {
            color: '#64B523',
          }
        } else {
          return {
            color: '#FA453C',
          }
        }
      }
    },
    getList () {
      const data = {
        pageNum: this.currentPageNum,
        pageSize: this.totalPageSize,
        roleName: this.rulevalue,
        status: this.typevalue
      }
      api.backList(data).then(res => {
        if (res.code ===0) {
          res.result.list.forEach(item => {
            if (item.status === 0) {
              item.statusKey = '启用'
            } else {
              item.statusKey = '禁用'
            }
          })
          this.listNum = res.result.total
          this.tableData = res.result.list
        }
      })
    },
    handleSizeChange(val) {
      console.log(val)
      this.totalPageSize = val
      this.getList()
    },
    getListby () {
      this.currentPageNum = 1
      this.getList()
    },
    gotoPage (currentPage) {
      this.currentPageNum = currentPage
      this.getList()
    },
    resetList () {
      this.rulevalue = '';
      this.typevalue = '';
      this.getList()
    },
    adduser () {
      this.dialogFormVisible = true
    },
    initAddUser () {
      this.dialogFormVisible = false
      this.form = {
        userName: '',
        password: '',
        roleName: '',
      }
    },
    adduserCancel () {
      this.initAddUser()
      this.$refs.form.resetFields()
    },
    editUser (val) {
      console.log(val)
      this.editForm = {
        userName: val.userName,
        roleName: val.roleName,
        id: val.id
      }
      this.editformVisble = true
    },
    edituserCancel() {
      this.editformVisble = false
      this.$refs.editForm.resetFields()
    },
    edituserOk () {
      const data = Object.assign({},this.editForm)
      this.$refs.editForm.validate(valid => {
        if (valid) {
          api.backUpdate(data).then(res => {
            if (res.code === 0) {
              this.getList()
              this.$message({
                message: '修改用户信息成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '修改用户信息失败',
                type: 'error'
              });
            }
            this.editformVisble = false
          })
        }
      })
    },
    adduserOk () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          api.backSave(this.form).then(res => {
            if (res.code === 0) {
              this.getList()
              this.$message({
                message: '添加用户成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '添加用户失败',
                type: 'error'
              });
            }
            this.initAddUser()
          })
        }
      })
    },
    deleteuser (val) {
      console.log(val)
      const data = {
        id: val.id
      }
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.backRemove(data).then(res => {
            if (res.code === 0) {
              this.getList()
              this.$message({
                message: '删除用户成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '删除用户失败',
                type: 'error'
              });
            }
          })
        }).catch(() => {
              
        });
    },
    passwordResetCancel (val) {
      this.passwordreset = false
      this.resetForm.password = ""
      this.resetForm.oldpassword = ''
      this.$refs.resetForm.resetFields()
    },
    passwordResetOk () {
      this.$refs.resetForm.validate(vaild => {
        if (vaild) {
          this.passwordreset = false
          const data = {
            id: this.resetForm.id,
            password: this.resetForm.password,
          }
          api.backUpdate(data).then(res => {
            if (res.code === 0) {
              this.$message({
                message: '修改用户密码成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '修改用户密码失败',
                type: 'error'
              });
            }
            this.passwordResetCancel()
          })
        }
      })
    },
    resetpasword (val) {
      this.passwordreset = true
      this.resetForm.id = val.id
    },
    enable (val) {
      const text = val.status===0 ? '禁用后该用户将不能登录，确定禁用？' : '启用后该用户将能正常登录，确定启用？'
      const data = {
        id: val.id,
        status: val.status===0 ? 1: 0
      }
      this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.backUpdate(data).then(res => {
            if (res.code === 0) {
              this.getList()
              this.$message({
                message: val.status===0? '禁用该用户成功' : '启用该用户成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: val.status===0? '禁用该用户失败' : '启用该用户失败',
                type: 'error'
              });
            }
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/account.less';
</style>