const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const contacts = require('./data/contacts.js'); // import data from contacts 
// const vehicles = require('./data/vehicles.js'); //import data from vehicles 
const comments = require('./data/comments.js'); //import data from comments 
// const products = require('./data/products.js'); //import data from products 

const contactRoutes = require('./routes/contacts');
const vehicleRoutes = require('./routes/vehicles');
const productsRoute = require('./routes/products');
const port = process.env.PORT || 4001;


// my middleware 
app.use(express.static('public'));
// if doesent work above try ('./public')
app.use(bodyParser.json()); 

// can do this two ways
// #1 (check contacts.js in routes and compare against vehicles.js or products.js)
app.use(contactRoutes)
// #2
app.use("/vehicles", vehicleRoutes)
app.use("/products", productsRoute)


// all routes if route not found sends back error
app.all("*", (req, res) => {
    res.status(404).send('<h1>Resource not found</h1>')
})
// app.get("/contacts", (req, res) => {
//     res.json(contacts);
// })

// app.get("/vehicles", (req, res) => {
//     res.json(vehicles);
// })

app.get("/comments", (req, res) => {
    res.json(comments);
})

// app.get("/products", (req, res) => {
//     res.json(products);
// })


// app.get("/contacts/:id", (req, res) => {
//     console.log('its working')
//     res.json(contacts.find((contact) => {
//         return contact._id == req.params.id
//     }))
// })

// app.get("/vehicles/:id", (req, res) => {
//     res.json(vehicles.find((vehicle) => {
//         return vehicle._id == req.params.id
//     }))
// })

app.get("/comments/:id", (req, res) => {
    res.json(comments.find((comment) => {
        return comment._id == req.params.id
    }))
})

// app.get("/products/:id", (req, res) => {
//     res.json(products.find((product) => {
//         return product._id == req.params.params
//     }))
// })

app.post("/contacts", (req, res) => {
    console.log(req.body)
    let counter = contacts.length + 1
    const newContact = {...req.body, _id: counter}
    // const newContact = {
    //     _id: contacts.length + 1, 
    //     name: req.body.name,
    //     occupation: req.body.occupation,
    //     avatar: req.body.avatar
    //   }

      contacts.push(newContact)
      res.json(contacts[counter])
})


app.put("/contacts:id", (req, res) => {
    let id = req.params.id

    const contact = contacts.find((comment) => {
        return comment._id == id
    })

    const updatedContact = {...contact, ...req.body}

    res.json(updatedContact)

})

// app.post("/vehicles", (req, res) => {
//     console.log(req.body)
//     const newVehicle = {
//         _id: vehicles.length + 1,
    
//     year: req.body.year,
//     make: req.body.make
//     }

//     vehicles.push(newVehicle)
//     res.json(vehicles[vehicles.length - 1])
// })




app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});
