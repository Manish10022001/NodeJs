//Page 1
\*list of all cities

> http://localhost:9000/location

- List of all restaurants
  > http://localhost:9000/restaurant
   *Rerstaurants wrt city
  > http://localhost:9000/restaurant?stateId=2
   *List of meals
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
*Details of the restaurants
*Menu wrt to restaurants

//Page 4
*Details of the selected Menu
*Place Order

//Page 5
*View All order/with or without email
*Update order details
\*Delete order
