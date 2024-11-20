import s from './chat.module.scss'
import { useEffect,useState,useRef } from 'react'
import user from '../../store/user'
import React from 'react'
// import {  useSearchParams } from 'react-router-dom'
import Picker from 'emoji-picker-react'
import {
  SmileOutlined,
} from '@ant-design/icons';
import { message } from "antd";
import request from '../../util/request'
import formattedDate from '../../util/formattedDate'
const Chat = () => {
    // const input = useRef(null)
    // const [params] = useSearchParams()
    const [showPicker, setShowPicker] = useState(false);
    const [message1, setMessage] = useState('');
    // const userid = user((state)=>state.userid)
    // const name = params.get('name')            //测试专用，从路由获取自己姓名
    const name = user((state) => state.username)            //上线使用，从local获取自己姓名，防止多开
    const [users,setusers] = useState([])      //用户列表
    const [nowto,setnowto] = useState('')        //对方name
    const [mes,setmes] = useState([])          //消息列表
    var socket = new WebSocket('ws://127.0.0.1:8080/websocket/' + name)         //与websocket服务器建立连接
    function setnoww(item,item2) {
        let e = item === name ? item2 : item                //点击卡片切换聊天框功能
            setnowto(e)                     //设置此时正在聊天的
            request.get("/findmes",{
                params:{
                    fromname: name,
                    toname: e
                }
            }).then(result=>{           //获取以往消息，历史记录
                setmes(result)
            })
            var con = document.getElementById('messa')      //滚动到底部
            con.scrollTop = con.scrollHeight
        }
    useEffect(()=> {
        const all = () => {
            request.get('/getfriend',{
            params:{
                username:name
            }
        }).then(result => {
            setusers(result)
        })
        }
        all()
    // socket.onopen =()=>{scroll-behavior: smooth;
    //             console.log('opening')
    //         }
    },[])
    useEffect(()=> {
        socket.onmessage = (data) => {
                    const datee = formattedDate(new Date())     //websocket方法，当获取消息或者发送消息时执行
                    const me = JSON.parse(data.data)
                    if(!me.users && me.from === nowto) {            //如果是正在聊天的哥们发送给自己的就推入消息列表，若其他人便不管，点击时再从数据库获取消息列表
                        setmes(current => [...current,{fromname:nowto,toname:name,text:me.text,time:datee,status:null}])
                    }
                    var con = document.getElementById('messa')
                    con.scrollBehavior = "smooth"
                    con.scrollTop = con.scrollHeight
    }})
        function sendMessage() {
            if(nowto === '') {
                message.error({
                    type:'error',
                    content:'请选择一个好友进行聊天！'
                })
                return
            }
            if(message1 === '') {
                message.error({
                    type: 'error',
                    content: '发送消息不能为空！',
          }
           );
           return
            }
            const datee = formattedDate(new Date())
            setmes(current => [...current,{fromname:name,toname:nowto,text:message1,time:datee,status:null}])
            let messagec = {from: name,to: nowto, text: message1}
            socket.send(JSON.stringify(messagec))
            var con = document.getElementById('messa')
            con.scrollBehavior = "smooth"
            con.scrollTop = con.scrollHeight
            setMessage('')
            socket.onerror = function(event) {
            console.log('连接错误: ', event);          //发送消息
};
            // socket.on('message',(data)=>{
            //     console.log(data)
            // })
            // var messageInput = document.getElementById('messageInput');
            // stompClient.send('/app/send', {}, messageInput.value);
            // messageInput.value = '';
        
            

        }

    const onEmojiClick = (emojiData, event) => {
        console.log(emojiData)
        setMessage(message1 + emojiData.emoji)
    };
    return(
        <div className={s.all}>
            <div className={s.navbar}>
               <div className={s.toptext}>Clarca的聊天室</div>
               <div className={s.mid}>
                <div className={s.midtext}>聊天列表</div>
               </div>
               <div className={s.bottom}>
                {Array.isArray(users) && users.map((item,index) => {
                    return(
                        <div className={s.mod+" "+s.acmod} onClick={()=>{setnoww(item.fromname,item.toname)}} key={index}>
                    <div className={s.ava}>
                        <div className={s.img}>
                            <img src={require("../../static/img/mor.jpeg")}></img>
                        </div>
                    </div>
                    <div className={s.textarea}>
                        {item.fromname === name ? <div className={s.name}>{item.toname}</div> : <div className={s.name}>{item.fromname}</div>}
                        {/* <div className={s.intro}>front-end developer</div> */}
                    </div>
                </div>
                    )
                })}
               </div>
            </div>
            <div className={s.chat}>
                <div className={s.chattop}>
                    <div className={s.mod1}>
                    <div className={s.ava}>
                        <div className={s.img}>
                            <img src={require("../../static/img/mor.jpeg")}></img>
                        </div>
                    </div>
                    <div className={s.textarea}>
                        {nowto ? <div className={s.name}>{nowto}</div> : <div className={s.name}>选择一个好友进行聊天</div>}
                        {/* <div className={s.intro}>front-end developer</div> */}
                    </div>
                </div>
                </div>
                <div className={s.chatbottom}>
                    <div className={s.chatarea}>
                        <div className={s.messa} id="messa">
                        {Array.isArray(mes) && mes.map((item,index) => {
                            if(item.fromname === name) {
                                return (
                                   <div className={s.self} key={index}>
                                <div className={s.content1}>{item.text}</div>
                                <div className={s.conbo}>
                                    {item.time}
                                </div>
                            </div>
                                )
                            }
                            else {
                                return(
                        
                            <div className={s.dm} key={index}>
                                <div className={s.content}>{item.text}</div>
                                <div className={s.conbo}>
                                    {item.time}
                                </div>
                            </div>
                                )
                            }
                        })}
                        </div>
                        <div className={s.input}>
                            <div className={s.picker}>
                        {showPicker && <Picker width="100%" height="300px" onEmojiClick={onEmojiClick} ></Picker>}</div>
                            <div className={s.emoji} onClick={() => setShowPicker(!showPicker)}><SmileOutlined /></div>
                            <div className={s.left}><input className={s.inputa} value={message1} onChange={(e) => setMessage(e.target.value)} type="text"/></div>
                            <div className={s.send} onClick={()=>{sendMessage()}}>Send</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat