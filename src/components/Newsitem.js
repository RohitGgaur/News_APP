import React from 'react'

const Newsitem =(props)=>
   {
    let {title,description,imageUrl,newsUrl,author,date}= props;
    return (
      <div>
        <div className="card">
  <img src={!imageUrl?"https://static.toiimg.com/thumb/msid-103026201,width-1070,height-580,imgsize-28076,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}  <span class="badge bg-secondary">New</span></h5>
    <p className="card-text">{description}</p>
   
    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>

    <a rel="noreferrer" href={newsUrl}target="_blank" className="btn btn-primary">Read More</a>
  </div>
</div>
 </div>
    )
  }


export default Newsitem