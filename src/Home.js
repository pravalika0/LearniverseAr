import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
    const navigate = useNavigate(); // Hook for navigation

    const handleGetStarted = () => {
        navigate('/search'); // Correct navigation using useNavigate
    };

    return ( <
        div style = { styles.container } >
        <
        div style = { styles.content } >
        <
        h1 style = { styles.heading } > Welcome to LearniverseAr < /h1> <
        p style = { styles.paragraph } >
        LearniverseAr helps children visualize things in 3 D, making learning more interactive and engaging. <
        /p> <
        button style = { styles.button }
        onClick = { handleGetStarted } >
        Get Started <
        /button> <
        /div> <
        /div>
    );
};

// Styles for the component
const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url('https://elearningindustry.com/wp-content/uploads/2020/12/augmented-reality-in-education.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    content: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '40px',
        borderRadius: '10px',
        textAlign: 'center',
        maxWidth: '500px',
    },
    heading: {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '20px',
    },
    paragraph: {
        fontSize: '1.2em',
        color: '#555',
        marginBottom: '30px',
    },
    button: {
        padding: '15px 30px',
        fontSize: '1.2em',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Home;