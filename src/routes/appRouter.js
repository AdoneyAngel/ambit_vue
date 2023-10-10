import { createRouter, createWebHashHistory } from 'vue-router'

import LoginPage from "@/pages/login/LoginIndex.vue"
import SignUpForm from "@/pages/login/forms/SignUp.vue"
import SignInForm from "@/pages/login/forms/SignIn.vue"
import PrincipalPage from "@/pages/guides/guidesList/LayoutPage.vue"
import GuideEditor from "@/pages/guides/guideEditor/LayoutPage.vue"
import GuideVisualizer from "@/pages/guides/visualizer/GuideVisualizer.vue"
import OwnerGuideList from "@/pages/guides/guidesList/OwnerGuideList.vue"
import JoinedGuideList from "@/pages/guides/guidesList/JoinedGuideList.vue"
import SearchGuide from "@/pages/guides/search/SearchGuide.vue"
import FoundGuideList from "@/components/FoundGuidesList.vue"
import ProfilePage from "@/pages/profile/visualizer/LayoutPage.vue"
import ProfileVisualizer from "@/pages/profile/visualizer/ProfileVisualizer.vue"

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
        children: [
            {
                path: "/owner",
                component: OwnerGuideList,
                name: "ownerguides"

            },
            {
                path: "/joined",
                component: JoinedGuideList,
                name: "joinedguides"

            }
        ]
    },
    {
        path: "/editor/:guideCode",
        name: "guideeditor",
        component: GuideEditor,
        props: true
    },
    {
        path: "/Visualizer/:guideCode",
        name: "guidevisualizer",
        component: GuideVisualizer,
        props: true
    },
    {
        path: "/search",
        name: "searchguide",
        props: true,
        component: SearchGuide,
        children: [
            {
                path: ":guideName",
                component: FoundGuideList,
                name: "guidesfound",
                props: true
            }
        ]
    },
    {
        path: "/profile",
        name: "profile",
        component: ProfilePage,
        children: [
            {
                path: "visualizer/:userMail",
                name: "profilevisualizer",
                component: ProfileVisualizer,
                props: true
            }

        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: appRoutes
})

export default router