import Pagina from "../templates/Pagina.js";
import FormCliente from "../formularios/FormCadCliente.jsx";
import TabelaClientes from "../tabelas/TabelaCliente.jsx";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes.js";

 export default function TelaCadastroCliente(props){
    const [clientes, setClientes] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);  
    const [modoEdicao, setModoEdicao] = useState(false);
    const [clienteParaEdicao, setClienteParaEdicao] = useState(null);



    

    useEffect(()=>{
        fetch(urlBase + "/clientes", {
            method:"GET"
        }).then((resposta)=>{
            return resposta.json();
        }).then((dados)=>{
            if (Array.isArray(dados)){
                setClientes(dados);                 
            }
            else{

            }
        });
    },[]);

    return(
        <Pagina>
            <Container className="border">
                <Alert variant={"success"} className="text-center">Faça seu pedido da Pizza aqui</Alert>

                {exibirTabela ? (
                    <TabelaClientes
                        listaClientes={clientes}
                        setClientes={setClientes}
                        exibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        setClienteParaEdicao={setClienteParaEdicao}
                    />
                ) : (
                    <FormCliente
                        listaClientes={clientes}
                        setClientes={setClientes}
                        exibirTabela={setExibirTabela}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                        clienteParaEdicao={clienteParaEdicao}
                        atualizarCliente={(clienteAtualizado) => {
                            const listaAtualizada = clientes.map((cliente) =>
                                cliente.cpf === clienteAtualizado.cpf ? clienteAtualizado : cliente
                            );
                            setClientes(listaAtualizada);
                        }}
                    />
                )}
            </Container>
        </Pagina>
    );
}