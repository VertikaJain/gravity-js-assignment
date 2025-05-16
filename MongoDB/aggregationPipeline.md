## Sales Aggregation pipeline to calculate total revenue and average price , and sort by store and month

### Step 1: Created db and then collection named sales

`use saleDB`

### Step 2: Added records using insertMany()

`db.sales.insertMany([{...},{...}])`

### Step3: Check data using find()

`db.sales.find()`

### Step4: Aggregation pipeline using grouping and sorting

```
db.sales.aggregate([
{
$unwind: "$items"
},
{
$addFields: {
      month: { $dateToString: { format: "%Y-%m", date: "$date" } }
}
},
{
$group: {
      _id: { store: "$store", month: "$month" },
      totalRevenue: {
        $sum: {
          $multiply: ["$items.quantity", "$items.price"]
        }
      },
      averagePrice: { $avg: "$items.price" }
}
},
{
$project: {
      _id: 0,
      store: "$\_id.store",
month: "$\_id.month",
totalRevenue: 1,
averagePrice: 1
}
},
{
$sort: {
store: 1,
month: 1
}
}
]);
```

### Output

[
{
totalRevenue: 110,
averagePrice: 15,
store: 'Store A',
month: '2024-06'
},
{
totalRevenue: 49,
averagePrice: 18.5,
store: 'Store A',
month: '2024-07'
},
{
totalRevenue: 120,
averagePrice: 22.5,
store: 'Store B',
month: '2024-06'
},
{
totalRevenue: 60,
averagePrice: 14,
store: 'Store C',
month: '2024-06'
}
]
