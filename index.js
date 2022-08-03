const peer = new Peer();
let myVideoStream;
let myId;
var videoGrid = document.getElementById('videoDiv')
var input = document.createElement('input');
var button = document.createElement('button');
button.innerHTML = 'Upload File';
var peerHead = document.createElement('H1');


// console.log("111111111", myvideo);

const peerConnections = {}

myVideoStream = "1111111111111123456789087654321234567890"
// peer.on('call' , call=>{
//   alert('peer calll')
//   call.answer(stream);
//     const vid = document.createElement('H1');
//   call.on('stream' , userStream=>{
//     addVideo(vid , userStream);
//   })
//   call.on('error' , (err)=>{
//     alert(err)
//   })
//   call.on("close", () => {
//       console.log(vid);
//       vid.remove();
//   })
//   alert('bfore calll')
//   peerConnections[call.peer] = call;
// })

// navigator.mediaDevices.getUserMedia({
//   video:false,
//   audio:true
// }).then((stream)=>{
//   myVideoStream = stream;
//   console.log(stream);
//   addVideo(myvideo , stream);
//   peer.on('call' , call=>{
//     alert('peer calll')
//     call.answer(stream);
//       const vid = document.createElement('video');
//     call.on('stream' , userStream=>{
//       addVideo(vid , userStream);
//     })
//     call.on('error' , (err)=>{
//       alert(err)
//     })
//     call.on("close", () => {
//         console.log(vid);
//         vid.remove();
//     })
//     alert('bfore calll')
//     peerConnections[call.peer] = call;
//   })
// }).catch(err=>{
//     alert(err.message)
// })
peer.on('open' , (id)=>{
  console.log(id)
  videoGrid.append(id)
  
  // socket.emit("newUser" , id , roomID);
})
peer.on('error' , (err)=>{
  alert(err.type);
});

// peer.on('connection', function(conn) {
//   conn.on('data', function(data){
//     // Will print 'hi!'
//     // alert("first peer"+data);
//     const a = document.createElement('a')
//     function downloadBuffer(data, fileName) {
//       a.href = URL.createObjectURL(new Blob(
//         [ data ]
//       ))
//       a.download = fileName
//       a.click()
//     }
//     downloadBuffer(data, "sample.pdf")
//   });
// });

peer.on('connection', function(conn) {
  const chunks = [];
  conn.on('data', function(data){
      chunks.push(data);

  });
  Buffer.concat(chunks)
});


//Form Function
var conn = null;
function myFunction() {
  var peerId = document.getElementById('peerId').value
  conn = peer.connect(peerId);

  console.log(conn)
  input.type="file"
  input.name="file"
  input.id="file"
  videoGrid.append(input);
  conn.on('open', function(){
    conn.send('hi!');
  });
}

function upload() {
  var file = document.getElementById("file").files[0]
  var chunkSize = 1024 * 1024;
  var fileSize = file.size;
  var chunks = Math.ceil(file.size/chunkSize,chunkSize);
  var chunk = 0;

  console.log('file size..',fileSize);
  console.log('chunks...',chunks);

  while (chunk <= chunks) {
      var offset = chunk*chunkSize;
      console.log('current chunk..', chunk);
      console.log('offset...', chunk*chunkSize);
      console.log('file blob from offset...', offset)
      console.log(file.slice(offset,offset+chunkSize));
      conn.send(file.slice(offset,offset+chunkSize));
      chunk++;
  }
}


function sendBye() {
  conn.send({
    strings: 'hi!',
    numbers: 150,
    arrays: [1,2,3],
    evenBinary: new Blob([1,2,3]),
    andMore: {bool: true}
    });

}

//For new user join
// socket.on('userJoined' , (id)=>{
//   alert("new user joined"+id, id)
//   const call  = peer.call(id , myVideoStream);
//   const vid = document.createElement('H1');
//   call.on('error' , (err)=>{
//     alert(err);
//   })
//   call.on('' , userStream=>{
//     alert('Other user join');
//     addVideo(vid , userStream);
//   })
//   call.on('close' , ()=>{
//     vid.remove();
//     console.log("user disconect")
//   })
//   peerConnections[id] = call;
// })

// var conn = peer.connect(id);
//   conn.on('open', function(){
//   conn.send('hi!');
// });

// socket.on('userJoined' , (id)=>{
//   alert("new user joined"+id)
//   var conn = peer.connect(id);
//   conn.on('open', function(){
//     conn.send('hi!');
//   });
  
//   const call  = peer.call(id , myVideoStream);
//   const vid = document.createElement('H1');
//   call.on('error' , (err)=>{
//     alert(err);
//   })
//   call.on('' , userStream=>{
//     alert('Other user join');
//     addVideo(vid , userStream);
//   })
//   call.on('close' , ()=>{
//     vid.remove();
//     console.log("user disconect")
//   })
//   peerConnections[id] = call;
// })

// socket.on('userDisconnect' , id=>{
//   if(peerConnections[id]){
//     peerConnections[id].close();
//   }
// })
// function addVideo(video , stream){
//   videoGrid.append("<h1>New User</h1>");
// }
