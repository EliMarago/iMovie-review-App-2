const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API_KEY non definita nelle variabili ambiente." })
    };
  }

  const query = event.queryStringParameters?.query;

  // Costruisci l'URL giusto in base alla presenza di query
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;

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
      body: JSON.stringify({ error: "Errore durante la chiamata all'API.", details: error.message })
    };
  }
};
