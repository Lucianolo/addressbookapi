# README #

Node.js RESTful API for users/addresses management.


# Endponts #

===============

# USERS #

------------------

## REQUEST ##

--------------

### Action: ###

>POST - "/users/register"

### Headers: ###

>Content-Type : Application/json

### Body: ###
		{  
			email: String,  
			password: String  
		}  

------------------

## RESPONSE ##

>Status : 201 -> Success / 500 -> Internal Server Error   / 403 -> Invalid Data  
>User : If status == 201, contains the created entity    
>Error : If status == 500, contains the error message    

-------------- 

### Action: ###

>POST - "/users/authenticate"

### Headers: ###

>Content-Type: Application/json

### Body: ###
		{  
			email: String,  
			password: String  
		}  


------------------

## RESPONSE ##

>Status : 200 -> Success / 500 -> Internal Server Error  / 403 -> Invalid Data  / 401 -> Wrong Password
>User : If status == 200, contains the created entity    
>Token : If status == 200, contains user's JWT Token 
>Error : If status == 500, contains the error message  



------------------

## ADDRESSES ##

------------------

### Action: ###

>POST - "/addresses/add"

### Headers: ###

>Content-Type : Application/json   
>Authorization: JWT token  

### Body: ###
		{  
			user_id: String,  
			payload : {  
				first_name: String,  
				last_name: String,  
				address: String  
			}  
		}  

------------------

## RESPONSE ##

>Status : 201 -> Success / 500 -> Internal Server Error  / 401 -> Unauthorized
>Address: if status == 201, contains the created address record  


------------------

# USAGE # 

1.	Register a user making a POST request to '/users/register'
2.	Authenticate the user making a POST request to '/users/authenticate'
3.	Use the obtained JWT Token as 'Authorization' header for POST request to '/addresses/add'
3.  Use a user's id in the post request's body to save the record in the user's collection
4.	Enjoy your Address Book!


