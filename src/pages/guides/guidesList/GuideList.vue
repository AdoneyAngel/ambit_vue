<template>
    <ul class="guideList">

        <li 
            @contextmenu.prevent="setGuideItemContextMenu(guide)" 
            v-for="guide in guides" 
            :key="guide.code" 
            class="guideItem"
            :style="{
                boxShadow: contextMenuGuideItem === guide ? '0px 6px 8px rgb(0 0 0 / 15%)' : 'none'
            }"
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
                <button>Edit</button>
                <button>Delete</button>
                <button>Info</button>
            </div>    
        </li>

    </ul>
</template>

<script>
import { ref } from 'vue';

export default {
    data(){
        return {
            contextMenuGuideItem: ref({})
        }
    },
    props: {
        guides: Array
    },
    methods: {
        setGuideItemContextMenu(guide){
            if(this.contextMenuGuideItem === guide){
                this.contextMenuGuideItem = {}
                
            }else {
                this.contextMenuGuideItem = guide
            }
        }
    }
}

</script>

<style>

.guideList{
    padding: 0;
    padding-bottom: 50px;
    display: grid;
    grid-template-columns: repeat(
        auto-fit,
        minmax(250px, 1fr)
    );
    grid-template-rows: repeat(auto-fit, 150px);
    column-gap: 20px;
    transition: 0;
    overflow-y: auto;
    height: 100%;
}
.guideItem{
    display: inline-grid;
    grid-template-rows: 1fr auto;
    background: white;
    padding: 10px;
    border-radius: 15px;
    margin: 10px;
    position: relative;
    min-height: 100px;
}
.guideContent{
    padding: 5px 10px;
}
.guideFooter{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    bottom: 0;
    left: 0;
    width: 100%;
}
.guideDate{
    margin-left: auto;
    padding: 10px;
    background: white;
    display: block;
    text-align: right;
    border-top-left-radius: 15px;
    position: absolute;
    bottom: 0;
    right: 0;
}
.guideDate > span{
    background: rgb(155, 155, 155);
    color: white;
    border-radius: 100px;
    padding: 3px 7px;
    margin: 0 3px;
    position: relative;
}
/*.guideDate > span.pointSeparator::after{
    content: "";
    display: block;
    width: 6px;
    height: 2px;
    background: rgb(155, 155, 155);
    border-radius: 100px;
    position: absolute;
    left: calc(100% + 3px);
    top: 50%;
    transform: translate(-50%, -50%);

}*/
.guideUserOwnerName{
    margin-left: 20px;
    margin-bottom: 10px;
    margin-right: auto;
    font-size: 14px;
    color: rgb(165, 165, 165);
}
.guideItemInfo{
    position: relative;
}
.guideContextMenu{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    position: absolute;
    background: white;
    width: 100%;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    bottom: 0;
    transform: translateY(calc(100% - 15px));
    z-index: 3;
    box-shadow: 0px 6px 8px rgb(0 0 0 / 15%);
    padding-top: 10px;
    animation: showGuideContextMenu .3s var(--animationTransition);
    height: 120px;
}
.guideContextMenu > button{
    margin: 2px 0px;
    padding: 2px 0;
    background: transparent;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    color: black;
    font-weight: 300;
}
.guideContextMenu > button:hover{
    box-shadow: none;
}

@keyframes showGuideContextMenu{
    0%{
        height: 0;
        box-shadow: 0;
    }
    100%{
        height: 120px;
        box-shadow: 0px 6px 8px rgb(0 0 0 / 15%);
    }
}

</style>