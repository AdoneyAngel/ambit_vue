<template>
    <ul class="guideList">

        <div v-if="!guides.length" class="emptyNotifier">Empty</div>

        <li 
            @contextmenu.prevent="setGuideItemContextMenu(guide)" 
            v-for="guide in guides" 
            :key="guide.code" 
            class="guideItem"
            :style="{
                boxShadow: contextMenuGuideItem === guide ? '0px 6px 8px rgb(0 0 0 / 15%)' : 'none'
            }"
            @click="handleGuideClick(guide.code)"
            >
            <div class="guideItemInfo">

                <div class="guideContent">
                    <h1>{{ guide.name }}</h1>
                </div>

                <div class="guideFooter">
                    <p class="guideUserOwnerName">GUIDE OWNER</p>

                    <p class="guideDate">
                        <span class="pointSeparator">
                            {{ guide.date.month }}
                        </span>
                        
                        <span class="pointSeparator">
                            {{ guide.date.day }}
                        </span>
                        
                        <span>
                            {{ guide.date.year }}
                        </span>
                    </p>
                </div>

            </div>

            <div v-if="contextMenuGuideItem === guide" class="guideContextMenu">
                <button v-if="isOwner" @click="openEditor(guide.code)" class="btnContextMenu">Edit</button>
                <button @click="() => deleteGuide(guide.code)" class="btnContextMenu" v-if="isOwner">Delete</button>
                <button @click="() => joinedGetOut(guide.code)" class="btnContextMenu" v-if="!isOwner">Get out</button>
                <button class="btnContextMenu">Info</button>
            </div>    
        </li>

    </ul>
</template>

<script>
import router from '@/routes/appRouter';
import { ref } from 'vue';
import { deleteGuide, deleteJoinedGuide } from "@/API/DB/db"
import { getData } from '@/API/localStorage';
import { setNotification } from "@/assets/notifications"

export default {
    data(){
        return {
            contextMenuGuideItem: ref({})
        }
    },
    props: {
        guides: Array,
        isOwner: ref(false)
    },
    methods: {
        setGuideItemContextMenu(guide){
            if(this.contextMenuGuideItem === guide){
                this.contextMenuGuideItem = {}
                
            }else {
                this.contextMenuGuideItem = guide
            }
        },
        handleGuideClick(guideCode){
            if (this.contextMenuGuideItem.code !== guideCode){
                router.push(`/visualizer/${guideCode}`)

            }
        },
        openEditor(guideCode){
            router.push(`/editor/${guideCode}`)
        },
        async deleteGuide(guideCode){
            await deleteGuide(guideCode)

            setNotification("Guide deleted", "normal")
        },
        async joinedGetOut(guideCode){
            const userMail = getData("userMail")

            await deleteJoinedGuide(userMail, guideCode)
            setNotification("You have left the guide", "normal")

        }
    }
}

</script>

<style>

</style>