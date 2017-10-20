# README #

Node.js RESTful API for users/addresses management.


# Endponts #

------------------

## USERS ##

### Actions: ###

>POST - "/users/registration"

### Headers: ###Headers: 

>Content-Type : Application/json

### Body: ###
>{  
>>	email: String,  
>>	password: String  
>}  

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

