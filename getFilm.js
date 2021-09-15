const https = require('https')
var request = require('request').defaults({ encoding: null });
var express = require('express')
const jsdom = require("jsdom");
const path = require('path');
const { JSDOM } = jsdom;
var app = express()

const PORT = process.env.PORT || 3001;

function readURL(url, base=false) {
    if (base) {
        const BASE_URL = 'https://47.svetacdn.in/zXL4q2eWJ65J/'
        url = BASE_URL+url
    }
    console.log(url)
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            const { statusCode } = res;
            console.log(statusCode)
            let error;
            if (statusCode !== 200) {
                error = new Error(`Ошибка запроса. Код ответа: ${statusCode}`);
            }
            if (error) {

                reject(error);
                res.resume();
                return;
            }
            let rawData = '';
            res.on('data', chunk => rawData += chunk);
            res.on('end', () => resolve(rawData));
        }).on('error', (e) => reject(e)); // ошибка -> отклоняем Промис
    })
}

function imageBase64(url) {
    return new Promise((resolve, reject) => {
        request.get(url, function (error, response, body) {
            if (error) {
                resolve(error);
            }
            if (!error && response.statusCode == 200) {
                var data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
                //console.log(data);
                resolve(data)
            }
        })
    })
}

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });

app.get('/getFilm/:filmType/:num', function (req, res) {
    
    res.setHeader("Content-Type", "text/html");
    res.setHeader('Access-Control-Allow-Origin', '*');

    const type = req.params["filmType"]
    const num = req.params["num"]
    
    
    console.log(type)
    const startReq = new Date().getTime();
    readURL(type + '/' + num, true)
    .then(data => {
        
        const dom = new JSDOM(`${data}`);
        const scripts = dom.window.document.getElementsByTagName('script');
        const links_head = dom.window.document.getElementsByTagName('link');
        scripts[0].src = `https://film-h.herokuapp.com/playerjs.js`
        scripts[1].src = `https://film-h.herokuapp.com/iframe.js`
        links_head[0].href = `https://film-h.herokuapp.com/iframe.css`
        //console.log(dom.window.document.getElementsByTagName('script')[0]); // "Hello world"
        const outResp = dom.serialize()
        //console.log(outResp)
        //console.log(dom)
        //{html: outResp}
        res.send(outResp)
        const endReq = new Date().getTime();
        console.log(`SecondWay: ${endReq - startReq}ms`);
        console.log(req.connection.remoteAddress)
    }
)
.catch(err => console.log(err.message))
})

app.get('/photo?', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*');

    const query = req.query
    console.log(query)
    const img = req.query["url"]
    
    console.log(img)
    const startReq = new Date().getTime();
    imageBase64(img)
    .then(data => {
        res.send(res.json({result: data, status: 'success'}))
        const endReq = new Date().getTime();
        console.log(`SecondWay: ${endReq - startReq}ms`);
        console.log(req.connection.remoteAddress)
    }
)
.catch(err => console.log(err.message))
})

app.listen(PORT)