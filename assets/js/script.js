class Pedido{
    constructor(cliente, mesa, descricao, id) {
        this.cliente = cliente;
        this.mesa = mesa;
        this.descricao = descricao;
        this.id = this.randomId();
    }
    randomId() {
        return Math.floor(Math.random() * 10000);
    }
}

class ListaPedidos{
    constructor(){
        this.pedidos = []
    }
    add(pedido) {
        if(fields()){
            erromsg("Preencha todos os campo!")
        } else {
            msg("Pedido cadastrado com Sucesso")
            this.pedidos.push(pedido);
            cleanFields();
            render()
            contador()
        }
    }

    findPedidobyId(id) {
        return this.pedidos.find((pedido) => pedido.id == id)
    }

    editPedido(id, cliente, mesa, descricao){
        const pedido = this.findPedidobyId(id);

        pedido.cliente = cliente;
        pedido.mesa = mesa;
        pedido.descricao = descricao;

        return pedido;
    }

    removePedido(id) {
        return (this.pedidos = this.pedidos.filter(
            (pedido) => pedido.id != id));
    }

    count(){
        return this.pedidos.length;
    }
}

const listaPedidos = new ListaPedidos()
let aux = null;

function createPedidos() {
    let cliente = document.getElementById("cliente").value;
    let mesa = document.getElementById("mesa").value;
    let descricao = document.getElementById("descricao").value;

    const pedido = new Pedido(cliente, mesa, descricao);

    listaPedidos.add(pedido);
}

function cleanFields() {
    document.getElementById("cliente").value = "";
    document.getElementById("mesa").value = "";
    document.getElementById("descricao").value = "";
}

function fields() {
    let cliente = document.getElementById("cliente").value;
    let mesa = document.getElementById("mesa").value;
    let descricao = document.getElementById("descricao").value;

    if(cliente == '' || mesa == '' || descricao == ''){
        return true
    } else {
        return false
    }
}

function erromsg(msg) {
    document.getElementById("erro-msg").innerHTML = msg;
    document.getElementById("erro-msg").classList.remove("hidden");
    setTimeout(function () {
        document.getElementById("error-msg").classList.add("hidden");
    }, 4000);
}

function msg(msg) {
    document.getElementById("msg").innerHTML = msg;
    document.getElementById("msg").classList.remove("hidden");
    setTimeout(function () {
        document.getElementById("msg").classList.add("hidden");
    }, 4000);
}

function render() {
    document.getElementById("lista").classList.remove("hidden");
    let content = ''

    listaPedidos.pedidos.forEach((pedido) => {
        content += `
        <div id="a-${pedido.id}">
            <p>ID: ${pedido.id}</p>
            <p>Cliente: ${pedido.cliente}</p>
            <p>Mesa: ${pedido.mesa}</p>
            <p>Descrição: ${pedido.descricao}</p>
            <div>
                <button onclick="atualizar(${pedido.id})"><i class="fa-solid fa-pen"></i></button>
                <button onclick="remove(${pedido.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        `
    });

    document.getElementById("lista").innerHTML = content;
}

function atualizar(id) {
    const pedido = listaPedidos.findPedidobyId(id);

    document.getElementById("cliente").value = pedido.cliente;
    document.getElementById("mesa").value = pedido.mesa;
    document.getElementById("descricao").value = pedido.descricao;

    document.getElementById("botaoCadastrar").classList.add("hidden");
    document.getElementById("botaoEditar").classList.remove("hidden");

    aux = id;
}


function edit() {
    let cliente = document.getElementById("cliente").value;
    let mesa = document.getElementById("mesa").value;
    let descricao = document.getElementById("descricao").value;

    listaPedidos.editPedido(aux, cliente, mesa, descricao);

    render();

    document.getElementById("botaoCadastrar").classList.add("hidden");
    document.getElementById("botaoEditar").classList.remove("hidden");

    aux = null

}

function remove(id) {
    listaPedidos.removePedido(id);

    render();
    contador()
    document.getElementById(`a-${id}`).classList.add("hidden");
}

function contador(){
    let contador = listaPedidos.count()

    document.getElementById("contador").innerHTML = `Lista de Pedidos - ${contador}`
}