import React, { useEffect } from 'react'
import './new.scss'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { FetchNews,CreateNews } from '../../api/request';
import { useState } from 'react';
import swal from 'sweetalert';


const News = () => {
  const [news,setNews] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [picture, setNewsimg] = useState('');
  const [title, setNewstitle] = useState('');
  const [description, setNewsdesc] = useState('');
  const [newsprev, setNewsprev] = useState();
  const [loading, setLoading] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    FetchNews.FETCH_NEWS().then((response) => {
         console.log(response)
         const news = response.data.News
       setNews(news.reverse());
     });
   }, []);

   useEffect(() => {
    if (!picture) {
      setNewsprev(undefined)
        return
    }
    console.log(picture)
    const objectUrl = URL.createObjectURL(picture);
    setNewsprev(objectUrl)
  
    return () => URL.revokeObjectURL(objectUrl)
  }, [picture])
  function Create(event){
    event.preventDefault();
    setLoading(true)
    const data = {picture,title,description};
    console.log(data)
    CreateNews.CREATE_NEWS(data)
    .then(res => {
      console.log(res)
      const news = res.data.News
      setNews(news.reverse());
      swal({
        title: "Success",
        text: "Profile has been changed!",
        icon: "success",
        button: "OK",
      });
      setLoading(false)
      setIsOpen(false)
    }
     )
    .catch(err => console.log(err));
}
   const newslist = news?.map((data) =>{
    return (
        <div className='newses' key={data.id}>
          <div className="pictit">
          <img src={data.picture} alt="" />
        </div>

        <div className="desdat">
          <div className='subdesdata'>
            <span> 
              Title: <br/>
            </span>
            {data.title} 
          </div>

          <div className='subdesdata'> 
            <span>
               Date Posted: <br/>
            </span>
            {data.date}
           </div>

          <div className='subdesdata'> 
            <span>
              Description: <br/>
            </span>
            {data.description} 
          </div>
        </div>

      </div>
      );
   })
  return (
    <>
    <div className="news">
        <Sidebar/>
      <div className='newscontainer'>
       <Navbar/>
      <div className="newsCon">
       <div className='headnews'>
       <h1>Recent News</h1>
       <button onClick={togglePopup}>Add News</button>
     </div>

     {isOpen && (
        <div className="create_news">
          <div className='xbtn'> 
          <button onClick={togglePopup}>X</button>
          </div>
          <br/>

          <form onSubmit={Create}><br/>
            <div className='field'>
            <input type="text" 
              className="field" 
              size='small' 
              onChange={e=> setNewstitle(e.target.value)} />
            </div>
            <br/>

            <div className='field'>
            <br/>
            <textarea  
              className="textArea" 
              size='small' 
              onChange={e=> setNewsdesc(e.target.value)} />
            </div>
            <br/>
            
            <div className='chooseimgnews'>
             
              <div className="newsimgprev">
             
              <label className='label'> News Images: </label>
             
              <input type="file" 
                  className='file'
                  onChange={e=> setNewsimg(e.target.files[0])} 
                />
                
              {picture &&  
                <img className='previmg' 
                src={newsprev} 
                width={300} 
                height={110}
                alt=''
                /> }

            </div>
            </div>

            <button type='submit' className='submitbtn'> Create News</button>

          </form>
        </div>
      )}
     <div className="content">
      {newslist}
     </div>
     </div>         
    </div>
    </div>
    </>
  )
}

export default News;
