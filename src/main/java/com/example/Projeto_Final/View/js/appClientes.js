
/**
 * Mostrando Clientes
 * 
 */
function fetchProducts() {
    const api_url_find = `http://localhost:8080/cliente/find/all`;
    fetch(api_url_find)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro na requisição: " + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            const tableBody = document.getElementById("productTableBody");
            tableBody.innerHTML = "";


            data.forEach((cliente) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                  <td>${cliente.codigo}</td>
                  <td>${cliente.nome}</td>
                  <td>${cliente.email}</td>
              `;
                tableBody.appendChild(row);
            });
        })
        .catch((error) => console.error("Erro:", error));
}

/**
 * Buscando Cliente pela Descricão
 * 
 */
async function buscarClientePorDescricao() {
    const descricao = document.getElementById("descricao_buscar");
    const tableBody = document.getElementById("buscarTableBody");

    try {
        const response = await fetch(`http://localhost:8080/Cliente/find/descripiton/starts/${descricao.value}`);
        if (response.ok) {
            const clientes = await response.json();

            if (clientes.length > 0) {
                tableBody.innerHTML = "";
                clientes.forEach(cliente => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
              <td>${cliente.codigo}</td>
              <td>${cliente.nome}</td>
              <td>${cliente.email}</td>
          `;
                    tableBody.appendChild(row);
                });
                descricao.value = "";
            } else {
                tableBody.innerHTML = `
          <tr>
              <td colspan="4" class="text-center">Nenhum Cliente encontrado.</td>
          </tr>
          `;
            }
        } else {
            alert("Erro ao buscar Clientes.");
        }
    } catch (error) {
        console.error("Erro ao buscar Clientes:", error);
    }
}


/**
 * Buscando Cliente pelo ID
 * 
 */
async function buscarClientePorId() {
    const codigo = document.getElementById("codigo_edit").value;
    if (codigo) {
        try {
            const response = await fetch(`http://localhost:8080/cliente/find/id/${codigo}`);
            if (response.ok) {
                const cliente = await response.json();

                document.getElementById("codigo_edit").value = cliente.codigo;
                document.getElementById("codigo_edit").disabled = true;
                document.getElementById("nome_edit").value = cliente.nome;
                document.getElementById("email_edit").value = cliente.email;
            } else {
                alert("Cliente não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar Cliente:", error);
        }
    }
}

async function editarCliente(event) {
    event.preventDefault;

    const codigo = document.getElementById("codigo_edit").value;
    const nome = document.getElementById("nome_edit").value;
    const email = document.getElementById("email_edit").value;
    
    const ClienteAtualizado = {
        descricao,
        nome,
        email
    };

    try {
        const response = await fetch(`http://localhost:8080/Cliente/update/${codigo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ClienteAtualizado)
        });
        
        if (response.ok) {
            alert("Cliente atualizado com sucesso!");
            
            fetchProducts();
            
            document.getElementById("codigo_edit").value = "";
            document.getElementById("nome_edit").value = "";
            document.getElementById("email_edit").value = "";
            document.getElementById("codigo_edit").disabled = false;
            
        } else {
            alert("Erro ao atualizar Cliente.");
        }
    } catch (error) {
        console.error("Erro ao atualizar Cliente:", error);
    }
}

/**
 * Removendo Cliente
 * @param {event}
*/
function removeProduct(event) {
    event.preventDefault();
    
    let codigo_rm = document.getElementById("codigo_remove");
    if (!codigo_rm.value) {
        console.error("Código do Cliente não fornecido.");
        return;
    }
    
    let api_url_remove = `http://localhost:8080/cliente/remove/${codigo_rm.value}`;
    
    fetch(api_url_remove, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
            if (!response.ok) {
                return response.text().then((text) => {
                    console.error("Erro no retorno da resposta:", text);
                    throw new Error("Erro na requisição: " + response.statusText);
                });
            }
            return response.text().then((text) => {
                console.log("Cliente removido com sucesso:", text);
                return text ? JSON.parse(text) : {};
            });
        })
        .then((data) => {
            codigo_rm.value = "";
            fetchProducts();
        })
        .catch((error) => console.error("Erro:", error));
    }
    
/**
 * Adicionando Cliente
 * @param {event}
*/
function addProduct(event) {
    event.preventDefault();
    const api_url_add = `http://localhost:8080/cliente/add`;
    
    let codigo = document.getElementById("codigo").value;
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    
    
    fetch(api_url_add, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            codigo: codigo,
            nome: nome,
            email: email,
        }),
    })
    .then((response) => {
        if (!response.ok) {
                return response.text().then((text) => {
                    console.error("Erro no retorno da resposta:", text);
                    throw new Error("Erro na requisição: " + response.statusText);
                });
            }
            return response.text().then((text) => {
                console.log("Resposta completa:", text);
                return text ? JSON.parse(text) : {};
            });
        })
        .then((data) => {
            document.getElementById("codigo").value = "";
            document.getElementById("nome").value = "";
            document.getElementById("email").value = "";
            console.log(data);
            fetchProducts();
        })
        .catch((error) => console.error("Erro:", error));
    }
    
    document.addEventListener("DOMContentLoaded", fetchProducts);
    
    document.getElementById("codigo_edit").addEventListener("blur", buscarClientePorId);
    document.getElementById("frmEditarCliente").addEventListener("submit", editarCliente);
    document.getElementById("frmBuscarCliente").addEventListener("submit", buscarClientePorDescricao);
    document.getElementById("frmAdicionarCliente").addEventListener("submit", addProduct);
    document.getElementById("frmExcluiCliente").addEventListener("submit", removeProduct);