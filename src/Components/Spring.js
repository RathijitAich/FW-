import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Spring() {
    const [result, setResult] = useState(null);

    useEffect(() => {
        // Fetch the result from the backend
        fetch("http://localhost:8080/api/calculate")
            .then(response => response.json())
            .then(data => setResult(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>1 + 1 is {result !== null ? result : "loading..."}</h1>
        </div>
    );
}


export default Spring;