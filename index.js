import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from 'path'; // Importando o módulo path

const app = express();

app.use(session({
    secret: 'M1nh4Chav3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 30 // 30 minutos
    }
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const porta = 3000;
const host = "0.0.0.0";

const listaComida = [];
const usuarios = [{ usuario: 'eli', senha: '460' }];

function verificarAutenticacao(req, resp, next) {
    if (req.session.usuarioLogado) {
        next();
    } else {
        resp.redirect('/login');
    }
}

function menu(req, resp) {
    resp.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <title>Menu Principal</title>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Página Principal</a>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/cadastro">Cadastro de Comidas</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/logout">Sair</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `);
}

function addComida(req, resp) {
    resp.send(`
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <title>Cadastro de Comida</title>
        </head>
        <body>
            <div class="container">
                <h1 class="mt-5">Cadastro de Pratos</h1>
                <form class="row g-3" method="POST" action="/cadastro" novalidate>
                    <div class="col-md-4">
                        <label for="nome" class="form-label">Nome do Prato</label>
                        <input type="text" name="nome" class="form-control" id="nome" placeholder="Exemplo: Arroz Carreteiro" required>
                    </div>
                    <div class="col-md-4">
                        <label for="regiao" class="form-label">Região Típica</label>
                        <input type="text" name="regiao" class="form-control" id="regiao" placeholder="Exemplo: Centro-Oeste" required>
                    </div>
                    <div class="col-md-4">
                        <label for="horario" class="form-label">Melhor Horário Para o Consumo</label>
                        <input type="text" name="horario" class="form-control" id="horario" placeholder="Exemplo: Almoço" required>
                    </div>
                    <div class="col-md-4">
                        <label for="estacao" class="form-label">Melhor Estação para o Consumo</label>
                        <input type="text" name="estacao" class="form-control" id="estacao" placeholder="Exemplo: Inverno" required>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `);
}

function cadastrodeComidas(req, resp) {
    const nome = req.body.nome || '';
    const regiao = req.body.regiao || '';
    const horario = req.body.horario || '';
    const estacao = req.body.estacao || '';

    let errors = {};

    if (!nome) {
        errors.nome = "Por favor, informe o Nome do Prato!";
    }
    if (!regiao) {
        errors.regiao = "Por favor, informe a Região Típica!";
    }
    if (!horario) {
        errors.horario = "Por favor, informe o Melhor Horário Para o Consumo!";
    }
    if (!estacao) {
        errors.estacao = "Por favor, informe a Melhor Estação para o Consumo!";
    }

    if (Object.keys(errors).length > 0) {
        resp.send(`
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <title>Cadastro de Comida</title>
            </head>
            <body>
                <h1>Cadastro de Pratos</h1>
                <form class="row g-3" method="POST" action="/cadastro" novalidate>
                    <div class="col-md-4">
                        <label for="nome" class="form-label">Nome do Prato</label>
                        <input type="text" name="nome" class="form-control" id="nome" placeholder="Exemplo: Arroz Carreteiro" value="${nome}" required>
                        ${errors.nome ? `<div class="text-danger">${errors.nome}</div>` : ''}
                    </div>
                    <div class="col-md-4">
                        <label for="regiao" class="form-label">Região Típica</label>
                        <input type="text" name="regiao" class="form-control" id="regiao" placeholder="Exemplo: Centro-Oeste" value="${regiao}" required>
                        ${errors.regiao ? `<div class="text-danger">${errors.regiao}</div>` : ''}
                    </div>
                    <div class="col-md-4">
                        <label for="horario" class="form-label">Melhor Horário Para o Consumo</label>
                        <input type="text" name="horario" class="form-control" id="horario" placeholder="Exemplo: Almoço" value="${horario}" required>
                        ${errors.horario ? `<div class="text-danger">${errors.horario}</div>` : ''}
                    </div>
                    <div class="col-md-4">
                        <label for="estacao" class="form-label">Melhor Estação para o Consumo</label>
                        <input type="text" name="estacao" class="form-control" id="estacao" placeholder="Exemplo: Inverno" value="${estacao}" required>
                        ${errors.estacao ? `<div class="text-danger">${errors.estacao}</div>` : ''}
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Cadastrar</button>
                    </div>
                </form>
            </body>
            </html>
        `);
    } else {
        listaComida.push({ nome, regiao, horario, estacao });

        resp.write(`
            <html>
                <head>
                    <title>Lista de Comidas Cadastradas</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
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
                    <a href="/cadastro" class="btn btn-primary">Continuar Cadastrando</a>
                    <a href="/" class="btn btn-secondary">Voltar para o Menu</a>
                </body>
            </html>
        `);
    }
    resp.end();
}

function autenticarUsuario(req, resp) {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);
    
    if (usuarioEncontrado) {
        req.session.usuarioLogado = true;
        resp.redirect('/');
    } else {
        resp.send(`
            <html>
                <head>
                    <title>Login</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                </head>
                <body>
                    <div class="container">
                        <h1>Login</h1>
                        <form method="POST" action="/login">
                            <div class="mb-3">
                                <label for="usuario" class="form-label">Usuário</label>
                                <input type="text" class="form-control" id="usuario" name="usuario" required>
                            </div>
                            <div class="mb-3">
                                <label for="senha" class="form-label">Senha</label>
                                <input type="password" class="form-control" id="senha" name="senha" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Entrar</button>
                        </form>
                    </div>
                </body>
            </html>
        `);
    }
}

app.use(express.static(path.join(process.cwd(), 'pages/public')));

app.get('/login', (req, resp) => {
    resp.send(`
        <html>
            <head>
                <title>Login</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container">
                    <h1>Login</h1>
                    <form method="POST" action="/login">
                        <div class="mb-3">
                            <label for="usuario" class="form-label">Usuário</label>
                            <input type="text" class="form-control" id="usuario" name="usuario" required>
                        </div>
                        <div class="mb-3">
                            <label for="senha" class="form-label">Senha</label>
                            <input type="password" class="form-control" id="senha" name="senha" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Entrar</button>
                    </form>
                </div>
            </body>
        </html>
    `);
});

app.get('/logout', (req, resp) => {
    req.session.destroy();
    resp.redirect('/login');
});

app.get('/', verificarAutenticacao, menu);
app.get('/cadastro', verificarAutenticacao, addComida);
app.post('/cadastro', verificarAutenticacao, cadastrodeComidas);
app.post('/login', autenticarUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor inicializado e em Execução no Endereço http://${host}:${porta}`);
});
