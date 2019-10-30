config.js
	- Open and check Server Setup
	- Switch to Heroku for upload to Heroku App Pages
	- Switch to local for all other uploads, testing, etc.

TESTING:
index.js (1 Testing Change)
	- Switch Get query to Testing 
recipes.js (1 Testing Change)
	- Switch Get query to Testing
addItem.js (2 Testing Changes)
	- Switch Insert Into query
	- Switch Upload Path


RUN:
open console
navigate to Users/../source/repos/cookEATrepeat_Node
npm start
*Ensure MySQL is running (Xampp)
**Xampp may be located in C:\xampp run xampp-config
***SQL SERVER blocks some ports, need to open SSMS and force stop.

HEROKU:
https://dashboard.heroku.com/apps/cookeatrepeat
- Addons allow for further configuration (click on Addon in Dashboard)
