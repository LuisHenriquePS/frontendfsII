import { Button, Table } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../icones/icones.jsx";
export default function TabelaCadastroProdutos(props){

    return (
    <div>
        <Button onClick={props.chamarTelasCadastro} className="m-2">Cadastrar</Button>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Quantidade em Estoque</th>            
            <th>Preço de Venda R$</th>
            <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {
            props.produto.map((produto, i) => {
                return (
                    <tr key={i}>
                        <td>{produto.codigo}</td>
                        <td>{produto.descricao}</td>
                        <td>{produto.qteEstoque}</td>                        
                        <td>{produto.precoVenda}</td>
                        <td>
                            <a><IconeEditar /></a>{' '}
                            <a><IconeExcluir /></a>
                        </td>
                    </tr>
                )
            })  
            }
        
        </tbody>
        </Table>
    </div>
  );
}

