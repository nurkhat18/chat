/*
  Name: Nurkhat Jumabaev
  Course Name: CSc337
  Description: this is client side code for chatty project.
  this takes a data from the user and 
  does get and post request to save the data into Database.
*/


/*
  this function takes a user input 
  and posts the data to the server
*/
function createMessage(){
  //getting user input
  const name = document.getElementById('alias').value;
  const message = document.getElementById('message').value;
  console.log(message);

  const url = "http://127.0.0.1:3000/post";

  // posting the data to the server
  fetch(url, 
    {method : "POST",
    headers : {'Content-Type' : "application/json"},
    body: JSON.stringify({alias: name, message : message})
    }
    )
}

/*
  this function displays all the messages to the website.
  to do this it takes data from the server and formats it.
*/
function displayMessage(){
  console.log('checking');
  const url = "http://127.0.0.1:3000/display";
  
  fetch(url)

 .then((response) => {
  // getting the data
 	return response.json();
 })

 .then(data =>{
  // putting the data into html file
	const chatWindow = document.getElementById('chat-window');
  let messages = '<br><br>'
  for (i in data){
    messages += "<strong>" + data[i].alias + "</strong>" + ": " + data[i].messages + '<br><br>';
  }
  chatWindow.innerHTML = messages;
})
 
 .catch( (error) => {
 	console.log('THERE WAS A PROBLEM');
 	console.log(error);})
}

// updating chat window every second.
setInterval(displayMessage, 1000);

