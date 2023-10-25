import { useState, useEffect } from 'react'
import './assets/index.css'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://apaxhozqzkddxxeocgwo.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwYXhob3pxemtkZHh4ZW9jZ3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyNTEwMTAsImV4cCI6MjAxMzgyNzAxMH0.ARX-xt6y6O8pTGDQPHFN_91CaNH5KswxL8zCC5SVoE0');

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        // console.log(error);
      } else {
        setUser(user);
      }
    };

    fetchUser();
  }, []);

  async function signIn(event) {
      event.preventDefault(); 
      const {data, error} = await supabase.auth.signInWithOtp({
        email: email,
      });

      if(error) {
        // ! alert("There is an error!")
      } else {
        // ! alert("Link sent to email address.")
      }
  }
  
  const isEmailValid = email !== '';

  return (
    <div className='container'>
    { user === null ? (
      <>
          <div className="container mt-20 text-center">
            <h1 className='mt-10 mb-10 text-4xl font-bold text-purple-400'>Welcome back! Please Log In Below.</h1>
            <input onChange={(event) => {event.preventDefault(); setEmail(event.target.value);}} type="email" className="bg-gray-100 border border-gray-400 text-gray-800 text-sm rounded-lg p-2 w-2/4 sm:w-1/4" placeholder="name@email.com" required/>
            <button onClick={signIn}  disabled={!isEmailValid} className='px-4 py-2 bg-pink-300 hover:bg-pink-400 border-solid border-[1px] border-pink-600 ml-4 rounded-md'>→ Log In</button>
          </div> 
      </>
    ) : (
<>
<div className='container mt-20 text-center'>
  <h1 className='text-xl font-bold text-purple-400'>Email : {user.email}</h1>
  {/* <p>display things that are private to this email specific account!</p> */}
  <button onClick={() => {window.location.href = "https://resourcerise.vercel.app"}} className='p-1 px-2 text-md bg-red-400 rounded-md text-white'>Successfully logged in to Resource Rise, click here to redirect!</button>
  <p className="text-xs text-gray-300">Please check your email inbox, after clicking log in!</p>
</div>
</>
    )
}
    </div>
)
    }
