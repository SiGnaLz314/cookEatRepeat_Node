# cookEATrepeat
A web app to present my recipes.
A working prototype, proof of concept, test environment, aiding in the creation of a react.js (MERN Stack) application of the same nature.


## Wishlist
- [x] Display static images
- [x] Connect to Database to host recipe data
- [x] Dynamically load recipe data and images
- [ ] Complete CRUD capabilities (Update, Delete)
- [ ] Add Authentication 
- [ ] Plant roses and paint the barn


## RUN LOCAL:
1. After Repository is cloned, dependencies installed, and database is established (local or heroku).
2. Open a terminal window (CMD) and enter:
	```
	$ cd ../project_folder/
	$ npm start
	```
	- *Ensure MySQL is running (Xampp or Workbench)*
	- *Xampp may be located in C:\xampp run xampp-config*
	- *SQL SERVER blocks some ports, need to open SSMS and force stop.*


## TESTING LOCAL:
### index.js 
- 1 Testing Change
	- Switch Get query to Testing 
### recipes.js 
- 1 Testing Change
	- Switch Get query to Testing
### addItem.js 
- 2 Testing Changes
	- Switch Insert Into query
	- Switch Upload Path


### config.js
- Open and check Server Setup:
	```javascript
		module.exports = {
			"mysql": {
				host: 'Change to Your Hostname',
				user: 'Change to Your UserName',
				password: 'Change to Your Password',
				database: 'Change to Your Database'
			}
		}
	```
- Switch to Heroku for upload to Heroku App Pages
- Switch to Local for all other uploads, testing, etc.

## LOCAL Setup:
1. Follow instructions to setup mySQL: 
	- [mySQL WAMP Server](https://www.ionos.com/digitalguide/server/tools/xampp-tutorial-create-your-own-local-test-server/) 
	> **or**
	- [MySQL Workbench](https://dev.mysql.com/doc/workbench/en/)
	*There are other resources available, please use your own if you see fit*
2. Ensure config.js file is switched to local instance.
3. Create Database
	- Follow **DatabaseConnection** Instructions

## HEROKU Setup:
1. Create Heroku Account.
2. Create New App.
	- Name the new application
3. Clone GitHub Repo to directory of your choosing:
	- Open CMD:
		```
		$ cd directory/folder_of_your_choice/
		$ git clone https://github.com/SiGnaLz314/cookEatRepeat_Node.git
		```
4. Initialize and Establish a remote git to Heroku:
	** Before initializing a new git check and remove existing .git folder if present **
	- Open CMD:
		```
		$ cd cookeatrepeat_clone_folder/
		$ git init
		$ heroku git:remote -a cookeatrepeat-node
		```
5. *Optional:* Establish remote git to GitHub repository:
	- Open CMD:
		```
		$ cd cookeatrepeat_clone_folder/
		$ git init
		$ git remote add origin [*your git address]()
		```
6. Verify remote connections:
	- Open CMD:
		```
		$ git remote -v
		# Verify new remote
		origin  <Your GitHub Address> (fetch)
		origin  <Your GitHub Address> (push)
		heroku  <Your Heroku Address> (fetch)
		heroku  <Your Heroku Address> (push)
		```
7. Add configVars from HerokuApp > Settings page to config.js file in root directory of App.
	- *found under **CLEARDB_DATABASE_URL***
8. Handle Dependencies:
	- Open CMD at project root:
		```
		$ npm init
		$ npm install
		```
9. Add ClearDB MySQL Addon to Heroku App on the Dashboard.
10. ClearDB Addon create database:
	- Follow **DatabaseConnection** Instructions
	
11. _** *SECURITY* **_
	- When pushing to *Heroku* and *GitHub*:
	1. Add config.js to .gitignore file so it will not push to GitHub, and Remove it from .gitignore when pushing to Heroku.
	> **or**
	 - When pushing to Heroku ensure configVars are correct when you push, and Jibberish (or Blank) when pushing to GitHub.
	2. Open CMD:
		```
		$ git add .
		$ git commit -m "your message"
		$ git push heroku master
		# ****CHOOSE OPTION FROM STEP 1****
		$ git push -u origin master
		```
12. Open HerokuApp and ensure dyno is up.


	
## Database Connection:	
1. Open MySQL Workbench
2. _**HEROKU**_ Connect to ClearDB
	- On Workbench Homepage Add New Connection
	- Enter Details as copied to config.js
> **or**
2. _**Local**_ Connect to instance by ensuring config.js files match connection details.
*Test Connection*
3. Open the new connection in Workbench (or through xampp admin counsel)
4. Create Tables and Import Data
	- EXECUTE QUERY:
		```
		CREATE TABLE `recipes` (
			`id` int(11) NOT NULL AUTO_INCREMENT,
			`name` varchar(50) NOT NULL,
			`animal` varchar(50) NOT NULL,
			`variables` text,
			`algorithm` text,
			PRIMARY KEY (`id`)
		) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8
		```
> **or**
4. Import .csv file, in ..public/setup/ folder, with starter set of recipes and create table on import.
	- **FOR TESTING: Create an additional table called `recipes_test` with the same query.**
5. Ensure (id) is set to Primary Key and AutoIncrement is enabled on table information.
6. _**HEROKU**_ push to heroku master and open HerkoApp to run.
> **or**
6. _**LOCAL**_ follow **RUN** Instructions above.
	
