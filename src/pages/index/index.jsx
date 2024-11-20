import s from './index.module.scss'
import Pcbar from '../../components/pcbar/pcbar'
import Chat from '../chat/chat'
import { useRef,useState } from 'react'
import request from '../../util/request'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
const Index = () => {
    return(
        <div className={s.all}>
          <div className={s.mid}>
            <div className={s.bar}>
                <Pcbar></Pcbar>
            </div>
            <div className={s.function}>
                <Outlet />  
            </div>
          </div>
        </div>
    )
}

export default Index