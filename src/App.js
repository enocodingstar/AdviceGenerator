import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const [advice, setAdvice] = useState('');
  const [randomNumber, setRandomNumber] = useState(null);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 200 + 1);
  };

  const fetchAdvice = async (randomNum) => {
    try {
      const response = await fetch(`https://api.adviceslip.com/advice/${randomNum}`);
      if (response.ok) {
        const data = await response.json();
        const newAdvice = data.slip.advice;

        console.log('New Advice:', newAdvice);

        setAdvice(newAdvice);
      } else {
        console.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error:`, error.message);
    }
  };

  useEffect(() => {
    const initialRandomNumber = generateRandomNumber();
    setRandomNumber(initialRandomNumber);
    fetchAdvice(initialRandomNumber);
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const generateNewAdvice = () => {
    const newRandomNumber = generateRandomNumber();
    setRandomNumber(newRandomNumber);
    fetchAdvice(newRandomNumber);
  };
    return(
       <main>
         <div className='adviceCard'>
            <div className="header">
              <h6>{`ADVICE # ${randomNumber}`}</h6>
            </div>
            <div className="adviceContent">
              <p>{`"${advice}"`}</p>
            </div>
            <div className="svgContainer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 444 16" preserveAspectRatio="xMidYMid meet" width="100%">
                <g fill="none" fillRule="evenodd">
                  <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
                  <g transform="translate(212)" fill="#CEE3E9">
                   <rect width="6" height="16" rx="3" />
                   <rect x="14" width="6" height="16" rx="3" />
                  </g>
                </g>
              </svg>
            </div>
            <button onClick={generateNewAdvice}>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005
                 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 
                 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5
                 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 
                 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 
                 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 
                 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="#202733"/>
              </svg>
            </button>
         </div>
       </main>
    );
}

export default App;
