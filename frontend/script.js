const API_URL = 'http://localhost:3000/api/usuarios';

const listarUsuarios = document.getElementById("listarUsuarios");

const form = document.getElementById("formUsuario");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const botaoSalvar = document.getElementById("botaoSalvar");


 
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

                linha.innerHTML = `<td>${usuario.id}</td><td>${usuario.nome}</td><td>${usuario.email}</td>`;
                listarUsuarios.appendChild(linha);
        });
      
        }
    catch (error) {
        console.error('Error:', error);
    }
     }

//Inicia ja com nossa listagem 
carregarUsuarios();





