<template>
    <!-- <form @submit="onSubmit" class="add-form"> -->
        <div class="form-control">
            <!-- <label>New Order</label> -->
            <!-- <select>
                <option v-for="itemlist in itemlists" :value="itemlist.itemname" :key="itemlist.id">{{ itemlist.itemname }}</option>
            </select> -->
            <v-select v-model="selected" multiple :options="options.filter(option => selected.indexOf(option) === -1 )" :selectable="() =>  selected.length < 6"></v-select>
            <!-- <button @click="confirmOrder">Confirm Order</button> -->
            <!-- <p>Order is: {{ selected }}</p> -->
        </div>
    <!-- </form> -->
</template>

<script>
import vSelect from 'vue-select'

export default {
    name: 'AddOrder',
    components: {
        vSelect
    },
    data() { 
        return {
            itemlists: [''],
            selected: [],
        }
    }, 
    computed: {
        options() {
            let opts = [];
            for (let i = 0; i < this.itemlists.length; i++) {
                // options.filter(option => selected.indexOf(option) === -1 )
                if (this.selected.indexOf(this.itemlists[i]) === -1) {
                    // opts.push({itemname: this.itemlists[i].itemname, id: this.itemlists[i].id})
                    opts.push(this.itemlists[i].itemname)
                } 
            }
            console.log("opts", opts)
            return opts
        },
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()
            const newOrder = this.selected
                // item1: this.item1,
                // item2: this.item2,
                // item3: this.item3,
                // item4: this.item4,
                // item5: this.item5,
                // item6: this.item6
            console.log(newOrder)
            this.$emit('add-order', newOrder)

            // this.item1 = ''
            // this.item2 = ''
            // this.item3 = ''
            // this.item4 = ''
            // this.item5 = ''
            // this.item6 = ''
        },
         async getData() { 
                const response = await fetch('https://backloglog.herokuapp.com/foodlist/', {
                    method: "GET",
                    // headers: {
                    //     "Content-Type": "application/json"
                    // },
                    // body: JSON.stringify()
                })
                console.log(response)
                const data = await response.json()
                console.log("itemlists", data)
                return data
        },
    },
     async created() { 
        this.itemlists = await this.getData();
    }
}
</script>

<style scoped>
    .add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>