<template>
  <div class="popup">
    <div class="popup-inner">
     <button class="float-right" @click="TogglePopup()"> 
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 mr-0 mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</button><br/>
    <!-- <button class="right-0 top-0 text-red-600"  @click="TogglePopup()">close popup</button> -->
        <!-- <form @submit="onSubmit">
            <label>New Category: </label>
            <input type="text" v-model="addNewCategory" required /> <br/>
            <label>New Item: </label>
            <input type="text" v-model="addNewItem" required /> <br />
            <input type="submit" /> 
        </form> -->
        <slot />
    
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
