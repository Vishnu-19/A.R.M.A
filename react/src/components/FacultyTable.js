import React from 'react';
import '../css/table.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

class FacultyTable extends React.Component{
  /*approval = (id) =>{
    this.setState({data: this.state.data.map(temp => {
      if(temp.id===id){
        temp.approved = !temp.approved
        if(temp.approved) temp.status = 'Approved';
        else temp.status = 'pending';
      }
      return temp;
    }) });
  }*/
  state = {
    persons: []
  }

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    let userName = user.userName;
    let accessToken = user.accessToken;
    console.log(accessToken)
    let config = {
    headers: {
      'Authorization': 'Bearer ' + accessToken
      }
    }
    axios.get("http://localhost:8080/facultydashboard",config)
      .then(res => {
        const persons = res.data;
         this.setState({ persons });
        console.log(persons);
      }).catch((err) => {
        console.log(err);
      })
  }

  render() {
    var i=1;
    const items=this.state.persons.map(item =>{return(

       <tr>
          <td style={{color: "#b007c4"}}>{i++}</td>
          <td>{item.forum_name}</td>
          <td>{item.subject}</td>
          <td>{item.status}</td>
          {/* <Link
  to={{
    pathname: "/Remarks",
   
    props: { data: item }
  }}
></Link> */} <td>Click here!</td>
      </tr>

             )
    })
    return (
      <div class="containerz">
        <div class="container">
          <div class="table-responsive">
           <table class="table">
           <thead>
           <tr>
           <th scope="col">#</th>
           <th scope="col">forum/faculty</th>
           <th scope="col">Subject</th>
           <th scope="col">Status</th>
           <th scope="col">Approve</th>
           </tr>
           </thead>
           <tbody>
           {items}
           </tbody>
           </table>
          </div>
          
        </div>
        
      </div>
    )
  }

}

export default  FacultyTable;
