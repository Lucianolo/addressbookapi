
const supertest = require("supertest");
const should = require("should");
const server = supertest.agent("http://localhost:3000"); 

// Check for invalid routes
describe('Invalid endpoint', () => {
	it("should return 404",(done)=>{
    	server
    	.get("/random")
    	.expect(404)
    	.end(function(err,res){
      		res.status.should.equal(404);
      		done();
    	});
  	});
})

// User Registration
describe('user/register API endpoint', () => {
	it("should add a user if data is valid",(done) => {
		const rand = Math.random();
		server
    	.post('/users/register')
    	.send({email : "test"+rand+"@test.it", password : "12345678"})
    	.expect("Content-type",/json/)
    	.expect(201)
    	.end((err,res) => {
    	  res.status.should.equal(201);
    	  res.error.should.equal(false);
    	  res.body.msg.should.equal("You have successfully registered!");
    	  done();
    	});
	});
	it("should not add a user if data is invalid",(done) => {
		server
    	.post('/users/register')
    	.send({email : "", password : "12345678"})
    	.expect("Content-type",/json/)
    	.expect(403)
    	.end((err,res) => {
    	  res.status.should.equal(403);
    	  res.body.success.should.equal(false);
    	  res.body.msg.should.equal("Invalid data");
    	  done();
    	});
	});
})

// User Authentication
describe('user/authenticate API endpoint', () => {
	it("should login a user if credentials are valid",(done) => {
		server
    	.post('/users/authenticate')
    	.send({email : "test@test.it", password : "123456"})
    	.expect("Content-type",/json/)
    	.expect(200)
    	.end((err,res) => {
    	  res.status.should.equal(200);
    	  res.error.should.equal(false);

    	  res.body.success.should.equal(true);
    	  res.body.user.email.should.equal("test@test.it");
    	  res.body.token.should.startWith("JWT ");
    	  done();
    	});

	});
	it("should not login a user if data is invalid",(done) => {
		server
    	.post('/users/authenticate')
    	.send({email : "", password : "12345678"})
    	.expect("Content-type",/json/)
    	.expect(403)
    	.end((err,res) => {
    	  res.status.should.equal(403);
    	  res.body.success.should.equal(false);
    	  res.body.msg.should.equal("Invalid data");
    	  done();
    	});
	});
	it("should not login a user with wrong credentials",(done) => {
		server
    	.post('/users/authenticate')
    	.send({email : "test@test.it", password : "12345678"})
    	.expect("Content-type",/json/)
    	.expect(401)
    	.end((err,res) => {
    	  res.status.should.equal(401);
    	  res.body.success.should.equal(false);
    	  res.body.msg.should.equal("Wrong Password");
    	  done();
    	});
	});
})

// Add a record to AddressBook
describe('/addresses/add API endpoint', () => {
	
	it("should add an address if token and data are valid",(done) => {
		let token = "";
		let user_id = "";
		server
    	.post('/users/authenticate')
    	.send({email : "test@test.it", password : "123456"})
    	.expect("Content-type",/json/)
    	.expect(200)
    	.end((err,res) => {

    	  	res.status.should.equal(200);
    	  	res.error.should.equal(false);
    	  	res.body.success.should.equal(true);
    	  	res.body.user.email.should.equal("test@test.it");
    		token = res.body.token;
    	  	user_id  = res.body.user._id;
    	  	server.post('/addresses/add')
    		.set('Authorization', token)
    		.send({	user_id: user_id, 
    				payload: {
    					first_name: "Marco", 
    					last_name: "Gennarini", 
    					address: "Via dei monti"
    				}
    			})
    		.expect("Content-type",/json/)
    		.expect(201)
    		.end((err,res) => {
    			res.status.should.equal(201);
    	  		res.error.should.equal(false);
    	  		res.body.success.should.equal(true);
    	  		done();
    		});
    	})
    	
    });

	it("should not add an address if token in not valid",(done) => {
		let token = "";
		let user_id = "";
		server
    	.post('/users/authenticate')
    	.send({email : "test@test.it", password : "123456"})
    	.expect("Content-type",/json/)
    	.expect(200)
    	.end((err,res) => {
    	  	res.status.should.equal(200);
    	  	res.error.should.equal(false);
    	  	res.body.success.should.equal(true);
    	  	res.body.user.email.should.equal("test@test.it");
    		token = res.body.token + "jpmYW";
    	  	user_id  = res.body.user._id;
    	  	server.post('/addresses/add')
    		.set('Authorization', token)
    		.send({	user_id: user_id, 
    				payload: {
    					first_name: "Marco", 
    					last_name: "Gennarini", 
    					address: "Via dei monti"
    				}
    			})
    		.expect("Content-type",/json/)
    		.expect(401)
    		.end((err,res) => {
    			res.status.should.equal(401);
    	  		res.text.should.equal("Unauthorized");
    	  		done();
    		});
    	})
	});
})


 