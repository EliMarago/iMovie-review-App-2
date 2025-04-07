const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const apiKey = process.env.API_KEY;

  const query = event.queryStringParameters?.query;

  let url = "";

  if (query) {
    // Search mode
    url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
  } else {
    // Popular movies
    url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Errore dal server", error: err.message }),
    };
  }
};
