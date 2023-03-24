const { faker } = require('@faker-js/faker');
const AWS = require('aws-sdk');
const REGION = "us-west-2";
AWS.config.update({region: REGION});

// Note: aws-sdk automatically picks up access id and key from environmental variables

// Create Client
const ddbClient = new AWS.DynamoDB({apiVersion: '2012-08-10'}); 

// List of icons to randomly sample from
const makiIcons = ['circle', 'circle-stroked', 'caution', 'marker', 'marker-stroked', 'information', 'construction', 'cross', 'roadblock', 'star']

// List of [latitude, longitude] of major cities.
const cities = require('./cities');

// Generate a dataset of given size with random data near cities
const generateDataset = (dataset_id, size) => {
  return {
    dataset_id: dataset_id,
    points: Array.from({ length: size }, (_, i) => {
      // Choose random city and radius
      const city = faker.helpers.arrayElement(cities);
      const bound = faker.datatype.number(1.5);
      let latMax = Math.min(city[0]+bound, 90);
      let latMin = Math.max(city[0]-bound, -90);
      let lonMax = Math.min(city[1]+bound, 180);
      let lonMin = Math.max(city[1]-bound, -180);

      return {
        coordinate_id: `coordinate_${i+1}`,
        latitude: faker.address.latitude(max=latMax, min=latMin),
        longitude: faker.address.longitude(max=lonMax, min=lonMin),
        icon_type: faker.helpers.arrayElement(makiIcons)
      };
    })
  }
}

// Poll a table until it becomes active
async function waitForTable() {
  console.log(`Waiting for table ${tableName} to become active...`);
  while (true) {
    const result = await ddbClient.describeTable({ TableName: tableName }).promise();
    const status = result.Table.TableStatus;
    if (status === 'ACTIVE') {
      console.log(`Table ${tableName} is now active.`);
      break;
    }
    console.log(`Table ${tableName} status: ${status}.`);
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

// Table schema
const tableName = 'datasets';

const tableParams = {
  TableName: tableName,
  KeySchema: [
    { AttributeName: 'dataset_id', KeyType: 'HASH' },     // Partition key
    { AttributeName: 'coordinate_id', KeyType: 'RANGE' }, // Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'dataset_id', AttributeType: 'S' },
    { AttributeName: 'coordinate_id', AttributeType: 'S' },
  ],
  BillingMode: "PAY_PER_REQUEST"
};

const describeParams = {
  TableName: tableName
}

// Check if table exists. If it doesn't, create it and generate data
ddbClient.describeTable(describeParams, function(err, data) {
  if (err) {
    if (err.code === 'ResourceNotFoundException') {
      ddbClient.createTable(tableParams, async function(err, data) {
        if (err) {
          console.error('Error creating table:', err);
        } else {
          console.log('Table created successfully:', data.TableDescription.TableName);

          // Wait for table to become active
          await waitForTable();

          // Generate four datasets of size 10, 100, 1000, 10000
          const datasets = [generateDataset('dataset_10', 10), generateDataset('dataset_100', 100), generateDataset('dataset_1000', 1000), generateDataset('dataset_10000', 10000)];

          // Add items to table
          datasets.forEach((set) => {
            set.points.forEach((point) => {
              const itemParams = {
                TableName: tableName,
                Item: {
                  'dataset_id': {S: set.dataset_id},
                  'coordinate_id': {S: point.coordinate_id},
                  'latitude': {N: point.latitude},
                  'longitude': {N: point.longitude},
                  'icon_type': {S: point.icon_type}
                },
              }
              ddbClient.putItem(itemParams, function(err, data) {
                if (err) {
                  // console.log("Error putting item:", err);
                } else {
                  // console.log("Item added successfully");
                }
              });
            });
          });
          console.log("Finished");
        }
      });
    } else {
      console.error('Error creating table:', err);
    }
  } else {
    console.log("Table already exists:", data);
  }
});