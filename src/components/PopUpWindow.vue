<template>
    <section class="popUpWindow">
        <header>
            <button class="closeB">
                <img :src="crossIcon" alt="">
            </button>
        </header>

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

</style>