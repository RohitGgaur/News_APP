import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"
export class News extends Component {
static defaultProps={
  country:'in',
  pageSize:8,
  category:'general',

}
static propType={
  country:PropTypes.string,
  pagesize:PropTypes.number,
  category:PropTypes.string
}

 constructor(){
  super();
  console.log("Hello I am a constructor from News component ");
  this.state={
  articles:[],
  loading:false,
  page:1,
  totalResults:0
  }
 }


 async componentDidMount(){
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ecf58ea7c64f4df2b6045d0890f822c6&page=1&pagesize=${this.props.pagesize}`;
  let data=await fetch(url);
  let parsedData=await data.json()
  console.log(parsedData);
  this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})
 }
 handlePrevclick=async ()=>{
  console.log("Prev");
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ecf58ea7c64f4df2b6045d0890f822c6&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
  let data=await fetch(url);
  let parsedData=await data.json()
  console.log(parsedData);
  this.setState({articles:parsedData.articles})
  this.setState({
    page: this.state.page-1,
    articles:parsedData.articles,
 
 })
 }
 handleNextclick=async ()=>{
  
  console.log("Next");
  if(this.state.page +1 >Math.ceil(this.state.totalResults/this.props.pagesize)){

  }
   else{
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ecf58ea7c64f4df2b6045d0890f822c6&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
  let data=await fetch(url);
  let parsedData=await data.json()
  console.log(parsedData);
  this.setState({articles:parsedData.articles})
  this.setState({
    page:this.state.page +1,
    articles:parsedData.articles,

  })
}
 }
 fetchMoreData = async () => {
 
  this.setState({page:this.state.page+1})
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ecf58ea7c64f4df2b6045d0890f822c6&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
  this.setState({loading:true})
  let data=await fetch(url);
  let parsedData=await data.json()
  console.log(parsedData);
  this.setState({articles:parsedData.articles})
  this.setState({
    page: this.state.page-1,
    articles:this.state.articles.concat(parsedData.articles),
    totalResults:parsedData.totalResults,
  })

};
 render() {
    return (
        <>
        <h1 className="text-center" style={{margin:'60px 0px'}}>Popular Daily News-Top Headlines</h1>
       
         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<h4>Loading.....</h4>}
        >
          <div className="container my-3">
          <div className="row">
          {this.state.articles.map((element)=>{
           return <div className="col-md-4" key={element.url}>  
            <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
            </div>
           
          })}
       
       </div>
       </div>
       </InfiniteScroll>

       {/* <div className="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1} type="button" className="btn btn-success"onClick={this.handlePrevclick}>Previous</button>
       <button disabled={this.state.page +1 >Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-success"onClick={this.handleNextclick}>Next Page</button>
       </div> */}
       
       </>
     
    )
        } 
       
  }


export default News