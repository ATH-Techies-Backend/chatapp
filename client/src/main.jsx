import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
// import App from './App.jsx'
import './index.css'
import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Chatroom from './components/Chatrooms';
import NotFound from './components/NotFound';
/*Tips on fixing client side routing 
- Avoid using <a> tags use <Link/>
- Use useNavigate() instead of window.location.href to move from page to page
*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement:<NotFound/>
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "signup",
    element: <Signup/>
  },
  {
    path: "chatroom/:id",
    element: <Chat/>
  },
  {
    path: "chatrooms",
    element: <Chatroom/>
  },
  {
    path: "*",
    element: <NotFound/>
  },

]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
   <RouterProvider router={router}/>
  </>
)
