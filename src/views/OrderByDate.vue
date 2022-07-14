<template>
    <!-- <Button /> -->
    <div>
        <label>Start Date: </label>
        <input type="date" v-model="startdate" class="w-36 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
        <label>End Date: </label>
        <input type="date" v-model="enddate" class="w-36 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
        <button @click="onClick" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded justify-center ml-2">Search </button>
        <br/>
        <!-- {{ this.date }} -->
        <div v-for="order in displayorders" :key="order.id" class="m-4 h-64 inline-flex">
        <!-- {{ order }} -->
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">Order #{{ order.id }}</div>
    <p class="text-gray-700 text-base">
      Delivery Date: {{ order.delivery_date }} <br/>
    
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
   <router-link class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" :to="{ name:'OrderDetail', params: {id: order.id} }">More Details</router-link>
  </div>
</div>
        </div>
        <!-- hello loggers test test test this is checklist page lolololol hehe -->
    </div>
</template>

<script>
// import Button from '../components/Button'

export default {
    name: 'WeekAhead',
    data() {
        return {
            startdate: '',
            enddate: '',
            // date: "",
            orders: [],
            realorders: [],
            displayorders: []
        }
    },
    components: {
        // Button
    },
    methods: {
       async getData() {
        const res = await fetch('https://backloglog.herokuapp.com/order/')
        const data = await res.json()
        const res2 = await fetch('https://backloglog.herokuapp.com/combined/')
        const data2 = await res2.json()
        console.log("this.startdate", this.startdate, "this.enddate", this.enddate)
        this.orders = data.filter((order) => order.delivery_date <= this.enddate && order.delivery_date >= this.startdate)
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        const https = 'https://backloglog.herokuapp.com/order/'
        this.realorders = data2.map(combine => combine.orders.slice(https.length, -1)).filter(onlyUnique)
        for (let i = 0; i < this.orders.length; i++) {
            for(let j = 0; j < this.realorders.length; j++) {
                if(this.orders[i].id === parseInt(this.realorders[j])) {
                    this.displayorders.push(this.orders[i])
                }
            }
        }
        // this.realorders = data2.filter((order) => order.orders)
        // console.log("realorder", this.displayorders)
       },
       onClick() {
        if(!this.startdate || !this.enddate ) {
            alert("pls select the start & end date!!")
            return;
        }
        if(this.startdate > this.enddate) {
            alert("start date is later than end date!! pls select carefully!! ")
            return;
        }
        this.getData()
       }
    }
}
</script>