import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import {Container,Row,Col} from 'react-bootstrap';
import Nav from './Navi';
import axios from 'axios';
import '../css/Remarks.css';
const Remarks =(props) => {

  const history = useHistory();
  const [From, setFrom] = useState( 'Coding Studio')
  const [Req_data, setReq_data] = useState({})
  const [Participants, setPeople] = useState([])
  const [Subject, setSubject] = useState("")
  const [Status, setStatus] = useState("")
  const [Description, setDescription] = useState("")
  const [Facility, setFacility] = useState([{facility:'Faci1',check:true},{facility:'Faci2',check:true},{facility:'Faci3',check:true},{facility:'Faci4',check:true},{facility:'Faci5',check:true}])
  const [Text, setText] = useState("Hrlrgdghisku")
  const [PartTable,setTable] =useState(true)
  const [TB_Facil,setTB]=useState(true)
  const [TB_Part,setTB1]=useState(true)

  //getting data from database
  useEffect(()=>{

    let user = JSON.parse(localStorage.getItem("user"));
    let userName = user.userName;
    let accessToken = user.accessToken;
    let config = {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
    params: {
    "request_id" : JSON.parse(localStorage.getItem("req_id"))
    }
    }
    console.log(config)

    //fetch data from server
    axios.get("http://localhost:8080/getrequest",config)
      .then(res => {
        var data = res.data[0];
        setFrom(data.forum_name);
        setSubject(data.request_data.subject);
        setReq_data(data.request_data);
        setDescription(data.request_data.description);
        setPeople(data.request_data.participants);
        setFacility(data.request_data.facilities);
        setStatus(data.status);
        console.log(data);
      }).catch((err) => {
        console.log(err);
      })
  },[]);
const handleInput=(e)=>{
  console.log(e.target.value)
 setText(e.target.value)
}
const chgTable=()=>{
  setTable(false);
}
const chTable=()=>{
  setTable(true);
}

//add remarks
const addRemark=(selected_participants,selected_facilities)=>{
    console.log(selected_participants);
    Req_data.selected_participants=selected_participants;
    Req_data.selected_facilities=selected_facilities;
    console.log(Text);
    let user = JSON.parse(localStorage.getItem("user"));
    let accessToken = user.accessToken;
    let config = {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
    }
    console.log(config)

    //send data to server
    axios.put("http://localhost:8080/createrequest",{
      forum_name:From,
      request_id:JSON.parse(localStorage.getItem("req_id")),
      request_data:Req_data,
      remarks:Text,
      status:'REQUESTED CHANGES'},config)
      .then(res => {
        history.push("/dashboard");
      }).catch((err) => {
        console.log(err);
      })
 }
 const Selected=()=>{
  const selected_participants=Participants.filter(data => data.check===true);
  const selected_facilities=Facility.filter(data => data.check===true);
  console.log(selected_participants)
  addRemark(selected_participants,selected_facilities);
 }
 const Rejected=()=>{
  const  payload= { remark:Text.text,
    status:'Rejected'
  }
setText({
text:''
})
axios({
  url:'http://localhost:8080/Remarks',
  method:'POST',
  data:payload
})
  .then(() => {
    console.log('Data has been sent')
  })
  .catch(() =>
  {
    console.log("Error sending data")
  });
 }
 const notAllT= ()=>{
  var t1=true; 
  Participants.map(item=>{
  if(item.check===false)
    t1=false;
} )
setTB1(t1);
}
 const notAll= ()=>{
  var t=true; 
  Facility.map(item=>{
  if(item.check===false)
    t=false;
} )
setTB(t);
}
 const Approve=(temp)=>{
   let user = JSON.parse(localStorage.getItem("user"));
   let accessToken = user.accessToken;
   let config = {
   headers: {
     'Authorization': 'Bearer ' + accessToken
   }
   }

   //send data to server
   axios.post("http://localhost:8080/approverequest",{
     request_id:JSON.parse(localStorage.getItem("req_id")),
     status:temp},config)
     .then(res => {
       history.push("/dashboard");
     }).catch((err) => {
       console.log(err);
     })
 }

  var count=1;
  var f_count=1;
  const list= Participants.map(item=> {
  return(
  <tr>
    <td>{count++}</td>
    <td>{item.name}</td>
    <td>{item.roll}</td>
    <td><span className="TB"><label class="switch"><input className="in" onChange={event =>{

        let checked=event.target.checked;

        setPeople(
          Participants.map(data=>{
            if(item.roll===data.roll){
              data.check=checked;
            }
            return data;
          })
        )
        notAllT();
      }}type="checkbox" id="Approve" name="App" checked={item.check} ></input><span class="slider round"></span></label></span></td>
    {/* <td><input type="checkbox" id={Id1} name={Name}  ></input></td> */}
    </tr>
    )});

  const list1= Facility.map(item=> {
  return(
      <tr>
        <td>{f_count++}</td>
        <td>{item.facility}</td>

        <td><span className="TB"><label class="switch"><input className="in" onChange={event =>{

            let checked=event.target.checked;
             
            setFacility(
              Facility.map(data=>{
                if(item.facility===data.facility){
                  data.check=checked;
                }
                return data;
                
                
              })
            )
            notAll();
            }}type="checkbox" id="Approve" name="App" checked={item.check} ></input><span class="slider round"></span></label></span></td>
        {/* <td><input type="checkbox" id={Id1} name={Name}  ></input></td> */}
        </tr>
        )});
        
return(
      <div>
      <Nav/>
      <div Classname="Con">
      <Container>
        <center><h1 className="title">Letter Info</h1></center>
  <Row>
    <Col>
    <Row><h3 className="content"><span>From : </span>{From}</h3></Row>
    <Row><h3 className="content"><span>Subject : </span>{Subject}</h3></Row>
    <Row><h5 className="content"><span>Description : </span>{Description}</h5></Row>
    <label>Remarks : </label>
    <Row><textarea value={Text.text} onChange={handleInput} cols={80} rows={6} placeholder="Enter your Remarks here..."/></Row>
    <Button className='Rebtn' variant="primary" onClick={Selected} style={{"marginBottom":"50px"}}>Request changes</Button>

   </Col>

    <Col>
    <Row><Col><i class="fas fa-chevron-circle-left" style={{"cursor":"pointer","color":"grey"}} onClick={chTable}></i></Col>
    <Col style={{"padding":"0px"}}><center>{PartTable?<h4 className="tab">Participants</h4>:<h4 className="tab">Facilities</h4>}</center></Col>
    <Col>
    <i class="fas fa-chevron-circle-right" style={{"cursor":"pointer","color":"grey"}} onClick={chgTable}></i></Col></Row><div className="Table">

    <Row >{ PartTable ?(
    <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Roll No</th>
      <th>Approve<span className="TB"><label class="switch"><input className="in" onChange={event =>{

      let checked=event.target.checked;
      setPeople(
        Participants.map(data=>{

            data.check=checked;

          return data;
        })
      )
setTB1(checked);
    }} type="checkbox" checked={TB_Part} id='Approve' name='App'  ></input><span class="slider round"></span></label></span></th>
    </tr>
  </thead>  <tbody>
    {list}</tbody></Table>) :(<Table striped bordered hover variant="dark">
  <thead>
    
    <tr>
      <th>#</th>
      <th>Facilities</th>
      <th>Approve<span className="TB"><label class="switch"><input className="in" onChange={event =>{

      let checked=event.target.checked;
      setFacility(
        Facility.map(data=>{

            data.check=checked;

          return data;
        })
      )
        setTB(checked)
    }} type="checkbox" checked={TB_Facil} id='Approve' name='App'  ></input><span class="slider round"></span></label></span></th>
    </tr>
  </thead>  <tbody>
    {list1}</tbody></Table>) }
    </Row></div>
    <div className="Buttons">
    <Row>
      <Col><Button variant="success" siz="lg" onClick={() => {
        Approve("APPROVED")
      }}>Approve</Button></Col>
      <Col><Button variant="danger" onClick={() => {
        Approve("REJECTED")
      }}>Reject</Button></Col>
    </Row>
    </div>
    </Col>



  </Row>
</Container></div>
</div>
    )}

export default Remarks;
