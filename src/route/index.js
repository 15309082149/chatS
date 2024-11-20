import { createBrowserRouter } from 'react-router-dom'
import  Index  from '../pages/index/index.jsx'
import Login from '../pages/login/login.jsx'
import Chat from '../pages/chat/chat.jsx'
import Set from '../pages/set/set.jsx'
import Self from '../pages/self/self.jsx'
import Friend from '../pages/friend/friend.jsx'
const router = createBrowserRouter([
    {path: '/index', element: <Index />, children:[
        {path: 'chat' ,element: <Chat />},
        {path: 'set', element: <Set />},
        {path: 'self',element:<Self />},
        {path: 'friend', element:<Friend />}
    ]},
    {path: '/', element:<Login />},
    {path: '/login',element: <Login />},
])


export default router