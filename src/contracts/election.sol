pragma solidity >=0.4.21 <0.7.0;

contract Election{
    //constrctor
    struct Candidate {
        uint id ;
        string name ;
        uint vote;
    }
    event votedEvent(uint _candidateId);
    mapping(address=>bool) public voters;
    mapping(uint=>Candidate) public candidates;
    uint public candidatesCount;

    constructor() public{
        addCandidate("candidate 1");
        addCandidate("candidate 2");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++; 
      
        candidates[candidatesCount] = Candidate(candidatesCount,_name,0); 
    }

    function vote (uint _candidateId ) public{
        require(!voters[msg.sender]);
        require(_candidateId >0 && _candidateId <= candidatesCount);
        voters[msg.sender]=true;
        candidates[_candidateId].vote++;

        emit votedEvent(_candidateId);
        
    }
}