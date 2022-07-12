<template>
    <div>
         <li v-for="food in foodlists" :key="food.id"> 
                {{ food.itemname }} <Button text="Edit"/>
            </li>
    </div>
</template>

<script>
import Button from "../components/Button.vue"
import { onUpdated } from "vue"
export default {
    name: "FoodDisplay",
    props: ['uniquecategory'],
    components: {
        Button
    },
    data() {
        return {
            foodlists: []
        }
    },
    methods: {
        async getList(category) {
            const res = await fetch('https://backloglog.herokuapp.com/foodlist')
            const data = await res.json()
            return data.filter(food => food.category === category)
        }
    },
    async created() {
        this.foodlists = await this.getList(this.uniquecategory);
    }, 
    onUpdated() {
        console.log("updated!!!!!!")
        this.foodlists = this.getList(this.uniquecategory);
    }
}
</script>