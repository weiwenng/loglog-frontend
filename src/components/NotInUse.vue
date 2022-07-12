// SalesList.vue

    <!-- <div v-for="menu in menus" :key="menu.id">
        {{ menu.title }} courses ( minimum pax: {{ menu.minpax }})
    </div> -->

    <!-- <div class="sales_list">
      <div
        @click="$emit('toggle-course', menu.id)"
        :class="[menu.chosen ? 'chosen' : '', 'courses']"
        v-for="menu in menus"
        :key="menu.id"
      >
        <h2>{{ menu.title }} courses</h2>
        <h4>minimum pax:</h4>
        <h4>{{ menu.minpax }}</h4>
        <h4>${{ menu.price }} / pax</h4>
      </div>
    </div> -->
    <!-- <Button
      color="maroon"
      text="Confirm Selection"
      @btn-click="
        $emit('confirm-selection', {
          pax: numofpax,
          delivery_place: address,
          delivery_date: deliverydate,
          delivery_time: deliverytime,
          menu_id: 'https://backloglog.herokuapp.com/menu/5/'
        })
      "
    /> -->
    <!-- <AddOrder @add-order='addOrder' v-show="showAddOrder"/> -->
    <!-- <AddOrder @add-order='addOrder'/> -->


    // options.filter(option => selected.indexOf(option) === -1 )
    // opts.push({itemname: this.itemlists[i].itemname, id: this.itemlists[i].id})

     // async addOrder(order) {
  //     const res = await fetch('https://backloglog.herokuapp.com/order', {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(order)
  //     })
  //     const data = await res.json()
  //     this.orders = [...this.orders, data]
  // },
  // async getData() {
  //         const response = await fetch('https://backloglog.herokuapp.com/menu/', {
  //             method: "GET",
  //             // headers: {
  //             //     "Content-Type": "application/json"
  //             // },
  //             // body: JSON.stringify()
  //         })
  //         console.log(response)
  //         const data = await response.json()
  //         console.log(data)
  //         return data
  // },
  // async getData(id) {
  //     const res = await fetch (`https://backloglog.herokuapp.com/menu/${id}`)
  //     const data = await res.json()
  //     return data
  // },
  // async deleteData(id) {
  //     if (confirm('Are you sure?')) {
  //         const res = await fetch(`https://backloglog.herokuapp.com/menu/${id}/`, {
  //             method: "DELETE"
  //         })
  //         res.status === 200 ? (
  //             this.menus = this.menus.filter(menu => menu.id !== id)
  //         ) : alert('error deleting!!!!!')
  //     }
  // }

  // async created() {
  //     this.menus = await this.getData();
  // }

 