import React from 'react';
import '../css/table.css';
import axios from 'axios';

class Table extends React.Component{
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
    axios.get(`http://localhost:8080/dashboard`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
        console.log(persons);
      })
  }

  render() {
    const items=this.state.persons.map(item =>{return(

       <tr>
          <td>{item.forum_id}</td>
          <td>{item.forum_name}</td>
          <td>{item.subject}</td>
          <td>{item.status}</td>
          <td> <a href="#home" >Click here!</a> </td>
          <td><center>
            <input type="checkbox" />
    </center></td>
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
           <th scope="col">Remarks</th>
           <th scope="col"><center>Approve</center></th>
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

export default  Table;