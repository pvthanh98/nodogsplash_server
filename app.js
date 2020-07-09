var express = require('express');
var http = require('http');
var app = express();
var path = require("path");
var express = require('express');
var cors = require('cors')
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

var server = http.createServer(app)
const io = require('socket.io')(server);

io.on('connection', client => {
    client.on("admin_send_ad",(ad)=>{
        console.log(ad)
        io.emit('server_send_ad', ad);
    });
});
 
app.get("/admin",(req, res)=>{
    res.render("admin")
})

app.get('/download/:filename', function(req, res){
    const file = __dirname + "/" + "public/images/ad/"+req.params.filename;
    res.download(file); // Set disposition and send it.
})

server.listen(5000,()=> console.log("server on port 5000"));