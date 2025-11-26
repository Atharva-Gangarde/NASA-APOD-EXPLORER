import './App.css';
import { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000/api";

function App() {

  const [apod, setApod] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  
  const getTodayApod = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/today`);
      setApod(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching today's APOD");
    }
    setLoading(false);
  };

  
  const getApodByDate = async (e) => {
    e.preventDefault();
    if (!date) return alert("Select a date first!");

    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/date?d=${date}`);
      setApod(res.data);
    } catch (err) {
      alert("Invalid Date or NASA API Error");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>NASA APOD</h2>
        <h5>Astronomy Picture of the Day</h5>
      </header>

      <div className="container">
        <button onClick={getTodayApod}>Today's APOD</button>

        <form onSubmit={getApodByDate}>
          <label>Select Date :</label>
          <input 
            type='date' 
            name='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type='submit' className='btn'>Get APOD</button>
        </form>
      </div>

      <div className='main-container'>
        {loading && <h2>Loading...</h2>}

        {apod && (
          <>
            <h2>{apod.title}</h2>

            <div className='apod'>
              {apod.media_type === "image" ? (
                <img 
                  src={apod.url} 
                  alt={apod.title} 
                  style={{ width: "80%", borderRadius: "10px" }}
                />
              ) : (
                <iframe
                  src={apod.url}
                  width="80%"
                  height="400"
                  title="apod-video"
                  style={{ borderRadius: "10px" }}
                ></iframe>
              )}
            </div>

            <h3>EXPLANATION SECTION</h3>
            <p>{apod.explanation}</p>
          </>
        )}

        {!apod && !loading && (
          <>
            <h2>APOD TITLE</h2>
            <div className='apod'></div>
            <h3>EXPLANATION SECTION</h3>
            <p>Full explanation text of APOD...</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
