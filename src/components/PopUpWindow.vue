<template>
    <section class="popUpWindow">
    <div class="closeClick" @click="close"></div>

        <section class="content">
            <slot>


            </slot>
            
        </section>
    </section>
</template>

<script>

import crossIcon from "@/assets/images/cross.png"

export default {
    data() {
        return {
            crossIcon
        }
    },
    methods: {
        close() {
            this.$emit("closeFunc")
            console.log(0)
        }
    }
}

</script>

<style scoped>

.popUpWindow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100svh;
    background: rgba(0, 0, 0, 0.541);
    backdrop-filter: blur(4px);
    position: absolute;
    z-index: 3;
}
.content {
    z-index: 4;
}
header {
    position: absolute;
    top: 0;
    width: calc(100% - 40px);
    padding: 20px;
}
.closeB {
    background: transparent;
    margin: 0;
    width: 50px;
}
.closeB > img {
    width: 100%;
}
.closeB:hover {
    box-shadow: none;
}
.content {
    width: 60%;
    height: 80%; 
    display: flex;
    justify-content: center;
    align-items: center;
}
.closeClick{
    position: absolute;
    width: 100%;
    height: 100%;
}

</style>