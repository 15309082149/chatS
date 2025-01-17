//基于zustand，用于储存用户ID，现已废弃

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// import { persist } from 'zustand-persist';

const user = create(persist((set) => ({
  changenum: '',
  userid: '',
  username: '',
  setid:(action)=>{
    set((state)=>({userid: action}))
  },
  setname:((action)=>{
    set((state)=>({username: action}))
  }),
  setchangenum:((action) =>{
    set((state)=>({changenum: action}))
  })

                      
}),
{
      // 持久化配置项
      key: 'settings', // localStorage 中的 key 值
      whitelist: ['theme'], // 只持久化 theme 状态
      blacklist: [], // 不持久化任何状态
      debug: false, // 是否在控制台输出调试信息
    }
  )
)
export default user