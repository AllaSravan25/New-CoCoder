/* server side web sockets */

const io = require('socket.io')(3000, {
    cors: {
      origin: ['http://localhost:8080', 'http://localhost:8080/expertsNsp']
    }
  });
  
  const expertsNsp = io.of('/expertsNsp');
  const learnersNsp = io.of('/learnersNsp');
  
  
  learnersList = [];
  expertsList = [];
  
  expertsNsp.on('connection', (socket) => {
    userId = socket.id;
    console.log(`user id was; ${userId}`)
  
    socket.on('userType', (type) => {
      if (type === 'learner') {
        const id = socket.id
        learnersList.push(id);
        console.log(`socket id to learners list ${id}`)
      } else if (type === 'expert') {
        const id = socket.id
        expertsList.push(id);
        console.log(`socket id to experts list ${id}`)
      }
  
      if (type === "learner" && expertsList.length > 0 ){
        const room = expertsList[0]+"lasvegas"
        socket.join(room)
        socket.on('send-message', message => {
          socket.to(room).emit('recieve-message',(message))
        })
        learnersList = learnersList.filter(id => id !== socket.id);
        expertsList.splice(0,1)
      }
      else if(type === "learner" && expertsList.length === 0){
        const room = socket.id+"lasvegas"
        socket.join(room) 
        socket.on('send-message', message => {
          console.log("Message sent by learner: ", message);
          socket.to(room).emit('recieve-message', message);
        })
      }
      else if(type === "expert" && learnersList.length > 0){
        const room = learnersList[0]+"lasvegas"
        socket.join(room);
        socket.on('send-message', message => {
          socket.to(room).emit('recieve-message',message)
        });
        expertsList = expertsList.filter(id => id !== socket.id);
        learnersList.splice(0,1);
      }
  
      else if(type === "expert" && learnersList.length === 0){
        const room = socket.id+"lasvegas"
        socket.join(room) 
        socket.on('recieve-message', message => { console.log(message) });
        socket.on('send-message', message => {
          socket.to(room).emit('recieve-message', message)
        })
      }
      else{
        const room = "global"
        socket.on('recieve-message', message => { console.log(message) });
        socket.on('send-message', message => {
          socket.to(room).emit('recieve-message', message)
        })
      }
  
    });
  });