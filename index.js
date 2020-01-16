var express = require('express');
var app = express();
let url = require('url')

const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var mysql = require('mysql');

app.get('/api/', function(req, res) {
    const con = mysql.createConnection({
        host: "localhost",
        user: "olso",
        password: "olso",
        database: "projekti_nodevue"
    })

    const q = url.parse(req.url, true).query;
    console.log(q.username)

    if (!q.username) {
        res.sendStatus(400).end()
        return
    }

    let username = q.username;
    let argumentList = [username]

    let statement = `
    SELECT Artist, Album, Title, Listen_timestamp, Listens.Listen_ID FROM Listens 
    INNER JOIN Users ON Users.User_ID = Listens.User_ID WHERE Users.Username = ?
    `

    con.connect(function(err) {
        if (err) throw err;
        con.query(statement, argumentList, function(err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
})

app.get('/api/comments/', function(req, res) {
    const con = mysql.createConnection({
        host: "localhost",
        user: "olso",
        password: "olso",
        database: "projekti_nodevue"
    })

    const q = url.parse(req.url, true).query;
    console.log(q.username)

    if (!q.username) {
        res.sendStatus(400).end()
        return
    }

    let username = q.username;
    let argumentList = [username]

    let statement = `
    SELECT Comment_ID, Comment_text, Commenter_ID, Profile_comments.User_ID FROM Profile_comments 
    INNER JOIN Users ON Profile_comments.User_ID = Users.User_ID WHERE Profile_comments.User_ID = ?
    `
    con.connect(function(err) {
        if (err) throw err;
        con.query(statement, argumentList, function(err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
})

app.post('/api/comments/', function(req, res) {
    const con = mysql.createConnection({
        host: "localhost",
        user: "olso",
        password: "olso",
        database: "projekti_nodevue"
    })

    let jsonData = req.body
    let argumentList = [jsonData.Comment_text, jsonData.Commenter_ID, jsonData.User_ID]

    let statement = `
    INSERT INTO Profile_comments (Comment_text, Commenter_ID, User_ID)
    VALUES (?, ?, ?)
    `
    con.connect(function(err) {
        if (err) throw err;
        con.query(statement, argumentList, function(err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
})

app.post('/api/addlisten/', function (req, res) {
    const con = mysql.createConnection({
      host: "localhost",
      user: "olso",
      password: "olso",
      database: "projekti_nodevue"
    })

    let jsonData = req.body

    let statement = `
    INSERT INTO Listens (Artist, Album, Title, User_ID) VALUES (?, ?, ?, ?)
    `
    let argumentList = [jsonData.artist, jsonData.album, jsonData.title, jsonData.userId]

    con.connect(function(err) {
      if (err) throw err;
      con.query(statement, argumentList, function (err, result, fields) {
        if (err) throw err;
        res.send((result))
      });
    })
})

app.delete('/api/deletelisten/', (req, res) => {
    const con = mysql.createConnection({
      host: "localhost",
      user: "olso",
      password: "olso",
      database: "projekti_nodevue"
    })

    const q = url.parse(req.url, true).query;
    console.log(q.listenId)

    if (!q.listenId) {
            res.sendStatus(400).end()
        return
    } 

    let listenId = q.listenId
    let argumentList = [listenId]

    let statement = `
    DELETE FROM Listens WHERE Listen_ID = ?
    `

    con.connect(function(err) {
      if (err) throw err;
      con.query(statement, argumentList, function (err, result, fields) {
        if (err) throw err;
        res.send(result)
      });
    })
})

app.post('/api/adduser/', function(req, res) {
    const con = mysql.createConnection({
        host: "localhost",
        user: "olso",
        password: "olso",
        database: "projekti_nodevue"
    })

    let jsonData = req.body

    let statement = `
    INSERT INTO Users (Username) VALUES (?)
    `
    let argumentList = [jsonData.username]

    con.connect(function(err) {
        if (err) throw err;
        con.query(statement, argumentList, function(err, result, fields) {
            if (err) throw err;
            res.send((result))
        });
    })
})

app.get('/api/userdata/', function(req, res) {
    const con = mysql.createConnection({
        host: "localhost",
        user: "olso",
        password: "olso",
        database: "projekti_nodevue"
    })

    const q = url.parse(req.url, true).query
    console.log(q.username)

    let statement = ``
    let username = q.username
    let userId = q.id
    let argumentList

    if (!q.username && !q.id) {
        res.sendStatus(400).end()
        return
    }
    if (q.username && q.id) {
        res.sendStatus(400).end()
        return
    }

    if (q.username) {
        statement = `
        SELECT Username, Profile_picture, User_ID FROM Users WHERE Users.Username = ?
        `
        argumentList = [username]
    } else if (q.id) {
        statement = `
        SELECT Username, Profile_picture, User_ID FROM Users WHERE Users.User_ID = ?
        `
        argumentList = [userId]
    }


    con.connect(function(err) {
        if (err) throw err;
        con.query(statement, argumentList, function(err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
})

app.get('/api/logindata/', function(req, res) {
    const con = mysql.createConnection({
        host: "localhost",
        user: "olso",
        password: "olso",
        database: "projekti_nodevue"
    })

    const q = url.parse(req.url, true).query;
    console.log(q.username + " - " + q.password)

    if (!q.username && !q.password) {
        res.sendStatus(400).end()
        return
    }
    let username = q.username;
    let password = q.password;
    let argumentList = [username, password]

    let loginStatement = `
    SELECT User_ID, Username, Password FROM Users WHERE Users.Username = ?
    `
    con.connect(function(err) {
        if (err) throw err;
        con.query(loginStatement, argumentList, function(err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })

})

app.post('/api/register/', function(req, res) {
    const con = mysql.createConnection({
        host: "localhost",
        user: "olso",
        password: "olso",
        database: "projekti_nodevue"
    })
    let jsonData = req.body

    let statement = `
    INSERT INTO Users (Username, Password) VALUES (?, ?)
    `
    let argumentList = [jsonData.username, jsonData.password]

    con.connect(function(err) {
        if (err) throw err;
        con.query(statement, argumentList, function(err, result, fields) {
            if (err) throw err;
            res.send((result))
        });
    })


})

const server = app.listen(8081, function() {
    const host = server.address().address
    const port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

