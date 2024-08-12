import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {

  const dispatch = useDispatch(); //initialize dispatch method
  const navigate = useNavigate(); //initialize navigate method

  const handleGoogleClick = async () => {
    try {

      const provider = new GoogleAuthProvider(); //to get google auth using google auth provider
      const auth = getAuth(app); //get auth is coming from the firebase/auth  and the app is define which application creating the request


      const result = await signInWithPopup(auth, provider); //open the pop up window by using the auth and provider

      //now send the data or information into the backend
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();  //when we get the information then convert it into a json format
      dispatch(signInSuccess(data));  //now dispatch and pass the data
      navigate('/');   //navigate the user to the home page
      
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  );
}
