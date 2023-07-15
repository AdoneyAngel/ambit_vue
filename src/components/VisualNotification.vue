<template>
    <div id="notificationContainer" v-if="notificationsList.length">
        <div v-for="notify in notificationsList" :key="notify.id" :class="notify.type == 'error' ? 'notifyImportant' : 'notifyNormal'">
            {{ notify.content }}
        </div>
    </div>
</template>

<script>
import {notifications} from "@/assets/notifications"

export default {
    data(){
        return {
            notificationsList: notifications.data
        }
    }
}

</script>

<style scoped>

#notificationContainer{
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    position: absolute;
    top: 0;
    width: 250px;
    padding: 10px;
    max-height: 95vh;
    overflow-y: auto;
}
#notificationContainer::-webkit-scrollbar{
    width: 0px;
}
#notificationContainer > div{
    padding: 12px 16px;
    margin: 5px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 15px -5px var(--purple);
    animation: notifyAni .15s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.notifyImportant{
    background: var(--notifyError);
}
.notifyNormal{
    background: var(--greypurple);
}

@keyframes notifyAni{
    0%{
        opacity: 0;
        transform: translateY(-50%) scale(.9);
    }
    100%{
        opacity: 1;
        transform: translateY(0%) scale(1);
    }
}

</style>