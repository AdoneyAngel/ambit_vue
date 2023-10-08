<template>

<div id="guideStepTitleList">
    <div v-for="(step, index) in guideTitles" :key="index">
        <h3 @click="moveScroll(`itemPos=${index}`)">
            {{ step }}
        </h3>
    </div>
</div>

</template>

<script>

export default {
    props: {
        guideTitles: Object
    },
    methods: {
        moveScroll(id) {
            console.log(document.getElementById(id).scrollTop)
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
        }
    }
}

</script>