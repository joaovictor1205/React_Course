import React, { useState } from 'react';
import { Button, Form, Jumbotron, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import Tarefa from '../models/tarefa.model';

function CadastrarTarefas(){

    const [tarefa, setTarefa] = useState('');
    const [formValidado, setFormValidado] = useState(false);
    const [exibirModal, setExibirModal] = useState(false);

    function cadastrar(event){
        event.preventDefault();
        setFormValidado(true);
        if(event.currentTarget.checkValidity() === true){
            const tarefasDB = localStorage['tarefas'];
            const tarefas = tarefasDB ? JSON.parse(tarefasDB) : [];

            tarefas.push(new Tarefa(new Date().getTime(), tarefa, false));
            localStorage['tarefas'] = JSON.stringify(tarefas);
            setExibirModal(true);
        }
    }

    function handleTxtTarefa(event){
        setTarefa(event.target.value);
    }

    function handleFecharModal(){
        navigate('/');
    }

    return (
        <div>
            <h3 className="text-center"> Cadastrar Tarefas </h3>
            <Jumbotron>
                <Form
                    validated={formValidado}
                    noValidate
                    onSubmit={cadastrar} >
                    <Form.Group>
                        <Form.Label> Tarefa </Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Nome da tarefa"
                            minLength="5"
                            maxLength="100"
                            required
                            value={tarefa}
                            onChange={handleTxtTarefa}
                            data-testid="txt-tarefa" />
                        <Form.Control.Feedback type="invalid">
                            Atenção! Digite pelo menos 3 caracteres para o nome.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="text-center">
                        <Button
                            variant="success"
                            type="submit"
                            style={ {marginRight: "5px"} }
                            data-testid="btn-cadastrar">
                            Cadastrar
                        </Button>
                        <A href="/" className="btn btn-primary">
                            Voltar
                        </A>
                    </Form.Group>
                </Form>

                <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title> Sucesso </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tarefa criada com sucesso!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="success"
                            onClick={handleFecharModal}>
                            Continuar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Jumbotron>
        </div>
    );

};

export default CadastrarTarefas;
