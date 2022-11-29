<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <!-- 修改密码 -->
          <el-dropdown-item divided @click.native="handleChangePassword">
            <span style="display: block">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog width="30%" title="修改密码" :visible.sync="dialogStatus" @close="dialogStatus = false">
      <el-form ref="dataForm" :model="form" :rules="rules">
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入新密码" />
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogStatus=false">取消</el-button>
        <el-button type="primary" @click="changePassword">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { changePassword } from '@/api/user'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      form: {
        username: this.$store.getters.name,
        password: ''
      },
      dialogStatus: false,
      rules: {
        password: [{ required: true, message: '新密码必须设置', trigger: 'blur' }]
      },
      changPasswordForm: null
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    getUserInfo() {

    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 修改密码
    handleChangePassword() {
      console.log('修改密码')
      this.dialogStatus = true
    },
    // 修改密码
    changePassword() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          changePassword({ 'new_password': this.form.password }).then(() => {
            this.dialogStatus = false
            this.$notify({
              title: 'Success',
              message: '修改密码成功',
              type: 'success',
              duration: 2000
            })
          })
          this.form.password = ''
        } else {
          this.$notify({
            title: 'fail',
            message: '修改密码失败',
            type: 'danger',
            duration: 2000
          })
          this.form.password = ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.dialog-footer{
  display: flex;
  justify-content: right;
}
</style>
