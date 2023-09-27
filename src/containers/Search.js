import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {

   const [keywords, setkeywords] = useState('');
   const navigate = useNavigate(); 

    const searchHandler = (e) => {
        e.preventDefault()

        if(keywords.trim()) {
            navigate(`/search/${keywords}`)
        }else {
            navigate('/');
        }
    }

  return (
    <form className='ui form' onSubmit={searchHandler}>
      <div className='ui action input'>
        <input
          type='text'
          id='search_field'
          placeholder='Please search here'
          onChange = {(e)=> setkeywords(e.target.value)}
          style={{width : "1000px", marginBottom : "15px" }}
        />
        <button className='ui button' type='submit'>
          <i className='search icon'></i>
        </button>
      </div>
    </form>
  );
};

export default Search;
