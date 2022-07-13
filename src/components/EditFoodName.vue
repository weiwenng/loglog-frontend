<template>
<div v-if="edited">
{{ food.itemname }}
 <button @click="editClick" class="btn-light mr-0">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
</button>
</div>
<div v-else>
 <input v-model="food.itemname"/>
 <!-- <div class="mr-0">  -->
    <button @click="updateClick(food.id)" class="btn-light mr-0">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
</button>
</div>
 <!-- <PencilIcon @click="onClick" class="mr-0 h-5 w-5 text-black-500"/> -->
 <!-- </div> -->
 <!-- <button @click="onClick">Change</button> -->
</template>

<script>
import { PencilIcon } from '@heroicons/vue/outline'
    export default {
        name: "EditFoodName",
        props: ['food'],
        components: {
            PencilIcon
        },
        data() {
            return {
                edited: true
            }
        },
        methods: {
            async editClick() {
                this.edited = !this.edited
                console.log(this.edited)
            },
           async updateClick(id) {
            
                console.log("change " + this.food.itemname + id)
                const res = await fetch(`https://backloglog.herokuapp.com/foodlist/${id}`)
                const data = await res.json()
                let fooditem = data
                console.log("this.fooditem", fooditem)
                const res2 = await fetch(`https://backloglog.herokuapp.com/foodlist/${id}/`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({...fooditem, itemname: this.food.itemname})
                })
                const data2 = await res2.json()
                this.edited = !this.edited
                return data2

            },
            // async updateName() {
                
            // }
        }
    }
</script>

