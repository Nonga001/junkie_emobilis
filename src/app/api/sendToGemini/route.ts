// This is the route that sends the message to the Gemini API
// Set the runtime to Edge so the function runs on the edge
export const runtime = 'edge';

export async function POST(req: Request) {
  console.log("API route hit");
  
  // Get the message from the request body
  const { structured_message } = await req.json();
  console.log('Received message:', structured_message);

  try {
    // Send the request to the Gemini API
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDYqBKHKNuy5_F9ZfvYncn4gbenQyvn7lg',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contents: structured_message })
      }
      
    
    );

    // convert the response to a JSON object
    const responseJson = await response.json();

    console.log('Gemini response:', responseJson);


    // conert the response to a string
    // const responseString = JSON.stringify(response.data);

    // Return the concatenated result from all chunks
    return new Response(JSON.stringify(responseJson), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching Gemini response:', error);
    return new Response('Error: Could not generate response from Gemini', { status: 500 });
  }
}