import { Row, Col, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
//assistir aula 02 1:34:00
//Antes fazer a aula de Caixa de Seleção

function FormCadProduto(props) {
  return (
    <>
        <Row>
            <Col>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Descrição do Produto"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="Informe a Descrição do Produto"
                    id = 'descricao' 
                    name='descricao' />
                </FloatingLabel>
            </Col>
        </Row>
        <Row>
            <Col>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Preço de Custo"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="Informe a Descrição do Produto" 
                    id = 'precoCusto' 
                    name='precoCusto'/>
                </FloatingLabel>
            </Col>
        </Row>
        
    </>
  );
}

export default FormCadProduto;