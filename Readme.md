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

>Status : 200 -> Success / 500 -> Internal Server Error    
>User : If status == 200, contains the created entity    
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

>Status : 200 -> Success / 500 -> Internal Server Error    
>User : If status == 200, contains the created entity    
>Token : If status == 200, contains the JWT Token needed to access user's resources
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

>Status : 200 -> Success / 500 -> Internal Server Error    