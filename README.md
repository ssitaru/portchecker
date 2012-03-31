portchecker - a simple portchecking webapp
==========================================

portchecker enables you to simply check your server's vitals based on simple PHP backend and a HTML/JS frontend

a (hopefully) live example is available at http://www.sitaru.eu/heartbeat

installation
-----------
should be straightforward:
* clone the repo/download
* move to your webroot/status or similar
* in the root folder of portchecker:

		touch .lastrequest
* then edit js/main.js to point to your check.php relative to your webroot (the '/heartbeat/check.php' part)
* adjust the services at the top of js/main.js (syntax is JSON)

frontend
--------
the frontend is a simple HTML page, some css and some jQuery JS code which sends out AJAX requests to the backend.

backend
-------
check.php is the main backend. it does the following:
* check if .lastrequest timestamp is minimum 
