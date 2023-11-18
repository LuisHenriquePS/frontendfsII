import { useState } from "react";
import { Button, Container, Table, Form, Row, Modal } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes.js";

export default function TabelaClientes({ listaClientes, exibirTabela }) {
    const [clientes, setClientes] = useState(listaClientes);
    const [showModal, setShowModal] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);

    function excluirCliente(cpf) {
        const listaAtualizada = clientes.filter((cliente) => cliente.cpf !== cpf);
        setClientes(listaAtualizada);
    }

    function editarCliente(cpf, novasInformacoes) {
        const index = clientes.findIndex((cliente) => cliente.cpf === cpf);

        if (index !== -1) {
            const listaAtualizada = [...clientes];
            listaAtualizada[index] = { ...listaAtualizada[index], ...novasInformacoes };
            setClientes(listaAtualizada);
        } else {
            console.log("Cliente não encontrado.");
        }

        // Fechar o modal após a edição
        setShowModal(false);
    }

    function handleEditarClienteClick(cliente) {
        setClienteSelecionado(cliente);
        setShowModal(true);
    }

    function handleModalClose() {
        setShowModal(false);
        setClienteSelecionado(null);
    }

    function handleSalvarEdicao() {
        // Obtenha as novas informações do modal
        const novasInformacoes = {
            cpf: clienteSelecionado.cpf,
            nome: document.getElementById("nomeEdit").value,
            endereco: document.getElementById("enderecoEdit").value,
            bairro: document.getElementById("bairroEdit").value,
            cidade: document.getElementById("cidadeEdit").value,
            uf: document.getElementById("ufEdit").value,
            telefone: document.getElementById("telefoneEdit").value,
            email: document.getElementById("emailEdit").value,
        };

        // Edite o cliente
        editarCliente(clienteSelecionado.cpf, novasInformacoes);
    }

    function filtrarClientes(e) {
        const termoBusca = e.currentTarget.value;
        fetch(urlBase + "/clientes", { method: "GET" })
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error("Erro na requisição");
                }
                return resposta.json();
            })
            .then((listaClientes) => {
                if (Array.isArray(listaClientes)) {
                    const resultadoBusca = listaClientes.filter((cliente) =>
                        cliente.cpf.toLowerCase().includes(termoBusca.toLowerCase())
                    );
                    setClientes(resultadoBusca);
                }
            })
            .catch((erro) => {
                console.error(erro);
                // Trate o erro de acordo com sua necessidade
            });
    }

    return (
        <Container>
            <Button onClick={() => exibirTabela(false)}>Cadastrar</Button>
            <Container className="m-3">
                <Row>
                    <Form.Control
                        type="text"
                        id="termoBusca"
                        placeholder="Digite o nome do item para pesquisar"
                        onChange={filtrarClientes}
                    />
                </Row>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>SABOR DA PIZZA</th>
                        <th>ADICIONAL</th>
                        <th>ENDEREÇO</th>
                        <th>QUANTIDADE</th>
                        <th>INFORMAÇÕES ADICIONAIS</th>
                        <th>FORMA DE PAGAMENTO</th>
                        <th>BEBIDA</th>
                        <th>OBSERVAÇÕES</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes?.map((cliente) => (
                        <tr key={cliente.cpf}>
                            <td>{cliente.cpf}</td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.endereco}</td>
                            <td>{cliente.bairro}</td>
                            <td>{cliente.cidade}</td>
                            <td>{cliente.uf}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.email}</td>
                            <td>
                                <Button onClick={() => handleEditarClienteClick(cliente)}>
                                    {/* Ícone de lápis para indicar edição */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-pencil"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                    </svg>
                                </Button>{" "}
                                <Button
                                    onClick={() => {
                                        if (window.confirm("Deseja excluir permanentemente?")) {
                                            excluirCliente(cliente.cpf);
                                        }
                                    }}
                                >
                                    {/* Ícone de lixeira para indicar exclusão */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-trash3"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal de Edição */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="cpfEdit">
                            <Form.Label>SABOR DA PIZZA</Form.Label>
                            <Form.Control type="text" defaultValue={clienteSelecionado?.cpf} readOnly />
                        </Form.Group>
                        <Form.Group controlId="nomeEdit">
                            <Form.Label>ADICIONAL</Form.Label>
                            <Form.Control type="text" defaultValue={clienteSelecionado?.nome} />
                        </Form.Group>
                        <Form.Group controlId="enderecoEdit">
                            <Form.Label>RESPONSÁVEL</Form.Label>
                            <Form.Control type="text" defaultValue={clienteSelecionado?.endereco} />
                        </Form.Group>
                        <Form.Group controlId="bairroEdit">
                            <Form.Label>DESCRIÇÃO</Form.Label>
                            <Form.Control type="text" defaultValue={clienteSelecionado?.bairro} />
                        </Form.Group>
                        <Form.Group controlId="cidadeEdit">
                            <Form.Label>LOCAL</Form.Label>
                            <Form.Control type="text" defaultValue={clienteSelecionado?.cidade} />
                        </Form.Group>
                        <Form.Group controlId="ufEdit">
                            <Form.Label>FORMA DE AQUISIÇÃO</Form.Label>
                            <Form.Control type="text" defaultValue={clienteSelecionado?.uf} />
                        </Form.Group>
                        <Form.Group controlId="telefoneEdit">
                            <Form.Label>ORIGEM DO ITEM</Form.Label>
                            <Form.Control type="text" defaultValue={clienteSelecionado?.telefone} />
                        </Form.Group>
                        <Form.Group controlId="emailEdit">
                            <Form.Label>OBSERVAÇÕES</Form.Label>
                            <Form.Control type="text" defaultValue={clienteSelecionado?.email} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSalvarEdicao}>
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
