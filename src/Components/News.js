import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem';
import './Calculator.css';



export default class News extends Component {
  
 
   articles = [];


    constructor(){
      super();
      this.state = {
          articles : this.articles,
          loading:false
      }
    }
    

    async componentDidMount(){
      let url = "https://newsapi.org/v2/everything?q=fitness+science+gym+exercise&language=en&sortBy=relevancy&apiKey=86b0d3c55e7c48488df967d2d3a8b9b6";
      
      let data = await fetch(url);
      let parsed_data= await data.json();
     // console.log(data);
      console.log(parsed_data);
      this.setState({articles: parsed_data.articles});

    }

  render() {
    
    return (
      <div>
      <div className="container my-3 ">
         
         <div className="row">
         {this.state.articles && this.state.articles.length > 0 ? (
          this.state.articles
          .filter((element) => element.urlToImage!==null)
          .map((element) => {
               return (
               <div className="col-md-4" key={element.url}>
               <NewsItem title={element.title} description={element.description.slice(0,88)} imageurl={element.urlToImage} newsurl={element.url}/>
               </div>
               );
            })
         ) : (
           <p>No articles found</p>
         )}
         </div>
      </div>
      </div>
    )
  }
}
