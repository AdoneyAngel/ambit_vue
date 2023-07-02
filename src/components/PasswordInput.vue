<template>
    <input v-model="inputValue" :type="showInput ? 'text' : 'password'">
</template>

<script>
import { ref } from 'vue'

export default {
    data(){
        return {
            showInput: ref(this.show),
            inputValue: ref("")
        }
    },
    methods: {
        switchShowInput(){
            this.showInput = !this.showInput
        }
    },
    props: {
        callback: Function,
        show: Boolean
    },
    watch: {
        inputValue(newValue){
            this.callback(newValue)
        },

        show(newShow){
            this.showInput = newShow
        }
    }
}

</script>