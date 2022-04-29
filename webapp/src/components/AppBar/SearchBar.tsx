import React from "react";
import { useParams } from "react-router-dom";

function SearchBar(placeholder: any) {
    
    const params = useParams();
    return (
        <div className="seach">
            <div className="seachInputs">
                <input type="text" placeholder="Busca un producto..."/>
                <div className="searchIcon">
                </div>
            </div>
            <div className="dataResult"></div>
        </div>
    );
}

export default SearchBar;