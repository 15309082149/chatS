import { useEffect, useState } from 'react';
import s from './pcbar.module.scss'
import { MessageOutlined, AppstoreOutlined, NodeIndexOutlined, SettingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import user from '../../store/user'
const Pcbar = () => {
    const changenum = user((state)=>state.changenum)
    const setchangenum = user((state)=>state.setchangenum)
    const navigate = useNavigate()
    useEffect(()=> {
        let y = changenum *100
        const lp = document.getElementById('lp')
        lp.style.transform = `translate(0px,${y}%)`
    },[])
    function change(e) {
        setchangenum(e)
        let y = e *100
        const lp = document.getElementById('lp')
        lp.style.transform = `translate(0px,${y}%)`
        switch(e) {
            case 0: navigate('/index/chat') 
            break;
            case 1: navigate('/index/friend')
            break;
            case 2: navigate('/index/self')
            break;
            case 3: navigate('/index/set')
            break;
            default:break;
        }
    }
    return(
        <div className={s.all}>
            <div className={s.navs+" "+s.noactive} id="navs">
                <div className={s.nav}>
                <div className={s.conts+" "+s.lp} id="lp"></div>
                <div className={s.conts} onClick={()=>{change(0)}}>
                    <div className={s.icon}>
                        <MessageOutlined /></div>
                </div>
                <div className={s.conts} onClick={()=>{change(1)}}>
                    <div className={s.icon}>
                         <AppstoreOutlined /></div>
                </div>
                <div className={s.conts}>
                    <div className={s.icon} onClick={()=>{change(2)}}> 
                        <NodeIndexOutlined /></div>
                </div>
                <div className={s.conts}>
                    <div className={s.icon} onClick={()=>{change(3)}}> 
                        <SettingOutlined /></div>
                </div>
                </div>
            </div>
            <div className={s.ava}></div>
        </div>
    )
}

export default Pcbar