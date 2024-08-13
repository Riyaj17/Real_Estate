import { useState } from 'react';
import {Link , useNavigate} from 'react-router-dom'; //the usenavigate navigate one page to another page
import OAuth from '../components/OAuth';


export default function SignUp() {
  const [formData, setFormData] = useState({});  //this will keep track from all the changes
 
  //using two more use state one for error and another for loading 
  const [error, setError] = useState(null); 
  const [loading , setLoading] = useState(false);
  //initialize useNavigate
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setFormData(
      {  
        ...formData, //here we kept the previous information like username then email , so we dont loose track of the information ...using spread opetator
        [e.target.id]: e.target.value, //whatever is changing in e.target.id set it on to its value
      });
  };

  const handleSubmit =async(e) =>{
    e.preventDefault();

    //using try and catch to get the possible error in the fornt-end
    try{
      setLoading(true); //before send the request the loading to true

    // //this will req the localhost 3000
    const res = await fetch('/api/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //send from the body of the browser and send this information
        body: JSON.stringify(formData),  //the form data change into the stringify , otherwise it not to secure to do that
      }
    );
    const data = await res.json(); //get data in the json format
    console.log(data);
    
    //after request is finish if error is found then set the error through the message
    if(data.success === false){
      setLoading(false);
      setError(data.message);
      return;
    }
    //otherwise set loading to false here because the loading is completed
    setLoading(false);
    setError(null); //if everything is fine
    //navigate to sign in page
    navigate('/sign-in');
    }
    catch(error){
      setLoading(false);
      setError(error.message);
    }

  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type="text" placeholder='username'
        className='border p-3 rounded-lg' id='username'onChange={handleChange}/>

        <input type="email" placeholder='email'
        className='border p-3 rounded-lg' id='email'onChange={handleChange}/> 

        <input type="password" placeholder='password'
        className='border p-3 rounded-lg' id='password'onChange={handleChange}/>
        
        {/* when loading true the button is disable */}
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg
        uppercase hover:opacity-95 disabled:opacity-80'>
        {loading ? 'Loading...' : 'Sign up'}
        {/* if loading is true the say loading... otherwise sing up */}
        </button>
        {/* adding oauth conponent */}
        <OAuth />

      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {/* if there is a error we show the paragraph */}
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}