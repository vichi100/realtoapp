# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# Doc url
https://dribbble.com/arunpattnaik/projects/846392-Broker-Network
https://dribbble.com/arunpattnaik/projects/846392-Broker-Network#attachment-1455417

# Color Theme
https://www.flatuicolorpicker.com/used-to/encourage/


## ICON URL

https://oblador.github.io/react-native-vector-icons/

# Date picker calender
https://github.com/roto93/react-native-neat-date-picker/tree/main


### START APPLICATION ON EXPO 

npm start -- --clear

npx expo start -c


### START APPLICATION ON WEB
https://docs.expo.dev/workflow/web/

npx expo start --web


### HOW TO INSTAL FORKED VERSION

npm install jaydeep911/react-native-btr


# How to login mongo db

admin@vmi2390151:~$ mongosh
Current Mongosh Log ID:	67b1076c4264af247b544ca6
Connecting to:		mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8
Using MongoDB:		8.0.4
Using Mongosh:		2.3.8
mongosh 2.3.9 is available for download: https://www.mongodb.com/try/download/shell

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/

test> use realtodb
switched to db realtodb
realtodb> db.auth("realto", "realto123")
{ ok: 1 }
realtodb> show collections
commercial_customers
commercial_properties
commercialpropertycustomers
customers
reminders
residential_customers
residential_properties
users
realtodb> 

# TODO
1) DB functinality to delete property and customer
2) meeting categorization past and future on reminder screen and customer details screen - Done
3) Global search
4) diffrent collor coding on bottom bar - Done
5) meeting reschedule functionality
6) Modify code to store the location where customer wants property. for both type of customer Residential and Commercial
7) create a form so that agent will sent link on whats up to fill that with details
8) create a button on global search right top to check recenly matched property or cutomer  this will have below sections
   1) matched witin hour
   2) today
   3) older
9) liked property
10) display how many percent property or customer match to eachother
11) create location model for residential and commercial property too like customer to provide sugestion at time when some one posting .. that how many possible match this post have
12) add a flag when any add/update/edit opration happen so that if you go to that data page you can refetch the data
   example: you create a meeting then make set newMeetingadded flag to true so if you go on reminder page, you will refech the meeting data

13) create below tables for matching cutomer to property, create seprate table for buy and rent
   1) property -> customer array for residential
   2) property -> customer array for comercial
   3) cusomer -> properties array for residential
   4) cusomer -> properties array for comercial

   There will be schduled job will run after 1 hour from last run

   const PropertySchema = new mongoose.Schema({
      id: { type: String, required: true },
      location: { type: String, required: true },
      price: { type: Number, required: true },
      interestedCustomers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }] // Many-to-Many Reference
   });

   const Property = mongoose.model('Property', PropertySchema);
   module.exports = Property;


   const CustomerSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      interestedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }] // Many-to-Many Reference
   });

   const Customer = mongoose.model('Customer', CustomerSchema);
   module.exports = Customer;


   ✅ 6️⃣ Example: Schedule a Database Cleanup Every Sunday
      const cron = require('node-cron');
      const mongoose = require('mongoose');
      const User = require('./models/User'); // Example Mongoose model

      // Connect to MongoDB
      mongoose.connect('mongodb://localhost:27017/mydb');

      cron.schedule('0 0 * * 0', async () => {
      console.log('Running database cleanup...');
      await User.deleteMany({ inactive: true }); // Delete inactive users
      console.log('Cleanup done!');
      });


14) when ever any new proerty / customer match show user that new matching is found in list as well deatils. this will work as match_count is increase

15) if the property / customer belongs to others agent then in meeting please mention "call with other agent" meeting 

16) when sharing any property deatils make sure you replace original owner deatils

17) when I clicked on matched then go to other section I see matched count that count is total number which is matched for so if I click on count then 
I be able to see there all mached property or customers which are not mine which I wrong I shoud only see mine and his ... not others property matched with others others 

### Remider create logic
1) I m creating reminder for my property with my customer then I should be able to see both proerty and customer original deatils
2) I m creating reminder for my property but with Other customer then I should be able to see my property details but I should not
   be able to customer original details but should see customer Agent details
3) I m creating reminder for my customer but with other property then I should be able to see my customer original deatils but not able to see
   property original addess deatils and owner details , owner details should be replace with agent details



### Global search
1) global search will show results from all agents based on filter criteria
2) when click on "match" button it will show just those properties or customers which are mine and matching 
3) though we show results from other agents but never show other agents properties onwner details and customer deatils.

### ERROR LIST ###
1) When create new resident sell property get error.
2) when you add customer after click "Add" button it navigate to client list 
