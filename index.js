import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
const porta = 3000;
const host = "0.0.0.0";
const listaComida = [];

function menu(req, resp) {
    resp.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <title>Cadastro de Comida :-)</title>
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
    `);
}

function cadastrodeComidas(req, resp) {
    const nome = req.body.nome || '';
    const regiao = req.body.regiao || '';
    const horario = req.body.horario || '';
    const estacao = req.body.estacao || '';

    const comida = { nome, regiao, horario, estacao };

    let errors = {}; // Objeto para armazenar mensagens de erro

    if (!nome) {
        errors.nome = "Nome do Prato é obrigatório!";
    }
    if (!regiao) {
        errors.regiao = "Região Típica é obrigatória!";
    }
    if (!horario) {
        errors.horario = "Horário de Consumo é obrigatório!";
    }
    if (!estacao) {
        errors.estacao = "Estação para o Consumo é obrigatória!";
    }

    if (Object.keys(errors).length > 0) {
        resp.write(`
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
                    <title>Cadastro de Comida :-)</title>
                </head>
                <body>
                    <div class="Container text-center">
                        <h1>Cadastro de Pratos</h1>
                        <form class="row g-3" method="POST" action="/cadastro" novalidate>
                            <div class="col-md-4">
                                <label for="nome" class="form-label">Nome do Prato</label>
                                <input type="text" name="nome" class="form-control" id="nome" placeholder="Exemplo: Arroz Carreteiro" value="${nome}" required>
                                <div class="text-danger">${errors.nome || ''}</div> <!-- Mensagem de erro -->
                            </div>
                            <div class="col-md-4">
                                <label for="regiao" class="form-label">Região Típica</label>
                                <input type="text" name="regiao" class="form-control" id="regiao" placeholder="Exemplo: Centro-Oeste e Nordeste" value="${regiao}" required>
                                <div class="text-danger">${errors.regiao || ''}</div> <!-- Mensagem de erro -->
                            </div>
                            <div class="col-md-4">
                                <label for="horario" class="form-label">Melhor Horário Para o Consumo</label>
                                <input type="text" name="horario" class="form-control" id="horario" placeholder="Exemplo: Café da Manhã - Almoço - Jantar - Ceia" value="${horario}" required>
                                <div class="text-danger">${errors.horario || ''}</div> <!-- Mensagem de erro -->
                            </div>
                            <div class="col-md-6">
                                <label for="estacao" class="form-label">Melhor Estação para o Consumo</label>
                                <input type="text" name="estacao" class="form-control" id="estacao" placeholder="Exemplo: Inverno" value="${estacao}" required>
                                <div class="text-danger">${errors.estacao || ''}</div> <!-- Mensagem de erro -->
                            </div>
                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Cadastrar</button>
                            </div>
                        </form>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
                </body>
            </html>
        `);
    } else {
        listaComida.push(comida);
        
        resp.write(`
            <html>
                <head>
                    <title>Lista De Comidas Cadastradas</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
                    <meta charset="utf-8">
                </head>
                <body>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Região</th>
                                <th scope="col">Horário</th>
                                <th scope="col">Estação</th>
                            </tr>
                        </thead>
                        <tbody>
        `);

        for (var i = 0; i < listaComida.length; i++) {
            resp.write(`
                <tr>
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
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
            </html>
        `);
    }
    resp.end(); // Finaliza a resposta
}

app.get('/', menu);
app.get('/cadastro', addComida);
app.post('/cadastro', cadastrodeComidas);

app.listen(porta, host, () => {
    console.log(`Servidor inicializado e em Execução no Endereço http://${host}:${porta}`);
});