<template>
    <div :class="'userListGuideShareContainer' + (opened ? ' userListGuideShareContainerOpened' : ' userListGuideShareContainerClosed')">
        <header @click="switchOpenList">
            <img :src="groupManageIcon">
            <p v-if="!opened">{{ usersShared ? usersShared.length : 0 }}</p>
            <img @click="addUser" v-if="opened" :src="plusIcon" class="addB">
        </header>

        <ul class="userListGuideShare">
            <h1 class="emptySharedUsersText" v-if="usersShared && !usersShared.length && opened">Nobody shared</h1>
            <li v-for="user in usersShared" :key="user">
                <p>{{ user }}</p>
                <button @click="removeSharedUser(user)">-</button>
            </li>
        </ul>
    </div>
</template>

<script>
import groupManageIcon from "@/assets/images/groupManage.png"
import plusIcon from "@/assets/images/plus.png"

import { ref } from "vue";

export default {
    data() {
        return {
            groupManageIcon,
            plusIcon,
            opened: ref(false)
        }
    },
    props: {
        openGeneralPopUp: Function,
        addSharedUser: Function,
        removeSharedUser: Function,
        usersShared: Array
    },
    methods: {
        switchOpenList() {
            this.opened = !this.opened
        },
        addUser() {

            this.openGeneralPopUp({
                title: "Share guide",
                placeholder: "Email",
                buttonText: "Add",
                callBack: this.addSharedUser
            })
        }
    }
}

</script>

<style scoped>

.userListGuideShareContainer {
    margin-right: auto;
    margin-left: 40px;
    background: white;
    max-height: 400px;
    position: absolute;
    bottom: 0;
    left: 0;
    animation: 1s openUserShared ease-in-out;
}
.userListGuideShareContainerClosed {
    height: 45px;
    width: 100px;
    border-radius: 25px;
    box-shadow: 0px 0px 10px var(--purple);
}
.userListGuideShareContainerClosed > .userListGuideShare {
    display: none;
    opacity: 0;
}
.userListGuideShareContainerClosed:hover {
    filter: brightness(var(--generalHoverBrightness));
}
.userListGuideShareContainerOpened > .userListGuideShare {
    display: flex;
    flex-direction: column;
    opacity: 1;
    animation: .5s openList;
}
.userListGuideShareContainerOpened > header > p{
    opacity: 0;
}
.userListGuideShareContainerOpened {
    height: auto;
    width: 300px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px grey;
    padding: 5px 0;
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
.userListGuideShareContainer > header > .addB {
    margin-left: auto;
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
    margin: 5px 0;
    cursor: default;
    display: flex;
}
.userListGuideShare > li > p{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
}
.userListGuideShare > li > button {
    margin: 0;
    margin-left: auto;
    padding: 3px 10px;   
}
.userListGuideShare > li > button:hover {
    box-shadow: none;
}
.emptySharedUsersText {
    font-size: 20px;
    color: rgb(165, 165, 165);
    font-weight: 200;
    text-align: center;
    height: 25px;
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