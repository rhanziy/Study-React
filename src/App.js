import { render } from '@testing-library/react';
import React, { Component } from 'react';
import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import './App.css';


class App extends Component{
  constructor(props){ 
    // component가있을때 constructor라는 함수가 있으면 제일먼저 실행해 초기화한다. 생성자 개념
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'read',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World wide Web!'},
      welcome:{title:'Welcome', desc:'Hello, React'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for infotmation'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'Javascript is for interactive'}
      ]
    }
  }
  render(){ // props나 state값이 바뀌면 render함수가 다시 호출된다.
    console.log('App render');
    let _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      let i = 0;
      while(i < this.state.contents.length){
        let data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i += 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        // this.state.contents.push( 기존의 contents에 밀어넣는다. 원본을 건듦!
        // { id:this.max_content_id, title:_title, desc:_desc }
        // );
        // var _contents = this.state.contents.concat( // 추가해서 새로운 배열로
        //   { id:this.max_content_id, title:_title, desc:_desc }
        // );
        var newContents = Array.from(this.state.contents);
        newContents.push({
          id:this.max_content_id,
          title:_title,
          desc:_desc
        });
        this.setState({
          contents:newContents
        });
      }.bind(this)}></CreateContent>
    }
    console.log('render', this); 
    return(
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage={function(){
          this.setState({mode:'welcome'});
        }.bind(this)}
        ></Subject>
        <TOC 
        onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id:Number(id)
          });
        }.bind(this)} 
        data={this.state.contents}
        ></TOC>
        <Control onChangeMode={function(_mode){
          this.setState({
            mode:_mode
          })
        }.bind(this)}></Control>
        {_article}
      </div>
    );
  }
}

export default App;
