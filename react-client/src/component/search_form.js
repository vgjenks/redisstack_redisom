import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "./scss/form.scss"
import "./scss/search_form.scss"

const SearchForm = () => {
    const [searchStatus, setSearchStatus] = useState("Search on left for results");
    const [searchResult, setSearchResult] = useState(null);

    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = async formData => {
        let searchParams = new URLSearchParams(formData);
        let url = `http://localhost:3100?${searchParams}`;
        let result = await fetch(url, { method: "GET" });
        if (result.status === 200) {
            let jsonResult = await result.json();
            setSearchResult(jsonResult);
        } else {
            setSearchResult(null);
            setSearchStatus(result.statusText);
        }
    };

    return (
        <div className="search-layout">
            <div className="search-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>
                            Visit Purpose
                            <select {...register("visit_purpose")}>
                                <option value="">Select One</option>
                                <option value="business">Business</option>
                                <option value="vacation">Vacation</option>
                                <option value="shopping">Shopping</option>
                                <option value="sightseeing">Sightseeing</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Visited City
                            <input type="text" {...register("visit_city")} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Home City
                            <input type="text" {...register("city")} />
                        </label>
                    </div>
                    <div>
                        <label>
                            First Name
                            <input type="text" {...register("first_name")} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Last Name
                            <input type="text" {...register("last_name")} />
                        </label>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div className="search-results">
                {searchResult ? 
                    searchResult.map((item, i) => (
                        <div key={i}>
                            <div><strong>{item.first_name} {item.last_name}</strong></div>
                            <div>Visits:</div>
                            <ul>
                                {item.visits.map((visit, i) => {
                                    let visitLoc = `https://www.google.com/maps/search/?api=1&query=${visit.point.latitude}%2C${visit.point.longitude}`;
                                    let visitStart = new Intl.DateTimeFormat().format(new Date(visit.start));
                                    let visitEnd = new Intl.DateTimeFormat().format(new Date(visit.end));
                                    return <li key={i}><a href={visitLoc} target="_blank" rel="noreferrer">{visit.city}, {visit.state}</a> {visitStart} - {visitEnd} ({visit.purpose})</li>
                                })}
                            </ul>
                        </div>
                    ))
                    :
                    searchStatus
                }
            </div>
        </div>
    );
};

export default SearchForm;