<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login"> 
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent ="sendCode">
                  {{overTimer>0?`已发送${overTimer}s`:'获取验证码'}}</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="text" maxlength="12" placeholder="密码" v-if="showPwd" v-model="pwd">
                  <input type="password" maxlength="12" placeholder="密码" v-else v-model="pwd">
                  <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码"  v-model="captcha">
                  <img class="get_verification" ref="captcha" src="http://localhost:4000/captcha" alt="captcha" @click="changeCaptcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      <alert-tip :alertText="alertText" v-show="AlertTip" @closeTip="closeTip"></alert-tip>
    </section>
</template>

<script>
import {mapState} from 'vuex'
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import {reqPwdLogin,reqSmsLogin,reqSendCode} from '../../api/index'

export default {
  data() {
    return {
      loginWay: true, //true代表短信登陆，false代表密码登录
      pwd:'', //密码
      showPwd: false, //是否显示密码
      captcha:'', //图片验证码
      overTimer:0, //计时时间
      phone:'' ,//手机号
      name:'',//用户名
      code:'',//短信验证码
      alertText:'', //提示文本
      AlertTip:false,//是否显示提示文本
    }   
  },

    computed: {
      rightPhone(){
        return /^1[3456789]\d{9}$/.test(this.phone)
      }
    },

    methods: {
    async sendCode() {
      if(this.overTimer===0){
        //启动倒计时
        this.overTimer=30   
        this.timer= setInterval(() => {
          this.overTimer--
          if(this.overTimer<=0){
          clearInterval(this.timer)
          this.overTimer=0
        }
        }, 1000)
        
        //发送Ajax请(向指定手机号发送短信验证码)
        const result= await reqSendCode(this.phone)
        if(result.code===1){
          //显示提示
          this.AlertTip=true
          this.alertText=result.msg
          //停止倒计时
          if(this.overTimer){
            this.overTimer=0
            clearInterval(this.timer)
          }
        }

        }     
       },

      async login(){
        let result
        //前台表单验证
        if(this.loginWay){ //短信登陆
          const {phone,rightPhone,code} = this
          if(!this.rightPhone){
              //alert('手机号码有误！')
              this.AlertTip=true
              this.alertText='手机号码有误！'
              return false
          }else if (!/^\d{6}$/.test(code)){
            //alert('验证码输入错误！')
             this.AlertTip=true
             this.alertText='验证码必须为6位数！'
              return false
          }

          //发送Ajax请求，请求短信登陆
             result = await reqSmsLogin(phone,code)

        }else{ // 用户名登陆
            const {name,pwd,captcha} = this
            if(!this.name){
              //alert('用户名必须指定')
               this.AlertTip=true
               this.alertText='用户名必须指定'
                return false
            }else if(!this.pwd){
              //alert('密码必须指定')
               this.AlertTip=true
               this.alertText='密码必须指定'
                return false
            }else if (!this.captcha) {
              //alert('验证码必须指定')
               this.AlertTip=true
               this.alertText='验证码输入错误！'
                return false
            }

            //发送Ajax请求，请求用户名密码登陆
             result = await reqPwdLogin({name,pwd,captcha})
               
        }

      //清除倒计时
       if(this.overTimer){
            this.overTimer=0
            clearInterval(this.timer)
          } 

      //根据结果数据处理
        if(result.code===0){
              const user = result.data
              //将user保存到vuex的state中
              this.$store.dispatch('saveUser',user)
              //跳转路由，去个人中心界面
              this.$router.replace('/profile')
            }else{
              //显示新的图片验证码
              this.changeCaptcha()
              //显示警告提示
              const msg = result.msg
              this.AlertTip=true
              this.alertText=msg
              this.captcha=''
              
            }

      },

      //关闭提示框
      closeTip(){
         this.AlertTip=false
         this.alertText=''
      },

      //获取新的图片验证码
      changeCaptcha(){
        //每次指定的src值要不一样，更改时间
        this.$refs.captcha.src='http://localhost:4000/captcha?time='+Date.now()
      }

    },

    components: { AlertTip },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
  .loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;
}
  .loginContainer .loginInner {
  padding-top: 60px;
  width: 80%;
  margin: 0 auto;
}
  .loginContainer .loginInner .login_header .login_logo {
  font-size: 40px;
  font-weight: bold;
  color: #02a774;
  text-align: center;
}
  .loginContainer .loginInner .login_header .login_header_title {
  padding-top: 40px;
  text-align: center;
}
  .loginContainer .loginInner .login_header .login_header_title >a {
  color: #333;
  font-size: 14px;
  padding-bottom: 4px;
}
  .loginContainer .loginInner .login_header .login_header_title >a:first-child {
  margin-right: 40px;
}
  .loginContainer .loginInner .login_header .login_header_title >a.on {
  color: #02a774;
  font-weight: 700;
  border-bottom: 2px solid #02a774;
}
  .loginContainer .loginInner .login_content >form >div {
  display: none;
}
  .loginContainer .loginInner .login_content >form >div.on {
  display: block;
}
  .loginContainer .loginInner .login_content >form >div input {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: 0;
  font: 400 14px Arial;
}
  input:focus {
  border: 1px solid #02a774;
}
  .login_message {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}
  .get_verification {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: 0;
  color: #ccc;
  font-size: 14px;
  background: transparent;
}

  .right_phone{
    color green
  }

  .login_verification {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}
  .login_verification .switch_button {
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: background-color 0.3s, border-color 0.3s;
  padding: 0 6px;
  width: 30px;
  height: 16px;
  line-height: 16px;
  color: #fff;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
  .login_verification .switch_button.off {
  background: #fff;
}
  .login_verification .switch_button.off .switch_text {
  float: right;
  color: #ddd;
}
  .login_verification .switch_button.on {
  background: #02a774;
}
.switch_circle {
  position: absolute;
  top: -1px;
  left: -1px;
  width: 16px;
  height: 16px;
  border: 1px solid #ddd;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  transition: transform 0.3s;
  
}
.right {
   transform translateX(30px)
}
    
  .login_hint {
  margin-top: 12px;
  color: #999;
  font-size: 14px;
  line-height: 20px;
}
  .login_hint >a {
  color: #02a774;
}
  .loginContainer .loginInner .login_content >form .login_submit {
  display: block;
  width: 100%;
  height: 42px;
  margin-top: 30px;
  border-radius: 4px;
  background: #4cd96f;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 42px;
  border: 0;
}
  .loginContainer .loginInner .login_content .about_us {
  display: block;
  font-size: 12px;
  margin-top: 20px;
  text-align: center;
  color: #999;
}
  .loginContainer .loginInner .go_back {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
}
  .loginContainer .loginInner .go_back >.iconfont {
  font-size: 20px;
  color: #999;
  }
</style>