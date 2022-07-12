<template>
    <div>
        <OrderDisplay :combined="combined"/>
    </div>
</template>

<script>
import OrderDisplay from '../components/OrderDisplay'

export default {
    name: 'Stocks',
    components: {
        OrderDisplay
    },
    // props: {
    //     showMenu: Boolean,
    // },
    data() {
       return {
        combined: [],
        // isActive: false,
       }
    },
   
    methods: {
        async displayAll() {
            for (let i = 0; i < this.combined.length; i++) {
                const res = await fetch(this.combined[i].foodlist)
                const data = await res.json()
                console.log(data)
            }
        },
        async fetchCombined() {
            const res = await fetch('https://backloglog.herokuapp.com/combined/', {
                method: "GET"
            })
            const data = await res.json()
            return data
        },
    },
    async created() {
        this.combined = await this.fetchCombined();
    }
}
</script>