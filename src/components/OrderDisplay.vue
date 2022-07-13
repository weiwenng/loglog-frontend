<template>
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