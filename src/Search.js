import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleVoiceSearch = () => {
        const speech = new SpeechSynthesisUtterance(searchQuery);
        window.speechSynthesis.speak(speech);

        if (searchQuery.toLowerCase() === "earth") {
            navigate("/earth");
        } else if (searchQuery.toLowerCase() === "car") {
            navigate("/car");
        } else if (searchQuery.toLowerCase() === "apple") {
            navigate("/apple");
        } else if (searchQuery.toLowerCase() === "duck") {
            navigate("/duck");
        } else if (searchQuery.toLowerCase() === "chair") {
            navigate("/chair");
        } else if (searchQuery.toLowerCase() === "dog") {
            navigate("/dog");
        } else if (searchQuery.toLowerCase() === "planee") {
            navigate("/planee");
        } else if (searchQuery.toLowerCase() === "plantcell") {
            navigate("/plantcell");
        }
    };

    const handleSearchSubmit = () => {
        if (searchQuery.toLowerCase() === "earth") {
            navigate("/earth");
        } else if (searchQuery.toLowerCase() === "car") {
            navigate("/car");
        } else if (searchQuery.toLowerCase() === "apple") {
            navigate("/apple");
        } else if (searchQuery.toLowerCase() === "duck") {
            navigate("/duck");
        } else if (searchQuery.toLowerCase() === "chair") {
            navigate("/chair");
        } else if (searchQuery.toLowerCase() === "dog") {
            navigate("/dog");
        } else if (searchQuery.toLowerCase() === "planee") {
            navigate("/planee");
        } else if (searchQuery.toLowerCase() === "plantcell") {
            navigate("/plantcell");
        }
    };

    return ( <
        div style = { styles.background } >
        <
        div style = { styles.container } >
        <
        h1 style = { styles.title } > Enhanced 3 D Word Learner < /h1>

        <
        div style = { styles.searchContainer } >
        <
        input type = "text"
        placeholder = "Search here"
        style = { styles.input }
        value = { searchQuery }
        onChange = {
            (e) => setSearchQuery(e.target.value)
        }
        /> <
        button style = { styles.voiceButton }
        onClick = { handleVoiceSearch } > 🎙️
        <
        /button> < /
        div >

        <
        button style = { styles.searchButton }
        onClick = { handleSearchSubmit } >
        Submit <
        /button> < /
        div > <
        /div>
    );
};

// Styles for the component
const styles = {
    background: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('/image.png')`, // Referencing img.png from public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    container: {
        backgroundColor: "rgba(255, 255, 255, 0.85)", // Semi-transparent white background
        padding: "40px",
        borderRadius: "10px",
        textAlign: "center",
        maxWidth: "500px",
        width: "100%",
    },
    title: {
        fontSize: "2.5em",
        color: "#333",
        marginBottom: "20px",
    },
    searchContainer: {
        display: "flex",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "25px",
        padding: "10px",
        marginBottom: "20px",
        backgroundColor: "white",
        width: "100%",
        maxWidth: "400px",
    },
    input: {
        flex: 1,
        height: "40px",
        fontSize: "1.2em",
        border: "none",
        outline: "none",
        padding: "0 10px",
    },
    voiceButton: {
        fontSize: "1.5em",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        color: "#007bff",
    },
    searchButton: {
        padding: "10px 20px",
        fontSize: "1.2em",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default Search;