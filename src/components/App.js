import React, { Component } from 'react';
import logo from '../logo.png';
import Web3 from 'web3'
import Election from '../abis/Election.json'
import Tables from './table'
import TextField from '@material-ui/core/TextField';
import './App.css';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.candidateArray = []
    this.handleDropdownChange = this.handleDropdownChange.bind(this);

 
  }
  state={
    account:'',
    candidates:[],
    selectValue:''
  }

  async componentWillMount(){
    await this.loadweb3()
    await this.loadBlockchainData()
  }

  async loadweb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    
          // Request account access if needed
          await window.ethereum.enable();
      
     
  }
  // Legacy dapp browsers...
  else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      // Acccounts always exposed

  }
  // Non-dapp browsers...
  else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
  }
  async loadBlockchainData(){
    let web3= window.web3;

    let accounts= await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({
      account:accounts[0]
      })
      let networkId= await web3.eth.net.getId() 
      console.log("network id"+networkId)
      let networkData=Election.networks[networkId]
      if(networkData){
        console.log(networkId)
        let elections=web3.eth.Contract(Election.abi,networkData.address)
        console.log(elections)
        let candidateCount= await elections.methods.candidatesCount().call()
        // let candidates= await elections.methods.candidates.call()
     

        for(let i=1;i<=candidateCount;i++){
          let candidates= await elections.methods.candidates(i).call()
          let id = candidates[0].toNumber()
          let name= candidates[1]
          let vote = candidates[2].toNumber()
          console.log(vote)
          // this.candidateArray.push({id:id,name:name,vote:vote});
          this.setState(prevState => ({
            candidates: [...prevState.candidates,{id:id,name:name,vote:vote} ]
          }))
        
        }
        // console.log(this.candidateArray)
        // this.setState({candidates:this.candidateArray})
   
        
        
  }
  
  }
  
  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }
  async voteForCandidate(){
    console.log("hiis")
    let web3= window.web3;

    let accounts= await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({
      account:accounts[0]
      })
      const networkId= await web3.eth.net.getId() 
      console.log("network id"+networkId)
      const networkData=Election.networks[networkId]
      if(networkData){
        console.log(networkId)
        const elections=web3.eth.Contract(Election.abi,networkData.address)
        console.log(elections)
    if(this.state.selectValue=="1"){
       
    
          let voted= elections.methods.vote(1).send({from:this.state.account})
          if(voted){
            elections.events.votedEvent({}, function(error, event){ console.log(event); })
            .on('data', function(event){
                console.log(event); // same results as the optional callback above
            })
          }else{
            console.log("error")
          }
    }else{

      let voted= elections.methods.vote(2).send({from:this.state.account})
      if(voted){

        elections.events.votedEvent({}, function(error, event){ console.log(event); })
        .on('data', function(event){
            console.log(event); // same results as the optional callback above
        })
      }else{
        console.log("error")
      }
    }

    
      }
    }
  


  render() {
    return (
      <div>
        <Tables candidates={this.state.candidates}></Tables>
       
        <TextField style={{    minWidth: 700,
    maxWidth:400,
    textAlign: "right",
    align:'center',
    margin: 'auto'}}
  id="first-name"
  label="Owner Acconut"
  value={this.state.account}
 
/>
        {/* <Table rows={this.state.candidates}></Table> */}
        <p>
     
        </p>
        
        <Form style={{    minWidth: 700,
    maxWidth:400,
    textAlign: "right",
    align:'center',
    margin: 'auto'}}
    onSubmit={(event) => {
                  event.preventDefault()
                  this.voteForCandidate()
                 // console.log(content)
                }}>
            <Input type="select" placeholder="candidate" onChange={this.handleDropdownChange} >   
  
            <option  selected>Candidates</option>
            <option value="1">candidate 1</option>
            <option value="2">candidate 2</option>
          
           </Input>   
           <Button type="submit" color="primary">Vote for candidate</Button>  
            </Form>
            
           
       
      </div>
    );
  }
}

export default App;
