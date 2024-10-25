import {FaSearch} from 'react-icons/fa'; //import the fasearch from the react icons fa . the fa stands for font awesome
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); //this method track the previous url.
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md '>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>

    <Link to='/'> 
    {/* this link to method link to another page which you mentioned and if you click the component under link to it will go the linked page */}
    <h1 className='font-bold text-sm: sm:text-xl flex flex-wrap'>
    {/* here text-sm means small(mobile size) and the sm:text-xl means large(full screen)  and the flex-wrap using for the mobile screen to show the text on top on each other*/}
       
        <span className='text-slate-500'>Dream</span> 
        <span className='text-slate-700'>Estate</span>
    </h1>
    </Link>
    <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
        <input type='text' 
         placeholder='Search...'
         className='bg-transparent focus:outline-none w-24 sm:w-64'
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
    </form>

    <ul className='flex gap-4'>
    <Link to='/'> 
        <li className='hidden sm:inline text-slate-700 hover:underline'>
          Home
        </li>
        </Link>

        <Link to='/about'> 
        <li className='hidden sm:inline text-slate-700 hover:underline'>
          About
        </li>
        </Link>
        <Link to='/profile'>
            {currentUser ? (
              <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
        </Link>
    </ul>
    </div>
    </header>
  );
}
