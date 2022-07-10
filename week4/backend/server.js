import express from "express";
import bodyParser from "body-parser";
import db from "./database.js"
import { v4 as uuid } from "uuid";


const app = express();

let DUMMY_PRODUCTS = []; // not a database, just some in-memory storage for now

app.use(bodyParser.json());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.get('/allproducts', (req, res, next) => {
  let sql = "SELECT * FROM products"
  let params = []

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json({
      message: "success",
      data: rows
    })
    DUMMY_PRODUCTS = rows
    console.log("All products: ")
    console.log(DUMMY_PRODUCTS)
  });
})


app.post('/addproduct', (req, res, next) => {
  const { title, price } = req.body;

  // validation
  if (!title || title.trim().length === 0 || !price || price <= 0) {
    return res.status(422).json({
      message: 'Invalid input, please enter a valid title and price.'
    });
  }

  // push to database
  let sql = `INSERT INTO products (id, title, price) VALUES (?,?,?)`;
  let createdProduct = {
    id: uuid(),
    title,
    price
  }
  let params = [createdProduct.id, title, price]

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }

    res.status(201).json({
      message: "Created new product.",
      product: createdProduct
    })

    console.log("Created product: ")
    console.log(createdProduct)
  });

});


app.get('/healthcheck', (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: "Khang is here"
  })
})

app.get('/badrequest', (req, res, next) => {
  res.status(400).json({
    status: 400,
    message: "Khang is not here"
  })
})

app.get('/products', (req, res, next) => {
  res.status(200).json({ products: DUMMY_PRODUCTS });
});

app.post('/product', (req, res, next) => {
  const { title, price } = req.body;

  // validation
  if (!title || title.trim().length === 0 || !price || price <= 0) {
    return res.status(422).json({
      message: 'Invalid input, please enter a valid title and price.'
    });
  }

  const createdProduct = {
    id: uuid(),
    title,
    price
  };

  // push to database
  DUMMY_PRODUCTS.push(createdProduct);

  res.status(201)
    .json({
      message: 'Created new product.',
      product: createdProduct
    });
});

export default app.listen(8000); // start Node + Express server on port 8000

