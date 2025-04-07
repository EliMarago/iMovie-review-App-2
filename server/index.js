const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const apiKey = process.env.API_KEY; // La tua chiave API è recuperata dalla variabile d'ambiente di Netlify
const query = event.queryStringParameters?.query || "popular";


  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Errore durante la chiamata all'API." })
    };
  }
};
