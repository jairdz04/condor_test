const expect  = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
let should = chai.should();
const server = require('./server');
chai.use(chaiHttp);

describe ('Proving get', ()=> {
    it('get providers', ()=>{
        chai.request(server)
        .get('/provider')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});

describe ('Proving get by id', ()=>{
    it('get by id provider', ()=>{
        const id_provider = "";
        chai.request(server)
        .get('/provider/' + id_provider)
        .end((err, res) => {
            res.should.have.status(200 || 404);
            done();
        });
    });
});


describe ('Proving post', ()=> {
    it('post provider',()=> {
        const provider = {
            firstName: "Jair",
            lastName: "Diaz",
            middleName: "Armando",
            email: "jairdz04@gmail.com",
            employerId: 441,
            providerType: "MD",
            staffStatus: "TEACHING",
            assignedTo: "90086",
            status: "TEST",
            createdBy: 33108,
            updatedBy: 72482,
            projectedStartDate: "2017-12-26T22:32:20.905Z"
        }

        chai.request(server)
        .post('/provider/add')
        .send(provider)
        .end((err, res) =>{
            if (err) done(err);
            res.should.have.status(201);
            done();
        });
    });
});

describe ('Proving put', () =>{
    it('put provider', ()=>{
        const id = "5a42cdf4c579db2498d81560";
        const provider = {
            firstName: "Jair",
            lastName: "Diaz",
            middleName: "Armando",
            email: "jairdz04@gmail.com",
            employerId: 441,
            providerType: "MD",
            staffStatus: "TEACHING",
            assignedTo: "90086",
            status: "TEST",
            createdBy: 33108,
            updatedBy: 72482,
            projectedStartDate: "2017-12-26T22:32:20.905Z"
        }
        chai.request(server)
        .put('/provider/edit/' + id)
        .send(provider)
        .end((err, res) => {
            res.should.have.status(200 || 404);
            done();
        });
    });
});

describe ('proving delete', ()=> {
    it('Delete provider', ()=>{
        const id = "5a42cdf4c579db2498d81560";
        chai.request(server)
        .get('/provider/delete/' + id)
        .end((err, res) => {
            res.should.have.status(200 || 404);
            done();
        });
    });
});


