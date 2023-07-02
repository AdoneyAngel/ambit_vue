<template>
    <div id="passwordInputContainer" :class="className">
        <PasswordInput :show="showInput" :callback="callback"/>
        <button  @click="switchShowInput" :class="{'hidden' : !showInput}" type="button">
            <img :src="eyeIcon" alt="">
        </button>
    </div>
</template>

<script>
import { ref } from 'vue';
import PasswordInput from './PasswordInput.vue';
import eyeIcon from "@/assets/images/eye.png"

export default {
    components: {
        PasswordInput
    },
    props: {
        callback: Function,
        className: String
    },
    data(){
        return {
            showInput: ref(false),
            eyeIcon
        }
    },
    methods: {
        switchShowInput(){
            this.showInput = !this.showInput
        }
    }
}

</script>

<style scoped>

button{
    width: 35px;
    height: 35px;
    border: none;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin: auto;
    margin-left: 10px;
    background: transparent;
    position: relative;
}
button:hover{
    box-shadow: none;
}
img{
    width: 100%;
}
#passwordInputContainer{
    display: flex;
    flex-direction: row;
    align-items: center;
}

button::after{
    content: "";
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 100px;
    background: var(--purple);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(30deg);
    animation: showIconAni .2s var(--animationTransition);
    opacity: 0;
}
.hidden > img{
    opacity: .5;
    width: 80%;
}
.hidden::after{
    width: 30px;
    height: 3px;
    animation: hiddenIconAni .2s var(--animationTransition);
    opacity: 1;
}

@keyframes hiddenIconAni{
    0%{
        height: 30px;
        opacity: 0;
    }
    100%{
        height: 3px;
        opacity: 1;
    }
}

@keyframes showIconAni{
    0%{
        height: 3px;
        opacity: 1;
    }
    100%{
        height: 30px;
        opacity: 0;
    }
}

</style>