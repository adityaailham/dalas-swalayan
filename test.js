fetch('http://localhost:3000/api/categories')
  .then(res => {
    console.log('Status:', res.status);
    return res.text();
  })
  .then(text => console.log('Body:', text.substring(0, 200)))
  .catch(err => console.error('Fetch error:', err));
