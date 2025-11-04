//Page 1

- list of all cities
  > http://localhost:9000/location
- List of all restaurants
  > http://localhost:9000/restaurant
- Rerstaurants wrt city
  > http://localhost:9000/restaurant?stateId=2
- List of meals
  > http://localhost:9000/meals


//Page 2
- Restaurants on the basis of mealType
  > http://localhost:9000/restaurant?mealId=3
  > http://localhost:9000/restaurant?stateId=2&mealId=3
  > //filtering
- Restaurants wrt mealType + CuisineType
  > http://localhost:9000/filter/1?cuisineId=1
- Resturants wrt mealType + cost
  > http://localhost:9000/filter/1?lcost=600&hcost=1000
  > http://localhost:9000/filter/1?lcost=600&hcost=1000&cuisineId=4
- Sort on the basis of price
  > http://localhost:9000/filter/1?lcost=600&hcost=1000&sort=-1
- Pagination
  > http://localhost:9000/filter/1?cuisineId=2&skip=1&limit=1


//Page 3
- Details of the restaurants
  > http://localhost:9000/details/6905a5ded5cfccc45c718dd1 with mongo object
  > http://localhost:9000/details/2 without mongo object
- Menu wrt to restaurants
  > http://localhost:9000/menu/2


//Page 4
- Details of the selected Menu
  > (POST) http://localhost:9000/menuDetails
  {"id":[2,4]}
- Place Order (postman: body -> raw -> json)
  > (POST) http://localhost:9000/placeOrder
  {
      "orderId":5,
      "name":"ajinkya",
      "email":"ajinkya@gmail.com",
      "address": "Hno 43. Sector 2",
      "phone": 3434343434434
  }


//Page 5
- View All order/with or without email
  > http://localhost:9000/orders without email
  > http://localhost:9000/orders?email=aakash@gmail.com with email
- Update order details
  > (PUT) http://localhost:9000/updateOrder
  {
      "_id":"62514d42f5aec503b2e0f2a9",
      "status":"Delivered"
  }
- Delete order
  > (DELETE) http:/localhost:9000/deleteOrder
  {
      "_id":"62514d42f5aec503b2e0f2a9"
  }
