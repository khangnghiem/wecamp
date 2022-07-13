import sqlite3 from 'sqlite3';

const SQLite3 = sqlite3.verbose();
const PRODUCT_DATABASE = 'products.db';

const db = new SQLite3.Database(PRODUCT_DATABASE, (err) => {
    if (err) {
        console.log(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
    }
});

export const getAllProducts = (req, res, next) => {
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

    });

}

const query = (command, method = 'all') => {
    return new Promise((resolve, reject) => {
        db[method](command, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

db.serialize(async () => {
    await query(
        "CREATE TABLE IF NOT EXISTS products (id text PRIMARY KEY, title text, price text)",
        'run');
    await createProductsIfEmpty();

    const existingProducts = await query('SELECT id, title, price FROM products');
    console.log("Existing Products: ");
    console.log(existingProducts);
});

const createProductsIfEmpty = async () => {
    const existingProducts = await query('SELECT * FROM products');

    if (existingProducts?.length === 0) {
        await query(`INSERT INTO products VALUES ("0", "First Product", "1000000")`, 'run');
    }
};

export default db;