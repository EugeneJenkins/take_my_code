import React, { useState } from "react";
import "./SearchInput.scss";

interface SearchInputProps {
    placeholder?: string;
    onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Search...", onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="search-input">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="input"
            />
        </div>
    );
};

export default SearchInput;
