import React, { Component } from 'react';
import logo from './logo.svg';
// import {Container, Row, Col, CardBody, Label, Modal, ModalBody} from 'reactstrap';
import { Modal, Button } from 'react-bootstrap';
import './App.css';
import data from './data.json';
var parse = require('html-react-parser');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPost: null,
      showModal: true,
    };
  }

  componentDidMount(){
    console.log(data)
  }

  renderOnePost = (post, index) => {
    let dateArray = post.date.split(",");
    let dateArray2 = dateArray[1].split(" ");
    let dateGmtArray = [];
    let preDateGmtArray = [];
    if(index > 0){
      dateGmtArray = post["date-gmt"].split(" ")
      preDateGmtArray = data.posts[index-1]["date-gmt"].split(" ")
      console.log(dateGmtArray[0], preDateGmtArray[0])
    }

    console.log(data["quote-source"])
    return (
      <div class="data" onClick={()=>window.open(post.url)}>
        {dateGmtArray.length > 0 && preDateGmtArray.length > 0 && dateGmtArray[0] == preDateGmtArray[0] ? null : 
        <div class="date">
        <div class="date2">
          {dateArray2[2]}<br />
          {dateArray2[1]} th
                  </div>
        {dateArray[0]}
      </div>}
        

        {post.type == "quote" ?
          <div class="quote">
            <div class="quoteText"><span class="short">{post["quote-text"]}</span></div>
              <div class="link">&mdash; {parse(post["quote-source"])} &nbsp;</div>
            </div>
        : 

        post.type == "photo" ? 

        <div>
          <img src={post["photo-url-400"]} alt={post["photo-caption"]}/>
          <div class="link">{parse(post["photo-caption"])}</div>
        </div>
        :

        post.type == "link" ? 

        <div class="linkPost">
          <a class="linkText" href={post["url"]}>{post["link-text"]}</a>
          <div class="linkDesc">{parse(post["link-description"])}</div>
        </div>
        :

        post.type == "conversation" ? 

        <div class="conversation">
          {post.conversation.map((con,ind)=>{
            if(ind % 2 == 0){
              return <div class="conText1">
              <a class="conName1">{con.name}: </a>
              <a class="conPhrase">{con.phrase}</a>
              </div>
            } else {
              return <div class="conText2">
              <a class="conName2">{con.name}: </a>
              <a class="conPhrase">{con.phrase}</a>
              </div>
            }
          })}
        </div>
        :
        post.type == "audio" ? 

        <div>
          <a class="audioArtist">{post["id3-artist"]}</a>
          <a  class="audioTitle">&mdash; {post["id3-title"]} &nbsp;</a>
        </div>

        :

        post.type == "regular" ? 

        <div>
          <a class="regularTitle">{post["regular-title"]}</a>
          <p class="regularBody">{parse(post["regular-body"])}</p>
        </div>
        :
        null
        }

        {index == 0 ? 
        <div class="description">
                <p>{data.tumblelog.description}</p>

      </div>
        : null }
        
      


      </div>)
  }

  renderPosts = () => {
    return data.posts.map((post, i)=> {
      return this.renderOnePost(post, i)
    })
  }

  render() {
    return (
      <div className="App-header">
        
        <div class="row">
          <h1 className="Logo">{data.tumblelog.title}</h1>
          <a class="count"> Count of Posts: {data.posts.length}</a>
        </div>
          {this.renderPosts()}
      </div>
    );
  }
}

export default App;