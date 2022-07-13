<template>
    <div v-for="logs in logslists" :key="logs.id" class="inline-flex m-4">
 <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">
        {{ logs.name }}
    </div>
    <p class="text-gray-700 text-base">
    Description: {{ logs.description }} <br/>
    <!-- Per Packet: {{ logs.perpkt }} <br/> -->
      Quantity: {{ logs.quantity }} <br/>
      Total Quantity: {{ logs.quantity * logs.perpkt }} <br/>
      Price:  ${{ logs.price }} <br/>
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ logs.category }}</span>
  </div>
</div>
</div>
</template>

<script>

export default {
    name:"Warehouse",
    data() {
        return {
            logslists: [],
        }
    },
    methods: {
        async getLogs() {
            const res = await fetch('https://backloglog.herokuapp.com/logistics/')
            const data = await res.json()
            return data
        }
    },
    async created () {
        this.logslists = await this.getLogs();
    }


}
</script>

<style>

</style>