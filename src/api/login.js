import request from '../util/request'
import { message } from "antd";
import user from '../store/user'
const setid = user((state) => state.setid)
const login = (a,p) => {
      
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
          return 1
        } else {
          message.error("账号或密码错误！")
          return 0
        }
      })
      }

      export default login