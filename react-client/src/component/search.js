import React from "react";

import SearchForm from "./search_form";

import "./scss/search.scss"

const Search = () => {
    return (
        <div className="home-layout">
            <header>
                <h1>
                    Using Redis Stack with Redis OM
                </h1>
                <div>
                    Fast and easy document storage and search!
                </div>
            </header>
            <main>
                <SearchForm />
            </main>
            <footer>
                <a href="https://vincentjenks.com" target="_blank" rel="noreferrer">
                    2023 Vincent Jenks
                </a>
            </footer>
        </div>
    );
};

export default Search;