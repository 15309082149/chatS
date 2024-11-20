import s from './login.module.scss'
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
// import login from '../../../api/login'
import request from '../../util/request'
import { message } from "antd";
import user from '../../store/user'
const Login = () => {
  const navigate = useNavigate()
  const setid = user((state) => state.setid)
  const setname = user((state)=> state.setname)
    const account = useRef(null)
    const passwords = useRef(null)
    function logina() {
      const a = account.current.value
      const p = passwords.current.value
      if(!a || !p) {
          message.error({
              type: 'error',
              content: '账号或密码不能为空！',
          });
          return 
          };
      request.get('/login',{
        params: {
          account: a,
          passwords: p,
        }
      }).then(result => {
        if(result !== '') {
          message.success("登录成功！")
          setid(result.userid)
          setname(result.account)
          navigate(`/index/chat`)
          // navigate(`/index/chat/?name=${result.username}`)
          return 1
        } else {
          message.error("账号或密码错误！")
          return 0
        }
      })
    }
  
    return (
        <div className={s.all}>
            <div className={s.mid}>
              <div className={s.login}>Login</div>
              <input className={s.input} placeholder='请输入账号' ref={account}></input>
              <input className={s.input} placeholder='请输入密码' type="password" ref={passwords}></input>
              <button className={s.botton} onClick={()=>{logina()}}>登录</button>
            </div>
        </div>
    )
}

export default Login