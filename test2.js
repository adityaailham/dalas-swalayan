const fs = require('fs');

fetch('http://localhost:3000/api/categories')
  .then(res => res.text())
  .then(html => {
    // Ambil string di dalam <title> atau teks error
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    console.log("TITLE:", titleMatch ? titleMatch[1] : "No Title");
    
    // Kadang Next.js memberikan pesan error di json stringified
    const errorMatch = html.match(/"message":"([^"]+)"/);
    if(errorMatch) {
      console.log("ERROR MESSAGE IN HTML:", errorMatch[1]);
    }

    fs.writeFileSync('error_output.html', html);
    console.log("Saved full HTML to error_output.html");
  })
  .catch(err => console.error(err));
