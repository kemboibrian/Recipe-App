// Import necessary dependencies and styles if needed
// import './Search.css';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() !== '') { // Ensure input is not empty
            navigate(`/searched/${input}`);
        }
        // Optionally, you can handle empty input case or validation here
    }

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <FaSearch />
                <input 
                    type="text" 
                    className='search-field'
                    value={input}
                    onChange={handleInput}
                    placeholder="Search..."
                 />
            </form>
        </div>
    );
}

export default Search;
