<template>
  <div class="main flex-center"
       style="height:100%">
    <a-form id="formLogin"
            class="user-layout-login"
            ref="formLogin"
            :form="form"
            @submit="handleSubmit">
      <a-alert v-if="isLoginError"
               type="error"
               showIcon
               style="margin-bottom: 24px;"
               message="账户或密码错误" />
      <a-form-item>
        <a-input size="large"
                 type="text"
                 placeholder="账户"
                 v-decorator="[
                'name',
                {rules: [{ required: true, message: '请输入帐户名' }]}
              ]">
          <a-icon slot="prefix"
                  type="user"
                  :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input-password size="large"
                          placeholder="密码"
                          v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]">
          <a-icon slot="prefix"
                  type="lock"
                  :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input-password>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button size="large"
                  type="primary"
                  htmlType="submit"
                  class="login-button"
                  :loading="state.loginBtn"
                  :disabled="state.loginBtn">确定</a-button>
      </a-form-item>
    </a-form>

  </div>
</template>

<script>

import storage from 'store'
import { loginApi } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { mapActions } from 'vuex'
import { userLogin } from '@/api/user'
import { getDataSetlist, getAllField, getAllExceldata } from '@/api/dataset'
export default {
  components: {

  },
  data () {
    return {

      loginBtn: false,

      isLoginError: false,

      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  created () {

  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
      } = this

      this.state.loginBtn = true

      validateFields((err, values) => {
        if (!err) {
          userLogin(values)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              this.state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            this.state.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess (res) {
      storage.set(ACCESS_TOKEN, res.data.token)
      /** 
      this.$cookie.set('name', res.data.name)
      this.$cookie.set('uuid', res.data.uuid)
      this.$cookie.set('token', res.data.token)
      */
      /**
        getDataSetlist({ type: 'excel' }).then(res => {
          debugger
          this.$router.push({ path: '/login' })
        }) */
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${res.data.name}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
