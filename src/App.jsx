import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({title: '', videoUrl: '', thumbnailUrl: '', channel: ''})

  const API = "https://youtube-clone-api-e22t.onrender.com"

  // Videos fetch
  useEffect(() => {
    fetch(`${API}/api/videos`)
      .then(res => res.json())
      .then(data => {
        setVideos(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API}/api/videos`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form)
    })
    if(res.ok){
      alert('Video Uploaded Successfully!')
      setForm({title: '', videoUrl: '', thumbnailUrl: '', channel: ''})
      setShowForm(false)
      window.location.reload()
    }
  }

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <h1>▶️ TubeClone</h1>
        <button className="upload-btn" onClick={() => setShowForm(!showForm)}>
          + Upload
        </button>
      </nav>

      {/* Upload Form */}
      {showForm && (
        <div className="upload-form">
          <h2>Upload New Video</h2>
          <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Video Title" value={form.title} onChange={handleChange} required/>
            <input name="channel" placeholder="Channel Name" value={form.channel} onChange={handleChange} required/>
            <input name="videoUrl" placeholder="YouTube Video Link" value={form.videoUrl} onChange={handleChange} required/>
            <input name="thumbnailUrl" placeholder="Thumbnail Image Link" value={form.thumbnailUrl} onChange={handleChange} required/>
            <button type="submit">Publish</button>
          </form>
        </div>
      )}

      {/* Video Grid */}
      <div className="video-grid">
        {loading ? <p>Loading...</p> : 
         videos.length === 0 ? <p className="no-video">No videos yet. Upload your first one!</p> :
          videos.map(v => (
            <div key={v._id} className="video-card">
              <img src={v.thumbnailUrl} alt={v.title}/>
              <div className="video-info">
                <h3>{v.title}</h3>
                <p>{v.channel}</p>
                <a href={v.videoUrl} target="_blank">Watch Now</a>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
