let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 6700;

const category=[
    {
        "id":1,
        "category": "Fashion",
        "thumb":"https://i.ibb.co/56VP0Fn/cloths.jpg"
    },
    {
        "id":2,
        "category":"Electronics",
        "thumb":"https://i.ibb.co/pw5Wtdx/appliances.jpg"
    },
    {
        "id":3,
        "category":"Essentials",
        "thumb":"https://i.ibb.co/0cw34xm/essentials.jpg"
    },
    {
        "id":4,
        "category": "Footwear",
        "thumb":"https://i.ibb.co/r3SZq8S/footware.jpg"
    }
]

const products = [
    {
        "id": 1,
        "product_name": "Girls top",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2000,
        "Size": "Small",
        "Image": "https://i.ibb.co/fHj5Tgc/download.jpg",
        "Color": "Maroon",
        "Brand": "Gucci"
    },
    {
        "id": 2,
        "product_name": "Girls top",
        "category": "Fashion",
        "category_id": 1,
        "Price": 1500,
        "Size": "Medium",
        "Image": "https://i.ibb.co/tsXyK5Y/images.jpg",
        "Color": "Blue",
        "Brand": "Westside"
    },
    {
        "id": 3,
        "product_name": "Girls top",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2000,
        "Size": "Large",
        "Image": "https://i.ibb.co/NsVKKdd/images-1.jpg",
        "Color": "Pink",
        "Brand": "H&M"
    },
    {
        "id": 4,
        "product_name": "Girls top",
        "category": "Fashion",
        "category_id": 1,
        "Price": 500,
        "Size": "Medium",
        "Image": "https://i.ibb.co/5Fwh8ys/Blue.jpg",
        "Color": "Blue",
        "Brand": "H&M"
    },
    {
        "id": 5,
        "product_name": "Girls top",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2500,
        "Size": "Large",
        "Image": "https://i.ibb.co/sbtyWMs/WHite.jpg",
        "Color": "White",
        "Brand": "Gucci"
    },
    {
        "id": 6,
        "display_name":"Green Crop Top",
        "product_name": "Girls top",
        "category": "Fashion",
        "category_id": 1,
        "Price": 1500,
        "Size": "Medium",
        "Image": "https://i.ibb.co/HGQ3bC0/A-Green.jpg",
        "Color": "Apple Green",
        "Brand": "Hermes"
    },
    {
        "id": 7,
        "product_name": "Girls top",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2000,
        "Size": "small",
        "Image": "https://i.ibb.co/n7C1gqf/yellow.jpg",
        "Color": "Amber",
        "Brand": "Adidas"
    },
    {
        "id": 8,
        "product_name": "Girls top",
        "category": "Fashion",
        "category_id": 1,
        "Price": 1000,
        "Size": "Medium",
        "Image": "https://i.ibb.co/99vF9pr/Red.jpg",
        "Color": "Red",
        "Brand": "Prada"
    },
    {
        "id": 9,
        "product_name": "Girls top",
        "category": "Fashion",
        "category_id": 1,
        "Price": 3000,
        "Size": "Medium",
        "Image": "https://i.ibb.co/9TLg98j/almond.jpg",
        "Color": "Almond",
        "Brand": "Tom Ford"
    },
    {
        "id": 10,
        "product_name": "Girls top",
        "category": "Fashion",
        "category_id": 1,
        "Price": 3000,
        "Size": "Medium",
        "Image": "https://i.ibb.co/r0mMPvk/grey.jpg",
        "Color": "Ash",
        "Brand": "Burberry"
    },
    {
        "id": 11,
        "product_name": "Jeans",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2000,
        "Size": "XX",
        "Image": "https://i.ibb.co/zRKT2yV/download-1.jpg",
        "Color": "Blue",
        "Brand": "Allen Solly"
    },
    {
        "id": 12,
        "display_name":"Blue Demin",
        "product_category": "Jeans",
        "category": "Fashion",
        "category_id": 1,
        "Price": 3000,
        "Size": "XXl",
        "Image": "https://i.ibb.co/cCypD5v/mj6.jpg",
        "Color": "Blue",
        "Brand": "Lee"
    },
    {
        "id": 13,
        "product_name": "Jeans",
        "category": "Fashion",
        "category_id": 1,
        "Price": 3000,
        "Size": "Xl",
        "Image": "https://i.ibb.co/tCqWYP6/mj2.jpg",
        "Color": "Blue",
        "Brand": "spykar"
    },
    {
        "id": 14,
        "product_name": "Jeans",
        "category": "Fashion",
        "category_id": 1,
        "Price": 3000,
        "Size": "X",
        "Image": "https://i.ibb.co/Z6m393Y/download-2.jpg",
        "Color": "Black",
        "Brand": "Levi's"
    },
    {
        "id": 15,
        "product_name": "Jeans",
        "category": "Fashion",
        "category_id": 1,
        "Price": 1000,
        "Size": "Xl",
        "Image": "https://i.ibb.co/pfpCs37/mj1.jpg",
        "Color": "Black",
        "Brand": "Wrangler"
    },
    {
        "id": 16,
        "product_name": "Jeans",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2000,
        "Size": "XX",
        "Image": "https://i.ibb.co/fqVV6Sn/mj3.jpg",
        "Color": "Black",
        "Brand": "Calvin Klein"
    },
    {
        "id": 17,
        "product_name": "Jeans",
        "category": "Fashion",
        "category_id": 1,
        "Price": 3000,
        "Size": "XXL",
        "Image": "https://i.ibb.co/bXVW7j7/mj8.jpg",
        "Color": "Grey",
        "Brand": "Levi's"
    },
    {
        "id": 18,
        "product_name": "Jeans",
        "category": "Fashion",
        "category_id": 1,
        "Price": 3500,
        "Size": "XX",
        "Image": "https://i.ibb.co/z5WrjQ0/download-3.jpg",
        "Color": "Grey",
        "Brand": "Lee"
    },
    {
        "id": 19,
        "product_name": "Jeans",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2500,
        "Size": "XX",
        "Image": "https://i.ibb.co/wLD9LyL/mj7.jpg",
        "Color": "white",
        "Brand": "Wrangler"
    },
    {
        "id": 20,
        "product_name": "Women's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2000,
        "Size": "L",
        "Image": "https://i.ibb.co/stDvKQm/sw4.jpg",
        "Color": "white",
        "Brand": "Gucci"
    },
    {
        "id": 21,
        "product_name": "Women's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2000,
        "Size": "M",
        "Image": "https://i.ibb.co/1fny1GN/sw2.jpg",
        "Color": "Apricot",
        "Brand": "Zara"
    },
    {
        "id": 22,
        "product_name": "Women's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 1000,
        "Size": "M",
        "Image": "https://i.ibb.co/4tBK2wr/sw3.jpg",
        "Color": "Peach",
        "Brand": "Raymond"
    },
    {
        "id": 23,
        "product_name": "Women's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 1500,
        "Size": "M",
        "Image": "https://i.ibb.co/sj3c7kG/sw6.jpg",
        "Color": "Arctic",
        "Brand": "Peter England"
    },
    {
        "id": 24,
        "product_name": "Women's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2000,
        "Size": "S",
        "Image": "https://i.ibb.co/TgtGYr9/sw7.jpg",
        "Color": "Periwinkle",
        "Brand": "Wills Lifestyle"
    },
    {
        "id": 25,
        "product_name": "Women's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 3500,
        "Size": "L",
        "Image": "https://i.ibb.co/vDrzk2k/sw10.jpg",
        "Color": "Off white",
        "Brand": "Wills Lifestyle"
    },
    {
        "id": 26,
        "product_name": "Men's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 1500,
        "Size": "L",
        "Image": "https://i.ibb.co/xFQ7w0t/sm1.jpg" ,
        "Color": "Peach",
        "Brand": "Van Heusen"
    },
    {
        "id": 27,
        "product_name": "Men's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 1000,
        "Size": "M",
        "Image": "https://i.ibb.co/P4NKcqv/sm2.jpg",
        "Color": "Arctic",
        "Brand": "Peter England"
    },
    {
        "id": 28,
        "product_name": "Men's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 200,
        "Size": "S",
        "Image": "https://i.ibb.co/S54x490/sm8.jpg" ,
        "Color": "White",
        "Brand": "Raymond"
    },
    {
        "id": 29,
        "product_name": "Men's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 800,
        "Size": "M",
        "Image":"https://i.ibb.co/N6dtKNM/sm7.jpg" ,
        "Color": "Black",
        "Brand": "Park Avenue"
    },
     {
        "id": 30,
        "product_name": "Men's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 1200,
        "Size": "M",
        "Image": "https://i.ibb.co/7bJHyHy/sm4.jpg" ,
        "Color": "Fern",
        "Brand": "Tomy Hilfiger"
    }, 
    {
        "id": 31,
        "product_name": "Men's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 1300,
        "Size": "M",
        "Image": "https://i.ibb.co/KDWj1HQ/sm5.jpg" ,
        "Color": "BLue-White",
        "Brand": "Levi's"
    }, 
    {
        "id": 32,
        "product_name": "Men's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2300,
        "Size": "L",
        "Image":"https://i.ibb.co/BLr2WBn/sm6.jpg" ,
        "Color": "Black-Ash",
        "Brand": "Parx"
    }, 
    {
        "id": 33,
        "product_name": "Men's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 1800,
        "Size": "S",
        "Image":  "https://i.ibb.co/02S5qLt/sm9.jpg" ,
        "Color": "Blue-Ash",
        "Brand": "Ajio"
    },
    {
        "id": 33,
        "product_name": "Men's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 1800,
        "Size": "S",
        "Image":  "https://i.ibb.co/02S5qLt/sm9.jpg" ,
        "Color": "Blue-Ash",
        "Brand": "Ajio"
    },
    {
        "id": 34,
        "product_name": "Men's Shirt",
        "category": "Fashion",
        "category_id": 1,
        "Price": 1800,
        "Size": "S",
        "Image":  "https://i.ibb.co/02S5qLt/sm9.jpg" ,
        "Color": "Blue-Ash",
        "Brand": "Ajio"
    },

    {
        "id": 35,
        "product_name": "Women's Jeans",
        "category": "Fashion",
        "category_id": 1,
         "Price": 1000,
        "Size": "M",
        "Image":"https://i.ibb.co/k0mKWfx/wj7.jpg" ,
        "Color": "BLue",
        "Brand": "Lee"
    },   

    {
        "id": 36,
        "product_name": "Women's Jeans",
         "category": "Fashion",
         "category_id": 1,
        "Price": 1600,
        "Size": "S",
        "Image": "https://i.ibb.co/bF0JH6S/w9.jpg" ,
        "Color": "BLack",
        "Brand": "Levi's"
    },
    {
        "id": 37,
        "product_name": "Women's Jeans",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2000,
        "Size": "S",
        "Image":  "https://i.ibb.co/M7Sg9DP/wj6.jpg" ,
        "Color": "Sky Blue",
        "Brand": "Tommy Hilfiger"

    },
    {
        "id": 39,
        "product_name": "Women's Jeans",
        "category": "Fashion",
        "category_id": 1,
        "Price": 2500,
        "Size": "L",
        "Image": "https://i.ibb.co/yBK9S07/wj2.jpg" ,
        "Color": "Grey",
        "Brand": "Calvin Klein"

    },
    
     {
        "id": 40,
        "product_name": "Washing Machine",
        "category": "Electronics",
        "category_id": 2,
        "Price": 30000,
        "Image": "https://i.ibb.co/8NQ7RpM/w2.jpg",
        "Mode": "Semi-Automatic",
        "Color": "White",
        "company": "LG"
    },
    {
        "id":41 ,
        "product_name": "Washing Machine",
        "category": "Electronics",
        "category_id": 2,
        "Price": 15000,
        "Image": "https://i.ibb.co/HdMwcHJ/w1.jpg",
        "Mode": "Automatic",
        "Color": "White",
        "company": "Lloyd"
    },
    {
        "id":42 ,
        "product_name": "Washing Machine",
        "category": "Electronics",
        "category_id": 2,
        "Price": 15000,
        "Image":"https://i.ibb.co/NrHbwwD/w3.jpg" ,
        "Mode": "Automatic",
        "Color": "Grey",
        "company": "Lloyd"
    },
    {
        "id": 43,
        "product_name": "Refrigerator",
        "category": "Electronics",
        "category_id": 2,
        "Price": 50000,
        "Image": "https://i.ibb.co/Tm1GmYc/w4.jpg",
        "Style": "Double-Door",
        "Color": "Metal Grey",
        "company": "Samsung"
    },
    {
        "id": 44,
        "product_name": "Refrigerator",
        "category": "Electronics",
        "category_id": 2,
        "Price": 25000,
        "Image":"https://i.ibb.co/zrLv8Bj/w5.jpg" ,
        "style": "Single Door",
        "Color": "Metal Black",
        "company": "Whirlpool"
    },
    {
        "id": 45,
        "product_name": "Iron",
        "category": "Electronics",
        "category_id": 2,
        "Price": 3000,
        "Image": "https://i.ibb.co/Tw9cXss/w6.jpg", 
        "Color": "Blue",
        "company": "Havells"
    },
    {
        "id": 46,
        "product_name": "Iron",
        "category": "Electronics",
        "category_id": 2,
        "Price": 4000,
        "Image":"https://i.ibb.co/GHQjYvv/w7.jpg",
        "Color": "Black",
        "company": "Bajaj"
    }
]

app.get('/',(req,res)=>{
    res.send("Hi from Express")
})

app.get('/category',(req,res)=>{
    res.send(category);
})
//we are calling two paths of same name details but it will only execute the one which 
//is written first. 
//multiple route under one router the the first one execute
app.get('/details',(req,res)=>{
    res.send("Categogy Details")
})

app.get('/products',(req,res)=>{
    res.send(products)
})

app.get('/details',(req,res)=>{
    res.send("Products Details")
})
app.listen(port,(err)=>{
    if(err) throw err;
    else{
        console.log(`The server is running on ${port}`)
    }
})