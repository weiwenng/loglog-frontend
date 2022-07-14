<template>
  <!-- <div class="flex justify-center items-center">
    <svg role="status" class="inline mr-2 w-8 h-8 text-white-600 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  </svg>
  </div> -->
  <div v-for="(order, index) in filterOrderNum"  @click="toggle(index)" :key="index" :class="[
        'accordion',
        { 'is-open': isOpen.includes(index) }
      ]" >
           <div class="accordion-header">
           <h3>Order #{{ order }}</h3>
                <i v-if="!isOpen.includes(index)" class="fal fa-plus"/>
                <i v-else class="fal fa-minus"/>
              <router-link class="link" :to="{ name:'OrderDetail', params: {id: order} }">More Details</router-link>
            </div>    
           <div class="accordion-body">
        <div class="accordion-content">
            <!-- <div v-for="(combine, index) in filterMenu" :key="index">
                {{ combine }}
                </div> -->

            <OrderMenuDisplay :order="order" />
        </div>
      </div>
            <!-- <Testing /> -->
           <!-- <OrderMenuDisplay v-show="isActive"/> -->
  </div>
</template>

<script>
import OrderMenuDisplay from './OrderMenuDisplay.vue'
// import { CollapsePlugin } from 'bootstrap-vue'

export default {
  name: "OrderDisplay",
  props: {
    combined: Array,
  },
  components: {
    OrderMenuDisplay,
  },
  data() {
    return {
        orderNum: [],
        menus: [],
        isOpen: [],
    }
  },
//    emits: ['toggle-menu'],
  computed: {
    filterOrderNum() { 
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        const https = 'https://backloglog.herokuapp.com/order/'
        this.orderNum = this.combined.map(combine => combine.orders.slice(https.length, -1)).filter(onlyUnique)
        return this.orderNum;
    },
    filterMenu() {
      ((async() => {
        for (let i = 0; i < this.orderNum.length; i++) {
            // console.log("hi", `https://backloglog.herokuapp.com/order/${this.orderNum[i]}/`)
            this.menus = this.combined.map(combine => combine).filter(combine => combine.orders == `https://backloglog.herokuapp.com/order/${this.orderNum[i]}/` )
        }
      })().catch(console.error))
       
        return this.menus;
    },
  },
  methods: {
    toggle(index) {
       if (this.isOpen.includes(index)) {
        this.isOpen = this.isOpen.filter(i => i !== index);
        return;
      }
      this.isOpen.push(index);
    }
  }
};
</script>

<style scoped>
.accordion {
  background-color: #ccc;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
  border: 1px solid #ccc;
}

.is-open, .accordion:hover {
  background-color: #eee;
}

/* . {
  padding: 0 18px;
  background-color: white;
  display: none;
  overflow: hidden;
}  */
.accordion:not(.is-open) .accordion-body {
  display: none;
  padding: 0 18px;
  background-color: white;
}

.link:link, .link:visited{
  color: rgb(1, 68, 149);
  text-decoration: none;
}

 .link:hover {
  color: rgb(1, 68, 149);
  text-decoration: underline;
  /* cursor: pointer; */
}

</style>