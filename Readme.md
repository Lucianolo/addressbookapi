<h1> README </h1>

<p> Node.js RESTful API for users/addresses management. </p>


<h1> Endponts </h1>

<hr>

<h2> USERS </h2>

<h3> Actions: </h3>

<h4>	POST - "/users/register"</h4>

<h3> Headers: </h3>

<h4> Content-Type : Application/json </h4>

<h3> Body: </h3>
<h4>
	{  <br/>
		email: String,  <br/>
		password: String <br/> 
	}  <br/>
</h4>
------------------

>POST - "/users/authenticate"

### Headers: ###

>Content-Type: Application/json

### Body: ###
>{  
>>	email: String,  
>>	password: String  
>}  


------------------

## ADDRESSES ##

### Actions: ###

>POST - "/addresses/add"

### Headers: ###

>Content-Type : Application/json,  
>Authorization: JWT token  

### Body: ###
>{  
>>	user_id: String,  
>>	payload : {  
>>>		first_name: String,  
>>>		last_name: String,  
>>>		address: String  
>>	}  
>}  

