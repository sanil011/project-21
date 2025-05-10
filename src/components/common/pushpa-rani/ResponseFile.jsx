import React, { useState, useEffect } from 'react';

const ResponseFile = () => {
    const [username, setUsername] = useState('9999999999'); // Username input
    const [password, setPassword] = useState('testsandy'); // Password input
    const [error, setError] = useState(null);

    // Function to call the login API
    const login = async () => {
        try {
            const apiUrl = 'https://play-247.in/games/rest/v1/user/authenticate'; // Replace with your actual API URL
            console.log("file called");
            // Send POST request with username and password in the body
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify JSON body format
                },
                body: JSON.stringify({
                    username, // Username value
                    password, // Password value
                }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            // Parse the JSON response
            const data = await response.json();

            // Assuming the API sends the tokens as accessToken and refreshToken
            const refreshToken = data.refreshToken; // Ensure the API response has this key

            // Store the refresh token in localStorage or sessionStorage
            localStorage.setItem('refreshToken', refreshToken);
            console.log('Refresh Token:', refreshToken);
        } catch (error) {
            setError(error.message);
            console.error('Login failed:', error);
        }
    };

    useEffect(() => {
        login(); // You can call login inside useEffect or trigger it via button click or form submit
    }, []); // Empty array means it runs once when the component mounts

  return
}

export default ResponseFile