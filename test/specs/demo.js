const axios = require('axios');
const fs = require('fs');

// Define your API URL
const apiUrl = 'https://api.example.com/orders';

// Read JSON data from file
fs.readFile('orders.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  // Parse JSON data
  const orders = JSON.parse(data);

  // Function to submit orders
  async function submitOrders() {
    for (const order of orders) {
      try {
        const response = await axios.post(apiUrl, order, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_TOKEN` // Replace with your token
          }
        });
        console.log('Order submitted:', response.data);
      } catch (error) {
        console.error('Error submitting order:', error.response ? error.response.data : error.message);
      }
    }
  }

  // Submit all orders
  submitOrders();
});
