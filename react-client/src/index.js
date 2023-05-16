import React from "react";
import ReactDOM from "react-dom/client";

import Search from "./component/search";

import "./scss/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Search />
    </React.StrictMode>
);
