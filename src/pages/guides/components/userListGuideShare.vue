<template>
    <div :class="'userListGuideShareContainer' + (opened ? ' userListGuideShareContainerOpened' : ' userListGuideShareContainerClosed')">
        <header @click="switchOpenList">
            <img :src="groupManageIcon" alt="">
            <p>0</p>
        </header>

        <ul class="userListGuideShare">
            <li><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, perspiciatis!</p></li>
            <li><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, perspiciatis!</p></li>
            <li><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, perspiciatis!</p></li>
            <li><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, perspiciatis!</p></li>
            <li><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, perspiciatis!</p></li>
        </ul>
    </div>
</template>

<script>
import groupManageIcon from "@/assets/images/groupManage.png"
import { ref } from "vue";

export default {
    data() {
        return {
            groupManageIcon,
            opened: ref(false)
        }
    },
    methods: {
        switchOpenList() {
            this.opened = !this.opened
        }
    }
}

</script>

<style scoped>

.userListGuideShareContainer {
    margin-right: auto;
    margin-left: 40px;
    background: white;
    border-radius: 25px;
    max-height: 400px;
    position: absolute;
    bottom: 0;
    left: 0;
    animation: 1s openUserShared ease-in-out;
    box-shadow: 0px 0px 10px var(--purple);
}
.userListGuideShareContainerClosed {
    height: 45px;
    width: 100px;

}
.userListGuideShareContainerClosed > .userListGuideShare {
    display: none;
    opacity: 0;
}
.userListGuideShareContainerOpened > .userListGuideShare {
    display: flex;
    flex-direction: column;
    opacity: 1;
    animation: .5s openList ease-in-out;
}
.userListGuideShareContainerOpened > header > p{
    opacity: 0;
}
.userListGuideShareContainerOpened {
    height: auto;
    width: 300px;
}
.userListGuideShareContainer > header{
    display: flex;
    align-items: center;
    height: 45px;
    padding: 0 20px;
    cursor: pointer;
}
.userListGuideShareContainer > header > img{
    height: 60%;
}
.userListGuideShareContainer > header > p{
    margin-left: auto;
    text-align: right;
}
.userListGuideShare {
    list-style: none;
    padding: 10px 15px;
}
.userListGuideShare > li {
    width: 95%;
    border-radius: 5px;
    padding: 2px 5px;
    margin: 2px 0;
}
.userListGuideShare > li > p{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
}

@keyframes openList {
    0%{
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

</style>