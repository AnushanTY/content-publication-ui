import React, { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AuthService from "../services/AuthService";
import ContentService from "../services/ContentService"

class MyAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      content: [],
    };
  }

  componentDidMount() {
    this.reloadUserList();
  }

  reloadUserList() {
    ContentService.getContentByUserId()
      .then((res) => {
        this.setState({ content: res.data.object })
      });
  }

  publishContent(id){
     ContentService
     .publishContent(id,"true")
     .then((res) => {
         if(res){
            window.location.reload(false);
         }
     });
  }

  uppublishContent(id){
    ContentService
    .publishContent(id,"false")
    .then((res) => {
        if(res){
           window.location.reload(false);
        }
    });
}

  deleteContent(id){
    ContentService
    .deleteContent(id)
    .then((res) => {
        if(res){
           window.location.reload(false);
        }
    });
  }


  render() {
    const { currentUser } = this.state;
    const { content } = this.state;

    return (
      <div class="container-fluid">

          <Link to="/dashboard/uploadcontent">
            <button type="button" class="btn btn-outline-dark float-right">Upload Content</button>
          </Link>


        <br />
        <br />
        <div class="row">
          {content.map(con =>


            <div class="col-sm-6">
              <div class="card mb-4">
                <div class="card-header">
                  {con.title}
                  <div class="dropdown float-right">
                    <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Action
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {con.isPublished ? (
                            <a class="dropdown-item" onClick={()=>this.uppublishContent(con.id)}>UnPublish</a>
                        ):
                        <a class="dropdown-item" onClick={()=>this.publishContent(con.id)}>Publish</a>}
                      
                      <Link to={`/dashboard/viewcontent/${con.id}`} class="dropdown-item"> View</Link>

                      <Link to={`/dashboard/editcontent/${con.id}`}> <a class="dropdown-item" >Edit</a></Link>
                      <a class="dropdown-item" onClick={()=>this.deleteContent(con.id)}>Delete</a>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <blockquote class="blockquote mb-0">
                    <p>{con.summary}</p>
                    <Link to={`/dashboard/viewcontent/${con.id}`}>
                      <button type="button" class="btn btn-outline-info">View more</button>
                    </Link>

                    <footer class="blockquote-footer"> Published date <cite title=" Content">  {new Date(con.publishedDate).toString()}</cite></footer>
                  </blockquote>
                </div>
              </div>


            </div>)}
        </div>
      </div>
    );
  }
};

export default MyAccount;