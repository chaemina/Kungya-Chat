const http = require("http");
const fs = require("fs").promises;

http.createServer(async (req,res)=>{
    try {
        if(req.method==='GET'){
            if(req.url === '/'){
                const data = await fs.readFile('./index.html');
                res.writeHead(200, { 'Content-Type':'text/html; charset=utf-8'});
                return res.end(data);
            }
            try{
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            }catch(err){
                console.log(err);
            }
        }
        res.writeHead(404);
        return res.end("NOT FOUND");
        }catch(err){
            console.log(err);
            res.writeHead(500, {'Content-Type':'text/plain;charset=utf-8'});
            res.end(err.message);
        }
}).listen(8080, ()=>{
    console.log("쿵야챗 연결!!")
})