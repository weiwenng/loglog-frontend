<template>
    <div>
        <ul>
            <li v-for="food in getFoodItem" :key="food"> 
                {{ food }}
            </li>
        </ul>
        
    </div>
</template>

<script>
export default {
    name:"OrderMenuDisplay",
    props: ['order'],
    data() {
        return {
            menus: [],
            fooditem: [],
        }
    },
    computed: {
        getFoodItem() {
            ((async() => {
                for (let i = 0; i < this.menus.length; i++) {
                // this.getFoodName(i);
                let food = await this.getFoodName(i)
                console.log(food)
                this.fooditem.push(food)
            }})()).catch(console.error)
            console.log("this.fooditem", this.fooditem)
            return this.fooditem;
        }
    },
    methods: {
        async getMenu(order) {
            const res = await fetch(`https://backloglog.herokuapp.com/combined/`)
            const data = await res.json()
            // console.log(data)
            return data.filter(combine => combine.orders ===  `https://backloglog.herokuapp.com/order/${order}/`)
        },
        async getFoodName(index) {
            const res = await fetch(this.menus?.[index].foodlist)
            const data = await res.json()
            console.log("foodname", data)
            return data.itemname
        }
    },
    async created() {
        this.menus = await this.getMenu(this.order);
    }
}
</script>

<style scoped>
li {
    list-style: none;
}
</style>