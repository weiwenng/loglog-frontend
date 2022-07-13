<template>
<div v-if="edited">
{{ food.itemname }}
 <button @click="editClick" class="btn-light mr-0">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
</button>
<button @click="$emit('delete-food', food.id)">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
<button @click="$emit('delete-food', food.id)">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
</button>
</div>
 <!-- </div> -->
 <!-- <button @click="onClick">Change</button> -->
</template>

<script>
    export default {
        name: "EditFoodName",
        props: ['food'],
        components: {
            
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
            
        }
    }
</script>

