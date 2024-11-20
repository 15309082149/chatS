import s from './addfriend.module.scss'
import { SearchOutlined,PlusOutlined,FormOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import { message, Modal } from "antd";
import { useRef, useState, useEffect } from 'react'
import user from '../../store/user'
import request from '../../util/request'
import Application from '../../components/application/application'
const Addfriend = () => {
    const name = user((state) => state.username)
    const userid = user((state) => state.userid)
    const [display,setd] = useState(false)
    const [self, setself] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [info, setinfo] = useState()
    const value = useRef(null)
    const showModal = (e) => {
        setinfo(e)
        setIsModalOpen(true);
      };
    const handleOk = () => {
        if(value.current.value === '') {
            message.error({
                type: 'error',
                content: '输入不能为空！'
            })
            return
        }
        request.get('/changein',{
            params: {
                column: info,
                value: value.current.value,
                userid: userid
            }
        }).then(result=>{
            console.log(result)
        })
        setIsModalOpen(false);
      };
    const handleCancel = () => {
        setIsModalOpen(false);
      };
    function add(item) {
        if(item === name) {
            message.error({
                type: 'error',
                content: '不能添加你自己！'
            })
            return
        } else {
        request.get('/checkadd',{
        params: {
            fromname:name,
            toname:item
        }
    }).then(result => {
        if(result !== '') {
            message.error({
                type: 'error',
                content: '您已发送或添加过该用户'
            })
            return
        } else {
              request.get('/addfriend',{
            params: {
                fromname: name,
                toname: item
            }
        }).then(result => {
            if(result) {
                message.success({
                    type: 'success',
                    content: '发送成功！'
                })
            }
        })
        }
    })
}
    }
    const sbar = useRef(null)
    const [usera,setusera] = useState(null)
    function search() {
        if(sbar.current.value === '') {
            message.error({
              type: 'error',
              content: '不能为空！',
          });
        } else {
            request.get('/finduser',{
                params: {
                    toname: sbar.current.value
                }
            }).then(result => {
                if(result === '') {
                    message.error({
                        type: 'error',
                        content: '查无此人',
                    });
                    setusera(null)
                } else {
                    setusera(result)
                }
            })
        }
    }
    useEffect(()=>{
        request.get('/finduser',{
            params:{
            toname: name
            }
        }).then((result) => {
            if(result === '') {
                return
            }
            else {
                setself(result)
            }
        })
    },[])
    return(
        <div className={s.all}>
            <div className={s.search}>
                <div className={s.text}>添加好友</div>
                <div className={s.searchbar}>
                    <input className={s.input} ref={sbar}></input>
                    <button className={s.button} onClick={()=>{search()}}><SearchOutlined /></button>
                </div>
                <div className={s.mid}>
                {display && <Application username={name}/>}
                {!usera && !display && <Empty className={s.empty} description=""/>}
                {usera && <div className={s.result}>
                           <div className={s.ava}>
                             <img src={require('../../static/img/mor.jpeg')}></img>
                           </div>
                           <div className={s.name}>{usera.username}</div>
                           <div className={s.addb} onClick={()=>{add(usera.account)}}><PlusOutlined /></div>
                        </div>}
                        </div>
                        <div className={s.aplica}>
                          <div className={s.apbutton} onClick={()=>{setd(!display)}}>好友申请</div>
                        </div>
            </div>
            <div className={s.self}>
                <div className={s.text}>个人信息</div>
                <div className={s.card}>
                    <div className={s.cardava}>
                        <img src={require('../../static/img/mor.jpeg')} className={s.img}></img>
                    </div>
                    <div className={s.mode}>
                        <div className={s.title}>用户名</div>
                        {self && <div className={s.content}>{self.username}</div>}
                        <div className={s.change} onClick={()=>{showModal('username')}}><FormOutlined /></div>
                    </div>
                    <div className={s.mode}>
                        <div className={s.title}>账号</div>
                        {self && <div className={s.content}>{self.account}</div>}
                        <div className={s.change}></div>
                    </div>
                    <div className={s.mode}>
                        <div className={s.title}>密码</div>
                        {self && <div className={s.content}>{self.passwords}</div>}
                        <div className={s.change} onClick={()=>{showModal('passwords')}}><FormOutlined /></div>
                    </div>
                    <div className={s.mode}>
                        <div className={s.title}>个人简介</div>
                        {self && <div className={s.content}>{self.intro}</div>}
                        <div className={s.change} onClick={()=>{showModal('intro')}}><FormOutlined /></div>
                    </div>
                    <Modal title="请输入要修改的信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <input className={s.input1} ref={value}></input>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Addfriend