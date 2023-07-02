import { createRouter, createWebHashHistory } from 'vue-router'

import LoginPage from "@/pages/login/LoginIndex.vue"
import SignUpForm from "@/pages/login/forms/SignUp.vue"
import SignInForm from "@/pages/login/forms/SignIn.vue"
import PrincipalPage from "@/pages/guides/guidesList/LayoutPage.vue"

const appRoutes = [
    {
        path: "/login",
        component: LoginPage,
        children: [
            {
                path: "signin",
                component: SignInForm,
                name: "signin"
            },
            {
                path: "signup",
                component: SignUpForm,
                name: "signup"
            },
        ]
    },
    {
        path: "/",
        component: PrincipalPage,
        name: "home"
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: appRoutes
})

export default router