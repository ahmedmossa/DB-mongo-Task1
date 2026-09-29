const { MongoClient, ObjectId } = require('mongodb');

// Connection URI and Database Name
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
const dbName = 'mongo_task1';

async function runTask() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to MongoDB server\n');

    const db = client.db(dbName);
    const users = db.collection('users');

    // Clean collection before starting for a fresh run
    await users.deleteMany({});

    // -------------------------------------------------------------------------
    // 1- Use insertOne to add 2 user documents and display the insertedId
    // -------------------------------------------------------------------------
    console.log('--- Step 1: insertOne ---');
    const user1 = await users.insertOne({ name: 'Ahmed', age: 24, city: 'Cairo' });
    console.log('User 1 Inserted ID:', user1.insertedId);

    const user2 = await users.insertOne({ name: 'Sara', age: 22, city: 'Alexandria' });
    console.log('User 2 Inserted ID:', user2.insertedId);

    // -------------------------------------------------------------------------
    // 2- Use insertMany to add at least 10 users (5 of them with age set to 27)
    // -------------------------------------------------------------------------
    console.log('\n--- Step 2: insertMany ---');
    const tenUsers = [
      { name: 'Khaled', age: 27, city: 'Giza' },
      { name: 'Mona', age: 27, city: 'Cairo' },
      { name: 'Omar', age: 27, city: 'Mansoura' },
      { name: 'Nour', age: 27, city: 'Tanta' },
      { name: 'Hassan', age: 27, city: 'Aswan' },
      { name: 'Mariam', age: 30, city: 'Cairo' },
      { name: 'Youssef', age: 25, city: 'Alexandria' },
      { name: 'Salma', age: 31, city: 'Giza' },
      { name: 'Tarek', age: 29, city: 'Luxor' },
      { name: 'Dina', age: 35, city: 'Cairo' }
    ];

    const insertManyResult = await users.insertMany(tenUsers);
    console.log('Inserted Count:', insertManyResult.insertedCount);

    // -------------------------------------------------------------------------
    // 3- Use find to display all documents where the age is 27
    // -------------------------------------------------------------------------
    console.log('\n--- Step 3: find (age: 27) ---');
    const usersAge27 = await users.find({ age: 27 }).toArray();
    console.log('All users with age 27:', usersAge27);

    // -------------------------------------------------------------------------
    // 4- Use limit to display only the first 3 documents where the age is 27
    // -------------------------------------------------------------------------
    console.log('\n--- Step 4: limit (first 3 with age: 27) ---');
    const firstThreeAge27 = await users.find({ age: 27 }).limit(3).toArray();
    console.log('First 3 users with age 27:', firstThreeAge27);

    // -------------------------------------------------------------------------
    // 5- Use findOne to search for a user using the _id and display user data
    // -------------------------------------------------------------------------
    console.log('\n--- Step 5: findOne by _id ---');
    const foundUser = await users.findOne({ _id: user1.insertedId });
    console.log('User found by _id:', foundUser);

    // -------------------------------------------------------------------------
    // 6- Use countDocuments to count how many users have age = 27
    // -------------------------------------------------------------------------
    console.log('\n--- Step 6: countDocuments (age: 27) ---');
    const countAge27 = await users.countDocuments({ age: 27 });
    console.log('Count of users with age 27:', countAge27);

    // -------------------------------------------------------------------------
    // 7- Use updateOne with $set to update name and $inc to increase age
    // -------------------------------------------------------------------------
    console.log('\n--- Step 7: updateOne ($set & $inc) ---');
    const updateOneResult = await users.updateOne(
      { _id: user1.insertedId },
      {
        $set: { name: 'Ahmed Mohamed' },
        $inc: { age: 1 }
      }
    );
    console.log('Modified Count (updateOne):', updateOneResult.modifiedCount);

    // -------------------------------------------------------------------------
    // 8- Use updateMany with $inc to increase the age of all users by 5 years
    // -------------------------------------------------------------------------
    console.log('\n--- Step 8: updateMany ($inc: 5) ---');
    const updateManyResult = await users.updateMany(
      {}, // Applies to all documents
      { $inc: { age: 5 } }
    );
    console.log('Modified Count (updateMany):', updateManyResult.modifiedCount);

    // -------------------------------------------------------------------------
    // 9- Use deleteOne to delete a user using the _id and display deleted count
    // -------------------------------------------------------------------------
    console.log('\n--- Step 9: deleteOne by _id ---');
    const deleteOneResult = await users.deleteOne({ _id: user2.insertedId });
    console.log('Deleted Count (deleteOne):', deleteOneResult.deletedCount);

    // -------------------------------------------------------------------------
    // 10- Use deleteMany to delete users matching a specific condition using deletedCount
    // -------------------------------------------------------------------------
    console.log('\n--- Step 10: deleteMany by condition ---');
    const deleteManyResult = await users.deleteMany({ age: { $gte: 35 } });
    console.log('Deleted Count (deleteMany):', deleteManyResult.deletedCount);

  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    // Close the database connection
    await client.close();
    console.log('\nConnection closed.');
  }
}

runTask();