const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

// Informando a pasta de arquivos estáticos relacionados ao html
server.use(express.static('public'));

// Habilitar body do formulário
server.use(express.urlencoded({ extended: true }));

// Conexão com o BD
const Pool = require('pg').Pool;
const db = new Pool({
  user: '****',
  password: '****',
  host: 'localhost',
  port: 5432,
  database: '****'
});

// Configurando a template engine
nunjucks.configure('./', {
  express: server,
  noCache: true
});

server.get("/", (req, res) => {
  db.query("select * from donors", (err, result) => {
    if(err) return res.send("Erro no banco de dados");

    const donors = result.rows;
    return res.render('index.html', { donors });
  });
});

server.post("/", (req, res) => {
  const { name, email, blood } = req.body;

  if(name == "" || email == "" || blood == "") {
    return res.send("Todos os campos são obrigatórios");
  }

  const query = `insert into donors ("name", "email", "blood") values ($1, $2, $3)`;
  const values = [name, email, blood];

  db.query(query, values, (err) => {
    if(err) return res.send("Erro no banco de dados");
    return res.redirect("/");
  });
});

server.listen(3000);
