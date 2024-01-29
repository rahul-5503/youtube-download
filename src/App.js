import React from 'react'
import { useState } from 'react';
import './App.css'

export default function App() {
  const [detail,setDetail] = useState({
    urli: ''
  })
  const [uri,setUri] = useState([]);
  const handleChange = (e)=>{
      setDetail({...detail,[e.target.name]:e.target.value})
  }
  async function fetchme() {
    try {
      const response = await fetch(`https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${detail.urli}`, {
        method : 'GET',
        headers: {
          'X-RapidAPI-Key' :process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host':process.env.REACT_APP_API_HOST
        }
      });
      const data = await response.json();
      setUri(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }  
  } 
  return (
    <div>
      <div className='head'>
        <h1> youtube Downloader</h1>
          <form  className = "form-item">
            <input name      = "urli" value = {detail.urli} onChange = {handleChange} 
            placeholder="Enter Youtube Video URL"/><br/>
            <input type      = 'button'value='click' onClick = {fetchme}/>
          </form>
          <h1>{detail.Name}</h1><br/>
          <h4>{uri.title}<br/></h4> 
          <center>
            <div className='video-container'>
                {uri.formats && uri.formats.length > 0 ? 
                (
                    uri.formats.map((format, index) => (
                    <div key = {index} className='video-box'>
                      {index + 1}
                      <center>quality: {format.qualityLabel}</center> 
                      <video src = {format.url} controls width = "320" height = "240"  type = 'video/mp4'/>
                    </div>
                  ))
                ) : (
                  <div>No video available</div>
                )}
            </div>
          </center>
          
        </div>
        <footer>
           &copy; 2022 ytstream
        </footer>  
        </div>
  )
}
  //audio_high

