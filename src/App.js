import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Container, Row, Col, CardBody, Label} from 'reactstrap';
import data from './data.json';

class App extends Component {

  componentDidMount(){
    console.log(data)
  }

  renderPosts = () => {
    return data.posts.map((post, i)=> {
      let dateArray = post.date.split(",");
      let dateArray2 = dateArray[1].split(" ");
      console.log(data["quote-source"])
      return (
        <div class="data">
          <div class="date">
            <div class="date2">
              {dateArray2[2]}<br />
              {dateArray2[1]} th
                      </div>
            {dateArray[0]}
          </div>

          {post.type == "quote" ?
            <div class="quote">
              <div class="quoteText"><span class="short">{post["quote-text"]}</span></div>
                <div class="link">&mdash; {post["quote-source"]} &nbsp;</div>
              </div>
          : 

          post.type == "photo" ? 

          <div class="photo">
            <img src={post["photo-url-400"]} alt={post["photo-caption"]}/>
            <div class="link">{post["photo-caption"]}</div>
          </div>
          :

          post.type == "link" ? 

          <div class="linkPost">
            <a class="linkText" href={post["url"]}>{post["link-text"]}</a>
            <div class="linkDesc">{post["link-description"]}</div>
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
          <div class="quote">
            <div class="link">&mdash; Wisdom of&nbsp;<a href="">Confucius</a></div>
          </div>
          }


        </div>)
      
    })
  }

  render() {
    return (
      <div className="App-header">
        <div class="row">
          <h1 className="Logo">{data.tumblelog.title}</h1>
        </div>
          {this.renderPosts()}
        
        {/* <Col style={{display:"flex", justifyContent:'center', alignItems:"center", width:"50%"}}>
            <Row>
              <Col sm="2">
              <Label>{data.posts[0].date}</Label>

              </Col>
              <Col sm="2">
              <Label>{data.posts[0].date}</Label>
              </Col>
            </Row>
        </Col> */}
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;