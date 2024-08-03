import { useState } from 'react';
import {Link , useNavigate} from 'react-router-dom'; //the usenavigate navigate one page to another page
import { useDispatch, useSelector } from 'react-redux';
//import all the functions that we created
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});  //this will keep track from all the changes
 
  //using two more use state one for error and another for loading 
  // const [error, setError] = useState(null); 
  // const [loading , setLoading] = useState(false);

  //instead of error and loading 
  const { loading, error } = useSelector((state) => state.user); //using useselector hooks we import these two,,, this coming from our global state and the state name is user
  //initialize useNavigate
  const navigate = useNavigate();

  //dispatch initialization
  const dispatch = useDispatch();
 
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
      //setLoading(true); //before send the request the loading to true
      //instead of setloading true dispatch signInStart
      dispatch(signInStart());

    // //this will req the localhost 3000
    const res = await fetch('/api/auth/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //send from the body of the browser and send this information
        body: JSON.stringify(formData),  //the form data change into the stringify , otherwise it not to secure to do that
      });
    const data = await res.json(); //get data in the json format
    console.log(data);
    
    //after request is finish if error is found then set the error through the message
    if(data.success === false){
      // setLoading(false);
      // setError(data.message);
//instead of setloading and seterror using dispatch
      //dispatch data message
      dispatch(signInFailure(data.message));
      return;
    }
    //otherwise set loading to false here because the loading is completed
    // setLoading(false);
    // setError(null); //if everything is fine

    // instead of setting load and error
    dispatch(signInSuccess(data));
    //navigate to home page
    navigate('/');
    }
    catch(error){
      // setLoading(false);
      // setError(error.message);

      //instead of these two
      dispatch(signInFailure(error.message));
    }

  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type="email" placeholder='email'
        className='border p-3 rounded-lg' id='email'onChange={handleChange}/> 

        <input type="password" placeholder='password'
        className='border p-3 rounded-lg' id='password'onChange={handleChange}/>
        
        {/* when loading true the button is disable */}
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg
        uppercase hover:opacity-95 disabled:opacity-80'>
        {loading ? 'Loading...' : 'Sign In'}
        {/* if loading is true the say loading... otherwise sing up */}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
        <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {/* if there is a error we show the paragraph */}
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

