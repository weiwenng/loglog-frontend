<template>
    <div v-for="food in foodlists" :key="food.id">
         <!-- <li v-for="food in foodlists" :key="food.id">  -->
            <!-- {{ food }} -->
                <EditFoodName :food="food" :key="food.id" @delete-food="deleteFood"/> 
                <!-- {{ food.itemname }} <Button text="Edit"/> -->
            <!-- </li> -->
    </div>
</template>

<script>
import Button from "../components/Button.vue"
import EditFoodName from "./EditFoodName.vue"
export default {
    name: "FoodDisplay",
    props: ['uniquecategory'],
    components: {
        Button,
        EditFoodName
    },
    data() {
        return {
            foodlists: []
        }
    },
    emits: ['delete-food'],
    methods: {
        refreshData(category) {
            fetch(`https://backloglog.herokuapp.com/foodlist`)
            .then((response) => response.json())
            .then(data => {
                this.foodlists = data.filter(food => food.category === category)
            })
        },
        async editName(id) {
            const res = await fetch(`https://backloglog.herokuapp.com/foodlist/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify()
            })
            const data = await res.json()
            return data

        },
        async getList(category) {
            ((async() => {
                const res = await fetch('https://backloglog.herokuapp.com/foodlist')
            const data = await res.json()
            this.foodlists = await data.filter(food => food.category === category)
            })()).catch(console.error)
            return this.foodlists
        },
        async deleteFood(id) {
                const res = await fetch('https://backloglog.herokuapp.com/combined/')
                const data = await res.json()
                let exists = data.map(obj => obj.foodlist).includes(`https://backloglog.herokuapp.com/foodlist/${id}/`)
                if (exists) {
                    alert("can't delete, it exists in some orders bruh!!!!!")
                } else {
                    if (!confirm("are you sure??")) {
                        return;
                    } 
                    const res = await fetch(`https://backloglog.herokuapp.com/foodlist/${id}`, {
                        method: "DELETE"
                    })
                    console.log(res)
                    this.refreshData(this.uniquecategory)   
                }
            }
    },
    async created() {
        this.foodlists = await this.getList(this.uniquecategory);
    }, 
    mounted() {
        this.refreshData(this.uniquecategory);
    }
}
</script>