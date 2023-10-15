import { createRouter, createWebHistory } from "vue-router";
import HomeVue from "../pages/Home.vue";
import LoginVue from "../pages/user/Login.vue";
import RegisterVue from "../pages/user/Register.vue";
import ProfileEditorVue from "../pages/user/ProfileEditor.vue";
import MessageVue from "../pages/user/Message.vue";
import Forgot from '../pages/user/Forgot.vue';
import TeamsVue from "../pages/team/Search.vue";
import CreateVue from "../pages/team/Create.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeVue,
    meta: {
      title: '首页',
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginVue,
    meta: {
      title: '用户登录',

    },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterVue,
    meta: {
      title: '用户注册',

    },
  },
  {
    path: "/profileEditor",
    name: "Profile",
    component: ProfileEditorVue,
    meta: {
      title: '修改个人信息',
      isAuth: true,
    },
  },
  {
    path: "/teams",
    name: "Teams",
    component: TeamsVue,
    meta: {
      title: '团队',
      isAuth: true,
    },
  },
  {
    path: "/create",
    name: "Create",
    component: CreateVue,
    meta: {
      title: '创建团队',
      isAuth: true,
    }
  },
  {
    path: "/message",
    name: "Message",
    component: MessageVue,
    meta: {
      title: '消息通知',
      isAuth: true,
    }
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: Forgot,
    meta: {
      title: '忘记密码',
    },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
  //如果路由需要跳转
  if (to.meta.isAuth) {
    //判断 如果school本地存储是qinghuadaxue的时候，可以进去
    if (localStorage.getItem('login') === 'true') {
      next()  //放行
    } else {
      alert('抱歉，您无权限查看！')
    }
  } else {
    // 否则，放行
    next()
  }
});

export default router;