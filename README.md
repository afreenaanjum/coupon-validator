# Coupon Validator

Coupon Validator is a Node.js app that has REST endpoints to validate coupon-codes and perform CRUD operations on them. It uses MongoDB to store information about coupon codes.

## Installation

Make sure [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and MongoDB are installed locally. You can dowload installer for community edition of MongoDB from [here](https://www.mongodb.com/try/download/community?tck=docs_server) and you can find the installation steps [here](https://docs.mongodb.com/manual/administration/install-community/). Once successfully completed follow further steps on the terminal, if not you can skip it and get started with the deployed Node.js app.

```bash
git clone https://github.com/afreenaanjum/coupon-validator.git
cd coupon-validator
npm install
npm start
```

The app runs on port 3005 by default.

## Usage

NOTE : Node.js app is deployed at [https://coupon-validate-node.herokuapp.com](https://coupon-validate-node.herokuapp.com)

1. Creating a coupon:

```python
Use (POST)

https://coupon-validate-node.herokuapp.com/coupon
            OR
http://localhost:3005/coupon

Request body format :
{
  "minPurchaseAmt":1000,
  "endDate": "2021-12-12",
  "startDate":"2020-01-01",
  "discountType" : "flat" [Can be either "flat" or "percentage"]
  "flatDiscountAmt" :100,[OPTIONAL for percentage discount type ]
  "percentageDiscount" : 20, [OPTIONAL for flat discount type  ]
  "maxDiscountAmt": 100, [OPTIONAL for flat discount type  ]
}
```

2. Getting all the coupon details:

```python
Use (GET)

https://coupon-validate-node.herokuapp.com/coupon
            OR
http://localhost:3005/coupon
```

3. Getting a coupon detail:

```python
Use (GET)

https://coupon-validate-node.herokuapp.com/coupon/<ADD COUPON ID HERE>
            OR
http://localhost:3005/coupon/<ADD COUPON ID HERE>
```

4. Updating a coupon detail:

```python
Use (PUT)

https://coupon-validate-node.herokuapp.com/coupon/<ADD COUPON ID HERE>
            OR
http://localhost:3005/coupon/<ADD COUPON ID HERE>

Request body format : All the fields are optional here. Only fields which needs change can be added. But if discountType is changed, then all other necessary details should be passed as well.
{
  "discountType" : "flat", [Can be either "flat" or "percentage"]
  "maxDiscountAmt": 100, [REQUIRED for percentage discount type  ]
  "minPurchaseAmt":1000,
  "endDate": "2021-12-12",
  "startDate":"2020-01-01",
  "percentageDiscount" : 20, [REQUIRED for percentage discount type  ]
  "flatDiscountAmt" : 30 [REQUIRED for flat discount type  ]
}
```

5. Deleting a coupon detail:

```python
Use (DELETE)

https://coupon-validate-node.herokuapp.com/coupon/<ADD COUPON ID HERE>
            OR
http://localhost:3005/coupon/<ADD COUPON ID HERE>
```

6. Validating a coupon:

```python
Use (POST)

https://coupon-validate-node.herokuapp.com/coupon/<ADD COUPON ID HERE>/validate
            OR
http://localhost:3005/coupon/<ADD COUPON ID HERE>/validate
Request body format :
{
  totalCartAmt: 3000
}
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
