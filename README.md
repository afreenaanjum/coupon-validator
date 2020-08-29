# Coupon Validator

Coupon Validator is a Node.js app that has REST endpoint to create and validate coupon codes stored in MONGODB .

# About

Helps to create, get, update and delete the details of the coupon. Alongside, helps in validating coupon and calculating the max discount that can be availed from the coupon.

## Installation

Make sure [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [MONGODB](https://docs.mongodb.com/manual/installation/) are installed locally. Once successfully completed follow further steps, if not you can skip it and get started with deployed nodejs server:

```bash
git clone https://github.com/afreenaanjum/coupon-validator.git
cd coupon-validator
npm install
npm start
```

The app runs on port 3005 by default, and the root can be accessed by navigating to http://localhost:3005/api

## Usage

NOTE : Node.js app is deployed at [https://coupon-validate-node.herokuapp.com](https://coupon-validate-node.herokuapp.com)

1. Creating a coupon code:

```python
Use (POST)

https://coupon-validate-node.herokuapp.com/coupons/
            OR
http://localhost:3005/coupouns

Request body format :
{
  "maxDiscountAmt": 100,
  "minPurchaseAmt":1000,
  "endDate": "2021-12-12",
  "startDate":"2020-01-01",
  "percentage" : 20 [OPTIONAL for flat discount coupon]

}
```

2. Getting all the coupon details:

```python
Use (GET)

https://coupon-validate-node.herokuapp.com/coupons/
            OR
http://localhost:3005/coupouns
```

3. Getting a coupon detail:

```python
Use (GET)

https://coupon-validate-node.herokuapp.com/coupons/<ADD COUPON ID HERE>
            OR
http://localhost:3005/coupouns/<ADD COUPON ID HERE>
```

4. Updating a coupon detail:

```python
Use (PUT)

https://coupon-validate-node.herokuapp.com/coupons/<ADD COUPON ID HERE>
            OR
http://localhost:3005/coupouns/<ADD COUPON ID HERE>

Request body format : All the fields are optional here. Only fields which needs change can be added.
{
  "maxDiscountAmt": 100,
  "minPurchaseAmt":1000,
  "endDate": "2021-12-12",
  "startDate":"2020-01-01",
  "percentage" : 20

}
```

5. Deleting a coupon detail:

```python
Use (DELETE)

https://coupon-validate-node.herokuapp.com/coupons/<ADD COUPON ID HERE>
            OR
http://localhost:3005/coupouns/<ADD COUPON ID HERE>
```

6. Valiting a coupon:

```python
Use (POST)

https://coupon-validate-node.herokuapp.com/coupons/<ADD COUPON ID HERE>?totalCartAmt=<ADD TOTAL CART AMOUNT>
            OR
http://localhost:3005/coupouns/<ADD COUPON ID HERE>?totalCartAmt=<ADD TOTAL CART AMOUNT>

Request body format : {}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Author

Afreena Anjum

## License

[MIT](https://choosealicense.com/licenses/mit/)

```

```
