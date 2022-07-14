<template>
  <div :class="[isLow ? 'border-b-4 border-red-700':'border-b-4 border-green-700 ' ,'max-w-lg rounded overflow-hidden shadow-lg']">
  <div v-if="edited">
     <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">
        {{ logs.name }}
    </div>
    <p class="text-gray-700 text-base">
    Description: {{ logs.description }} <br/>
    Quantity: {{ logs.quantity }} <br/>
    Total Quantity: {{ logs.quantity * logs.perpkt }} <br/>
    Price:  ${{ logs.price }} <br/>
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ logs.category }}</span>
    <!-- {{ logs.category }} -->
    <button @click="editClick" class="btn-light mr-0">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
</button>
<button @click="$emit('delete-logs', logs.url)">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
</button>
  </div>
  </div>
<div v-else>
     <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">
       {{ logs.name }}
    </div>
    <p class="text-gray-700 text-base">
    Description: {{ logs.description }} <br/>
    Quantity: <input class="w-24 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700" v-model="logs.quantity" />  <br/>
    Total Quantity: {{ logs.quantity * logs.perpkt }} <br/>
    Price:  $ <input class="w-24 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700" v-model="logs.price" /> <br/>
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ logs.category }}</span>
  <button @click="updateClick(logs.url)" class="btn-light mr-0">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
</button>
<button @click="$emit('delete-logs', logs.url)">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
</button>
</div>
</div>
 
  
</div>
</template>

<script>
export default {
    name: "LogsDisplay",
    props: ['logs'],
    data() {
        return {
             isLow: false,
             countstocks: [],
             edited: true
        }
    },
    methods: {
            async editClick() {
                this.edited = !this.edited
            },
            async updateClick(url) {
                console.log("update" + this.logs.quantity + "price" + this.logs.price + url)
                const res = await fetch(url)
                const data = await res.json()
                let logsitem = data
                console.log("this.logsitem", logsitem)
                const res2 = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({...logsitem, quantity: this.logs.quantity, price: this.logs.price})
                })
                const data2 = await res2.json()
                this.edited = !this.edited
                this.countstocks = await this.countStocks(url);
                return data2
            },
            async countStocks(url) {
            const res = await fetch('https://backloglog.herokuapp.com/logsprep/')
            const data = await res.json()
            // console.log("filter", data.filter((log) => log.logistics === url).reduce((a, b) => a + b.logsneeded, 0))
            this.countstocks = data.filter((log) => log.logistics === url).reduce((a, b) => a + b.logsneeded, 0)
            if( this.countstocks < this.logs.quantity * this.logs.perpkt) {
                this.isLow = false 
            } else {
                this.isLow = true
            }
        },
    },
    async created() {
         this.countstocks = await this.countStocks(this.logs.url);
    }
}
</script>

<style>

</style>