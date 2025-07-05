alert("Hey welcome to Chess Game!"); // checking 

// Basic socket.io setup
const socket = io();
/* 
this is for socket.io functionality on frontend
When you open website on browser, this line runs on both ends (users)
and a request is initiated from the device to backend (io.on("connection"))
*/

// when sending somthing from frontend (browser)
msg = "This is an emit message";
socket.emit(msg);

socket.on("Msg recieved for all 📨", function () {
    console.log("Msg received ✅"); // to browser
})

