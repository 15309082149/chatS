import s from './friend.module.scss'
import Addfriend from '../../components/addfriend/addfriend'
import {useEffect, useState} from 'react'
import request from '../../util/request'
import user from '../../store/user'
import {
  DeleteOutlined
} from '@ant-design/icons';
import {  Modal,Button, message } from 'antd';
const Friend = () => {
    const name = user((state) => state.username)
    const [friend,setf] = useState([])
  const deletee = (e1,e) => {
    console.log("11")
    request.get('/deletef',{
        params: {
            fromname:e1,
            toname: e
        }
    }).then(result => {
        if(result) {
            message.success({
                type:'success',
                content: '删除成功！'
            })
            return
        }
        else{
            message.error({
                type:'error',
                content: '发生异常'
            })
        }
    })
  };
    useEffect(()=>{
        request.get('/getfriend',{
            params:{
                username:name
            }
        }).then(result => {
            requestAnimationFrame(() => {
                setf(result)
            })
        })
    },[])
    return(
        <div className={s.all}>
            <div className={s.left}>
                <div className={s.toptext}>好友列表</div>
                <div className={s.list}>
                    {Array.isArray(friend) && friend.map((item,index) => {return(
                        <div className={s.friends}>
                        <div className={s.fava}>
                            <img src={require("../../static/img/mor.jpeg")}></img>
                        </div>
                        {item.fromname === name ? <div className={s.fname}>{item.toname}</div> : <div className={s.fname}>{item.fromname}</div>}
                        <div className={s.delete}>                      
                        <Button  color="danger" variant="solid" shape="circle" icon={<DeleteOutlined/>} onClick={()=>{deletee(item.fromname,item.toname)}}></Button>
                        </div>
                    </div>
                    )})}
                </div>
            </div>
            <Addfriend />
        </div>
    )
}

export default Friend