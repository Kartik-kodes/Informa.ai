

export default async function handler(request, response) {
  
  const topic = request.query.topic;
  

  const apiKey = process.env.GNEWS_API_KEY;

  const apiUrl = `https://gnews.io/api/v4/search?q=${topic}&lang=en&country=in&token=${apiKey}`;

  try {
    const fetchResponse = await fetch(apiUrl);
    const data = await fetchResponse.json();
    

    response.status(200).json(data);

  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch news' });
  }
}