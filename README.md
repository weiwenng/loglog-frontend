# log-log

SEI 36 - Project 4

## Overview

Website created using PostgreSQL, Python, Django, Vue.
This links the sales department together with the logistics department of a mini buffet company.

### App Structure 

Front-End (Vue)
```
├── App.vue
├── assets
│   └── logo.png
├── components
│   ├── Button.vue
│   ├── EditFoodName.vue
│   ├── FoodDisplay.vue
│   ├── Header.vue
│   ├── LogsDisplay.vue
│   ├── OrderDetail.vue
│   ├── OrderDisplay.vue
│   ├── OrderMenuDisplay.vue
│   ├── PopupForm.vue
│   └── SalesList.vue
├── index.css
├── main.js
├── router
│   └── index.js
└── views
    ├── Home.vue
    ├── Menu.vue
    ├── Order.vue
    ├── OrderByDate.vue
    ├── Sales.vue
    └── Warehouse.vue
```



### Features of Log-log

Menu Tab: 
- View available menu items

Sales Tab: 
- Create new orders

All Orders Tab: 
- View all orders (see menu items)
- More details button: 
    - Additional information such as delivery address, date & time
    - Logistics side to confirm logistics needed
    - On confirmation, logistics needed will be displayed as additional details
   
Orders by Date Tab:
- View orders by inputting start & end date

Warehouse Tab: 
- View stock in warehouse
- Update stock levels when doing stock take
- Create new logistics item
- Delete logistics item 


### Stretch Goals (to add on in future)

- Add Login (Auth) to separate sales dept & logsistics dept 
- Add a "completed order" button & shifting that to order history
