
/**
 * Mostrando Produtos
 * 
 */
function fetchProducts() {
    const api_url_find = `http://localhost:8080/produto/find/all`;
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


            data.forEach((produto) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                  <td>${produto.codigo}</td>
                  <td>${produto.descricao}</td>
                  <td>${produto.marca}</td>
                  <td>${produto.preco}</td>
              `;
                tableBody.appendChild(row);
            });
        })
        .catch((error) => console.error("Erro:", error));
}

/**
 * Buscando Produto pela Descricão
 * 
 */
async function buscarProdutoPorDescricao() {
    const descricao = document.getElementById("descricao_buscar");
    const tableBody = document.getElementById("buscarTableBody");

    try {
        const response = await fetch(`http://localhost:8080/produto/find/descripiton/starts/${descricao.value}`);
        if (response.ok) {
            const produtos = await response.json();

            if (produtos.length > 0) {
                tableBody.innerHTML = "";
                produtos.forEach(produto => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
              <td>${produto.codigo}</td>
              <td>${produto.descricao}</td>
              <td>${produto.marca}</td>
              <td>${produto.preco}</td>
          `;
                    tableBody.appendChild(row);
                });
                descricao.value = "";
            } else {
                tableBody.innerHTML = `
          <tr>
              <td colspan="4" class="text-center">Nenhum produto encontrado.</td>
          </tr>
          `;
            }
        } else {
            alert("Erro ao buscar produtos.");
        }
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
}


/**
 * Buscando Produto pelo ID
 * 
 */
async function buscarProdutoPorId() {
    const codigo = document.getElementById("codigo_edit").value;
    if (codigo) {
        try {
            const response = await fetch(`http://localhost:8080/produto/find/id/${codigo}`);
            if (response.ok) {
                const produto = await response.json();

                document.getElementById("codigo_edit").value = produto.codigo;
                document.getElementById("codigo_edit").disabled = true;
                document.getElementById("descricao_edit").value = produto.descricao;
                document.getElementById("marca_edit").value = produto.marca;
                document.getElementById("preco_edit").value = produto.preco;
            } else {
                alert("Produto não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
        }
    }
}

async function editarProduto(event) {
    event.preventDefault;

    const codigo = document.getElementById("codigo_edit").value;
    const descricao = document.getElementById("descricao_edit").value;
    const marca = document.getElementById("marca_edit").value;
    const preco = document.getElementById("preco_edit").value;
    
    const produtoAtualizado = {
        descricao,
        marca,
        preco
    };

    try {
        const response = await fetch(`http://localhost:8080/produto/update/${codigo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produtoAtualizado)
        });
        
        if (response.ok) {
            alert("Produto atualizado com sucesso!");
            
            fetchProducts();
            
            document.getElementById("codigo_edit").value = "";
            document.getElementById("descricao_edit").value = "";
            document.getElementById("marca_edit").value = "";
            document.getElementById("preco_edit").value = "";
            document.getElementById("codigo_edit").disabled = false;
            
        } else {
            alert("Erro ao atualizar produto.");
        }
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
    }
}

/**
 * Removendo Produto
 * @param {event}
*/
function removeProduct(event) {
    event.preventDefault();
    
    let codigo_rm = document.getElementById("codigo_remove");
    if (!codigo_rm.value) {
        console.error("Código do produto não fornecido.");
        return;
    }
    
    let api_url_remove = `http://localhost:8080/produto/remove/${codigo_rm.value}`;
    
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
                console.log("Produto removido com sucesso:", text);
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
 * Adicionando Produto
 * @param {event}
*/
function addProduct(event) {
    event.preventDefault();
    const api_url_add = `http://localhost:8080/produto/add`;
    
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let marca = document.getElementById("marca").value;
    let preco = document.getElementById("preco").value;
    
    
    fetch(api_url_add, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            codigo: codigo,
            marca: marca,
            descricao: descricao,
            preco: preco,
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
            document.getElementById("descricao").value = "";
            document.getElementById("marca").value = "";
            document.getElementById("preco").value = "";
            console.log(data);
            fetchProducts();
        })
        .catch((error) => console.error("Erro:", error));
    }
    
    document.addEventListener("DOMContentLoaded", fetchProducts);
    
    document.getElementById("codigo_edit").addEventListener("blur", buscarProdutoPorId);
    document.getElementById("frmEditarProduto").addEventListener("submit", editarProduto);
    document.getElementById("frmBuscarProduto").addEventListener("click", buscarProdutoPorDescricao);
    document.getElementById("frmAdicionarProduto").addEventListener("submit", addProduct);
    document.getElementById("frmExcluirProduto").addEventListener("submit", removeProduct);
