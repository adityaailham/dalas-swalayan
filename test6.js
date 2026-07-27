fetch('http://localhost:3000/api/dashboard/stats')
  .then(res => res.json())
  .then(data => console.log("DATA DARI DASHBOARD:", JSON.stringify(data, null, 2)))
  .catch(err => console.error("ERROR DASHBOARD:", err));
