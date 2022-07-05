import express from "express";
import bodyParser from "body-parser";
import { v4 as uuid } from "uuid";



const app = express();

const DUMMY_PRODUCTS = []; // not a database, just some in-memory storage for now

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

  DUMMY_PRODUCTS.push(createdProduct);

  res.status(201)
    .json({
      message: 'Created new product.',
      product: createdProduct
    });
});

export default app.listen(8000); // start Node + Express server on port 8000
