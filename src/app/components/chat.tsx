import React, { useState } from 'react';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const structured_message = [
            {
                parts: [{ text: message }],
            },
        ];

        try {
            const res = await fetch('/api/sendToGemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ structured_message }),
            });

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }
            const data = await res.json();

            console.log('Response from Gemini API:', data);

            setResponse(data.candidates[0].content.parts[0].text || data.message);
            setError('');
        } catch (err: unknown) {
            console.error('Error interacting with Gemini API:', err);
            setError('An error occurred while interacting with Gemini API');
        }
    };

    return (
        <div className="chat-container p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message"
                    className="p-2 border rounded w-full"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Send
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && <p>{response}</p>}
        </div>
    );
};

export default Chat;
