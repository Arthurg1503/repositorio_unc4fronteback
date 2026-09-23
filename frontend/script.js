const API_URL = 'http://localhost:3000/api/usuarios';

const listarUsuarios = document.getElementById("listarUsuarios");

const form = document.getElementById("formUsuario");
const usuarioIdInput = document.getElementById("usuarioID");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const botaoSalvar = document.getElementById("botaoSalvar");
const mensagem = document.getElementById("mensagem");



 
 async function carregarUsuarios (){
    try {
        const res = await fetch(API_URL);
        if (!res.ok) 
            {throw new Error (`Error HTTP ${res.status}`);
        }
        const data = await res.json(); 

        listarUsuarios.innerHTML ="";
        
        data.forEach(usuario => {
              const linha = document.createElement("tr");

                linha.innerHTML = `<td>${usuario.id}</td><td>${usuario.nome}</td><td>${usuario.email}</td>
  
                <td>
                <div class="options">
                <button onclick="editarUsuario(${usuario.id})">Editar</button>
                <button onclick="excluirUsuario(${usuario.id})">Excluir</button>
                <button style ="color:#fff; background-color:#ff6347" onclick="excluirUsuario(${usuario.id})">Excluir</button>
              </div>
              </td>`;
            
                listarUsuarios.appendChild(linha);
        });
      
        }
    catch (error) {
        console.error('Error:', error);
    }
     }

     form.addEventListener("submit", async (evento) => { //inicia a leitura do botão salvar
        evento.preventDefault(); //não diexa a pagina atualizar

           const nome = nomeInput.value;
           const email = emailInput.value;
           const id = usuarioIdInput.value;

           const usuario = {
            nome,
            email
           };

           if(id){
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });            
           } else {

           await fetch (API_URL,{
             method: "POST",
             headers: {
                "Content-Type": "application/json"
             },
             body: JSON.stringify(usuario)
             
           });
        }
carregarUsuarios();

 });
  

async function editarUsuario(id) {
    const resposta = await fetch(`${API_URL}/${id}`);
    const usuario = await resposta.json();
    usuarioIdInput.value = usuario.id;
    nomeInput.value = usuario.nome;
    emailInput.value = usuario.email;
    botaoSalvar.innerHTML = "Salvar alterações";

}

async function excluirUsuario(id) {
     const confirmar = confirm("Deseja excluir mesmo este usuario?")
     if(!confirmar){
        return;
     }
     await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
     });
     mostrarMensagem("Usuário excluido com sucesso!")
     carregarUsuarios();
    
}

function mostrarMensagem(texto){
     mensagem.innerHTML = `${texto}`;
      setTimeout (()=>{mensagem.innerHTML = ""}, 3000);
}



//Inicia ja com nossa listagem 
carregarUsuarios();







