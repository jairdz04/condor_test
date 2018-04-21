<h1>Documentation </h1>
<p> Please, clone this repository using: git clone: https://github.com/jairdz04/condor_test</pr>

<h2>Backend</h2> 
<h3> Run project </h3>
<ol>
  <li>cd backend</li>
  <li>Copy the .env file that was provided (in the root)</li>
  <li>Open a new terminal in this directory</li>
  <li>Excecute: npm install</li>
  <li>Excecute: node server.js</li>
</ol>

<h3> Routes </h3>
<p> <strong>SERVER: </strong> localhost:3000 </p>
<ul>
  <li>GET: {{server}}/provider </li>
  <li>GET BY ID: {{server}}/provider/{id_provider} </li>
  <li>POST: {{server}}/provider/add</li>
  <li>PUT: {{server}}/provider/edit/{id_provider}</li>
  <li>DELETE: {{server}}/provider/delete/{id_provider} </li>
</ul>


<h3>Unit test</h3>
<p> Please open a new terminal in the main root backend directory</p>
<ul>
  <li>File: test.js</li>
  <li>Excecute: npm test</li>
</ul>


<h2>Frontend</h2>
<h3> Run project </h3>
<ol>
  <li>cd frontend</li>
  <li>Open a new terminal in this directory</li>
  <li>Excecute: npm install angular-cli -g</li>
  <li>Excecute: npm install</li>
  <li>Excecute: npm start</li>
  <li>Visit your browser on localhost:(4200 || in console will appear the port number) </li>
</ol>

<h2>Database</h2>
<p> <strong>NOTE: </strong> Scripts and queries were created using mysql </p>
<p> cd database </p>
<h3>Create database and tables</h3>
 <p> Copy and excecute the script that is in: script.sql</p>
<h3> Run queries</h3>
 <p> Copy and excecute the queries that are in: queries.sql</p>
 
 


