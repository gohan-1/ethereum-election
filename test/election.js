var Elections = artifacts.require("Election");

contract(Elections,function(accounts){

    it("intialize with two candidate ",function(){
        return Elections.deployed().then(function (instance ){
            return instance.candidatesCount();
        }).then((count)=>{
            assert.equal(count,2);
    })
});


it("intialize with correct values candidate 2",function(){
    return Elections.deployed().then(function (instance ){
        return instance.candidates(1);
    }).then((candidate)=>{
        assert.equal(candidate[0],1,"correct id");
        assert.equal(candidate[1],"candidate 1","correct name");
        assert.equal(candidate[2],0,"number of votes");
})
});

it("intialize with correct values candidate 2",function(){
    return Elections.deployed().then(function (instance ){
        return instance.candidates(2);
    }).then((candidate)=>{
        assert.equal(candidate[0],2,"correct id");
        assert.equal(candidate[1],"candidate 2","correct name");
        assert.equal(candidate[2],0,"number of votes");
})
});
    })