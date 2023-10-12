// Import necessary libraries
const mongoose = require('mongoose');
const express=require('express');
const app=express();
app.use(express.json())

require('dotenv').config(); // Load environment variables from .env

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// Set up MongoDB connection
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI).then(()=>{console.log('dataa connected')});
// const connection = mongoose.connection;

// connection.once('open', () => {
//   console.log('MongoDB database connection established successfully');
// });

// connection.on('error', (err) => {
//   console.error('Error connecting to MongoDB:', err);
// });

// Define the Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
// Create the Person model using the schema
const Person = mongoose.model('Person', personSchema);
 // get request all data with th server
 app.get('/api/task1', async (req, res) => {
  try {
    const allPersons = await Person.find();
    res.json(allPersons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/api/update/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const person = await Person.findById(id);

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // Assuming req.body contains the fields you want to update
    const updatedPerson = await Person.findByIdAndUpdate(id, req.body, { new: true });

    res.json({ msg: 'Person updated successfully', updatedPerson });
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Task 1: Create a person with the specified prototype
const personInstance = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pizza", "Burger", "Ice Cream"],
  });
// Save the person instance
personInstance.save()
  .then(data => {
    console.log("Task 1: Person saved successfully:", data);


    // For example, you can continue with the search tasks or any other tasks.
  })
  .catch(err => {
    console.error(err);
  });

  // Task 2: Create and Save a Record of a Model
// const newPersonData = {
//     name: "Jane Doe",
//     age: 30,
//     favoriteFoods: ["Sushi", "Pasta"],
//   };
  
//   const newPerson = new Person(newPersonData);
  
//   newPerson.save()
//     .then(data => {
//       console.log("Task 2: New person saved successfully:", data);
  
//       // Rest of your code...
  
//       // For example, you can continue with the next task.
//     })
//     .catch(err => {
//       console.error(err);
//     });
app.post('/api/task2', async (req, res) => {
  try {
    // const newPersonData = {
    //   name: "basma",
    //   age: 30,
    //   favoriteFoods: ["Sushi", "Pasta"],
    // };
    const newPerson = new Person(req.body);
    const data = await newPerson.save();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/deleteById/:id', async (req, res) => {
  const personIdToDelete = req.params.id;

  try {
    const result = await Person.findByIdAndRemove(personIdToDelete);

    if (result) {
      res.status(200).json({
        message: `Person with ID '${personIdToDelete}' deleted successfully`,
      });
    } else {
      res.status(404).json({ message: 'No matching record found for deletion' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  // Task 3: Create Many Records with model.create()
  
  // const arrayOfPeople = [
  //   { name: "Alice", age: 25, favoriteFoods: ["Burrito", "Salad"] },
  //   { name: "Bob", age: 28, favoriteFoods: ["Steak", "Pizza"] },
  //   { name: "Charlie", age: 22, favoriteFoods: ["Sushi", "Burger"] },
  //   { name: "Mary", age: 30, favoriteFoods: ["Burritos", "Tacos"] },
  // ];
  
  // Person.create(arrayOfPeople)
  //   .then(people => {
  //     console.log("Task 3: People created successfully:", people);
  
  //     // Rest of your code...
  
  //     // For example, you can continue with the next task.
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });
  
// Task 1: Use model.findOne() to Return a Single Matching Document
const foodToSearch = "Burrito";
Person.findOne({ favoriteFoods: foodToSearch })
  .then(person => {
    console.log(`Task 1: Person who likes ${foodToSearch}:`, person);
  })
  .catch(err => {
    console.error(err);
  });

// Task 2: Use model.findById() to Search Your Database By _id
const personIdToFind = "65234183c351e65599c3fdac";
Person.findById(personIdToFind)
  .then(person => {
    console.log(`Task 2: Person found by id ${personIdToFind}:`, person);
  })
  .catch(err => {
    console.error(err);
  });

// Task 3: Perform Classic Updates by Running Find, Edit, then Save
const personIdToUpdate = "65234183c351e65599c3fdab";
Person.findById(personIdToUpdate)
  .then(person => {
    person.favoriteFoods.push("Hamburger");
    return person.save();
  })
  .then(updatedPerson => {
    console.log("Task 3: Person updated successfully:", updatedPerson);
  })
  .catch(err => {
    console.error(err);
  });

// Task 4: Perform New Updates on a Document Using model.findOneAndUpdate()
const personNameToUpdate = "John Doe";
Person.findOneAndUpdate({ name: personNameToUpdate }, { age: 20 }, { new: true })
  .then(updatedPerson => {
    console.log("Task 4: Person updated successfully:", updatedPerson);
  })
  .catch(err => {
    console.error(err);
  });

// Task 5: Delete One Document Using model.findByIdAndRemove
const personIdToDelete = "65233dd8c52694f079874368";
Person.findByIdAndRemove(personIdToDelete)
  .then(removedPerson => {
    console.log("Task 5: Person removed successfully:", removedPerson);
  })
  .catch(err => {
    console.error(err);
  });

// Task 6: MongoDB and Mongoose - Delete Many Documents with model.deleteMany()
const personNameToDeleteMany = "Mary";
Person.deleteMany({ name: personNameToDeleteMany })
  .then(result => {
    console.log(`Task 6: ${result.deletedCount} people named '${personNameToDeleteMany}' deleted successfully`);
  })
  .catch(err => {
    console.error(err);
  });

// Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: "Burritos" })
  .sort({ name: "asc" })  // Sort in ascending order by name
  .limit(2)  // Limit the results to two documents
  .select({ age: 0, _id: 0 })  // Exclude the age and _id fields from the results
  .exec()  // No callback here, just execute the query
  .then(data => {
    console.log("People who like burritos:", data);
  })
  .catch(err => {
    console.error("Error executing the query:", err);
  });
