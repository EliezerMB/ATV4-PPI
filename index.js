import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from 'path';

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
app.use(express.static(path.join(process.cwd(), 'public')));
const listaProdutos = [];


app.get('/login', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});


app.post('/login', (req, res) => {
    const { usuario } = req.body; 
    req.session.usuarioLogado = true;
    req.session.usuarioNome = usuario; 
    req.session.dataHoraUltimoLogin = new Date().toLocaleString(); 
    res.redirect('/cadastro'); 
});


app.get('/cadastro', (req, res) => {
    if (!req.session.usuarioLogado) {
        return res.send('Você precisa realizar o login para acessar esta página. Login');
    }
    res.sendFile(path.join(process.cwd(), 'public', 'cadastro.html'));
});

app.post('/cadastro', (req, res) => {
    const { codigoBarras, descricao, precoCusto, precoVenda, dataValidade, qtdEstoque, nomeFabricante } = req.body;
    
    const produto = {
        codigoBarras,
        descricao,
        precoCusto,
        precoVenda,
        dataValidade,
        qtdEstoque,
        nomeFabricante
    };

    listaProdutos.push(produto);
    
    res.redirect('/produtos'); 
});

app.get('/produtos', (req, res) => {
    if (!req.session.usuarioLogado) {
        return res.send('Você precisa realizar o login para acessar esta página. Login');
    }
    
    const ultimoAcesso = req.session.dataHoraUltimoLogin || 'N/A';

    let produtosHtml = 'Lista de Produtos';
    produtosHtml += `Último Acesso: ${ultimoAcesso}`;
    produtosHtml += '';
    produtosHtml += `
        
    `;

    listaProdutos.forEach(produto => {
        produtosHtml += `
            
        `;
    });
    
    produtosHtml += `Código de Barras
            Descrição
            Preço de Custo
            Preço de Venda
            Data de Validade
            Qtd em Estoque
            Nome do Fabricante
        
                ${produto.codigoBarras}
                ${produto.descricao}
                ${produto.precoCusto}
                ${produto.precoVenda}
                ${produto.dataValidade}
                ${produto.qtdEstoque}
                ${produto.nomeFabricante}`
            
            ;
    produtosHtml += 'Cadastrar Novo Produto';
    produtosHtml += 'Sair';
    
    res.send(produtosHtml);
});


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login'); 

const porta = 3000;
const host = "0.0.0.0";

app.listen(porta, host, () => {
    console.log(`Servidor iniciado em http://${host}:${porta}`);
}); })
