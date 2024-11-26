import express from "express";
const app = express();
app.use(express.urlencoded({ extended: true}));
const porta = 3000;
const host = "0.0.0.0";
const listaComida = [];


function menu(req , resp){
    resp.send(` 
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Cadastro de Comida :-)</title>
    <form method="POST" action="/cadastro"> 
</head>
<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Página Principal</a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/cadastro">Cadastro</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html> 
 `)
};


function addComida(req, resp){
    resp.send(`
           <html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Cadastro de Comida :-)</title>
</head>
<body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
   <div class = "Container text-center">
   <h1> Cadastro de Pratros</h1>
    <form class="row g-3" novalidate>
    <div class="col-md-4">
    <label for="Nome do Prato" class="form-label">Nome do Prato</label>
    <input type="text" class="form-control" id="nome" placeholder="Exemplo:Arroz Carreteiro">
    </div>

    <div class="col-md-4">
    <label for="Região" class="form-label">Região Tipica</label>
    <input type="text" class="form-control" id="regiao" placeholder="Exemplo:Centro-Oeste e Nordeste">
  </div>

  <div class="col-md-4">
    <label for="Melhor Horario Para o consumo" class="form-label">Melhor Horario Para o consumo</label>
    <input type="text" class="form-control" id="horario" placeholder="Exemplo:Cafe da Manha - Almoço - Jantar - Ceia">
  </div>

  <div class="col-md-6">
    <label for="Estação" class="form-label">Melhor Estacao para o consumo</label>
    <input type="text" class="form-control" id="estacao" placeholder="Exemplo:Inverno">
  </div>

  <div class="col-12">
    <button class="btn btn-primary" type="submit">Cadastrar</button>
  </div>
</form>
   </div> 
</body>
</html> 
        `);
}

function cadastrodeComidas(req, resp){
    
    const nome      = req.body.nome;
    const regiao    = req.body.regiao;
    const horario   = req.body.horario;
    const estacao   = req.body.estacao;


    const comida = {nome, regiao, horario, estacao};

    if (nome && regiao && horario && estacao)
    {
    listaComida.push(comida);


    resp.write(`
            <html>
                <head>
                    <title>Lista De Comidas Cadastradas</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    <meta charset="utf-8">
                </head>
                <body>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Regiao</th>
                            <th scope="col">Horario</th>
                            <th scope="col">Estacao</th>
                        </tr>
                    </thead>
                    <tbody>`);

                    for (var i = 0; i < listaComida.length; i++){
                        resp.write(`<tr>
                                        <td>${listaComida[i].nome}</td>
                                        <td>${listaComida[i].regiao}</td>
                                        <td>${listaComida[i].horario}</td>
                                        <td>${listaComida[i].estacao}</td>
                                    </tr>
                            `);
                        }

        resp.write(`
                </tbody> 
                </table>
                <a class="btn btn-primary" href="/cadastro">Continuar Cadastrando</a>
                <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html>`);
        }
        else 
        {
            resp.write(`
                <html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Cadastro de Comida :-)</title>
</head>
<body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
   <div class = "Container text-center">
   <h1> Cadastro de Pratros</h1>
    <form class="row g-3" novalidate>
    <div class="col-md-4">
    <label for="Nome do Prato" class="form-label">Nome do Prato</label>
    <input type="text" class="form-control" id="nome" placeholder="Exemplo:Arroz Carreteiro">
    </html>
    `);
    if (!nome )
    {
        resp.write(`<div>
                        <span><p class = "bg-danger">Por Favor !!! Nome do Prato Obrigatorio</p></span>
                    </div>`);
                    resp.end()
    }
        }
        resp.end();
}

app.get('/',menu);
app.get('/cadastro',addComida);

app.post('/cadastro',cadastrodeComidas);

app.listen(porta,host,() =>{
    console.log(`Servidor inicializado e em Execusao no Endereço http://${host}:${porta}`)
});