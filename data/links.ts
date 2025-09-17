import { MdOutlineAccountCircle, MdOutlineDashboard, MdAdminPanelSettings } from "react-icons/md";
import { FaHome } from "react-icons/fa"
import { IoIosLogIn, } from "react-icons/io";

export default {Links : [
    {
      name: "home",
      path: "/", //with landing page that transitions the word of God
      icon: FaHome,
    },
    {
      name: "login",
      path: "/login", //with landing page that transitions the word of God
      icon: IoIosLogIn,
    },
    {
      name: "signup",
      path: "/signup", //with landing page that transitions the word of God
      icon: MdOutlineAccountCircle,
    },
    {
      name: "admin",
      path: "/admin", //with landing page that transitions the word of God
      icon: MdAdminPanelSettings,
    },
    
    
  ]
}