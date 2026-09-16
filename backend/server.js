const express = require('express'); // iniciamos o express
const cors = require('cors'); //iniciamos o roteamento do cors
const fs = require('fs'); //inserimos edição de arquivos

const app = express(); //definimos o app prara utilizar o express ()



const PORT = 3000; //definimos a porta do backend
const ARQUIVO = "./dados.json"; //definimos o arquivo que os dados


app.use(cors()); //ativamos o app para usar o cors 
app.use(express.json());//ativamos o app para utilizar estruturas do json


function leituraUsuarios() {
    const dados = fs.readFileSync(ARQUIVO, 'utf-8');
    return JSON.parse(dados);
}

function salvarUsuarios(usuarios) {
    fs.writeFileSync(ARQUIVO, JSON.stringify(usuarios, null, 2));
}

// GET: POR ID.
app.get('/api/usuario/:id', (req, res) => {
 const usuarios = leituraUsuarios();
 const id = Number(req.params.id);
 const usuario = usuarios.find(usuario => usuario.id === id);
   if (!usuario) {
       return res.status(404).json({
         mensagem: "Usuario não encontrado"
       });
   }




 res.json(usuario);
});
//GET: PORTODOS
app.get('/api/usuarios', (req, res) => {
    const usuarios = leituraUsuarios();
    res.json(usuarios);
});
 


//POST: Criar
app.post ('/api/usuarios', (req, res) => {
const {nome,email} = req.body; //leitura da req do body

   if (!nome || !email) { //valida campo para não vir vazio
    return res.status(400).json({
        mensagem: "Nome e email são obrigatórios"
    }); }


const usuarios = leituraUsuarios(); //fazemos a leitura dos usuarios para a memoria ram 

const novoUsuario =  {id: Date.now(), nome, email};// fazemos os objetos do novo usuario

usuarios.push(novoUsuario); //adicionamos ao final da lista de usuarios

salvarUsuarios(usuarios); //salvamos o usuario no arquivo

res.status(201).json(novoUsuario); //retorna sucesso ao criar novo usuario




});          

//PUT: Editar
app.put('/api/usuarios/:id', (req, res) => {
    const {nome, email} = req.body; //pega informação do corpo da requisição
    const usuarios = leituraUsuarios(); //função de leitura ja criada
    const id =  Number(req.params.id);//estamos trabalhando com parametros
    
    
    
    const usuario = usuarios.find(usuario => usuario.id === id);
    //find vai procurar a função se usuario id é igual em 
    // valor do id passado pelo front
    usuario.nome = nome;
    usuario.email = email;

    salvarUsuarios(usuarios); //salva no arquivo

 
res.json(usuario); 
});

app.listen(PORT, () => {
    console.log(`servidor atualizado em http://localhost:${PORT}`);
});