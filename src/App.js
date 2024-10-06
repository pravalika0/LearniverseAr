import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import Earth from './Earth';
import Car from './Car';
import Apple from './Apple';
import Duck from './Duck';
import Chair from './Chair';
import Dog from './Dog';
import Planee from './Planee';
import PlantCell from './PlantCell';
const App = () => {
    return ( <
        Router >
        <
        Routes >
        <
        Route path = "/"
        element = { < Home / > }
        /> <
        Route path = "/search"
        element = { < Search / > }
        /> <
        Route path = "/earth"
        element = { < Earth / > }
        /><
        Route path = "/car"
        element = { < Car / > }
        /> <
        Route path = "/apple"
        element = { < Apple / > }
        /><
        Route path = "/duck"
        element = { < Duck / > }
        /><
        Route path = "/chair"
        element = { < Chair / > }
        /><
        Route path = "/dog"
        element = { < Dog / > }
        /><
        Route path = "/planee"
        element = { < Planee / > }
        /><
        Route path = "/plantcell"
        element = { < PlantCell / > }
        />< /
        Routes > <
        /Router>
    );
};

export default App;