<template>
  <div class="popup">
    <div class="popup-inner">
        <!-- <form @submit="onSubmit">
            <label>New Category: </label>
            <input type="text" v-model="addNewCategory" required /> <br/>
            <label>New Item: </label>
            <input type="text" v-model="addNewItem" required /> <br />
            <input type="submit" /> 
        </form> -->
        <slot />
<button class="popup-close" @click="TogglePopup()">Close</button>
    
    </div>
  </div>
</template>

<script>
// import Button from "./Button.vue"
// import "@/assets/_shared.scss";
export default {
    name: "PopupForm",
    props: ['TogglePopup'],
    data() {
        return {
            addNewCategory: '',
            addNewItem: '',
        }
    },
    methods: {
       
    }
}
</script>

<style lang="scss" scoped>
.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.2);
	
	display: flex;
	align-items: center;
	justify-content: center;
	.popup-inner {
		background: #FFF;
		padding: 32px;
	}
}
</style>>
