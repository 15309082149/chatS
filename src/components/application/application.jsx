import s from './application.module.scss'
import { useEffect, useState } from 'react'
import { message } from "antd";
import React from 'react'
import request from '../../util/request'
const Application = (props) => {
    const [arr,setarr] = useState([])
    function agr(item,index) {
        request.get('/agreen',{
            params: {
                fromname: item,
                toname: props.username
            }
        }).then(result =>{
            if(result) {
                message.success({
                    type: 'success',
                    content: '添加成功！'
                })
                console.log(index)
                setarr(arr.slice(index+1))
            } else {
                message.error({
                    type: 'error',
                    content: '发生错误！'
                })
            }
        })
    }
    useEffect(()=>{
        request.get('/getap',{
            params: {
                username:props.username
            }
        }).then(result => {
            setarr(result)
        })
    },[])
    return(
        <div className={s.all}>
            {arr.length === 0 && <div className={s.null}>暂无</div>}
            {Array.isArray(arr) && arr.map((item,index) => {
                return(
                <div className={s.mode}>
                <div className={s.ava}>
                    <img src={require('../../static/img/mor.jpeg')}></img>
                </div>
                {item.fromname === props.username ? <div className={s.name}>{item.toname}</div> : <div className={s.name}>{item.fromname}</div>}
                {item.toname === props.username ? (<div className={s.addb} onClick={()=>{agr(item.fromname,index)}}>同意</div>) : (<div className={s.addb1}>待同意...</div>)}
            </div>
                )
            })}
        </div>
    )
}
export default React.memo(Application)