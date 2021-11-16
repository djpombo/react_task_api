import { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import Task from '../../Models/task.model';
import axios from 'axios';
import './styles.css';

const CadastrarTarefas = () => {

    const API_URL_CADASTRAR = 'http://localhost:3001/gerenciador-tarefas';

    const [task, setTask] = useState('');
    const [formValidated, setFormValidate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalErr, setShowModalErr] = useState(false);
    
    async function cadastrar(e) {

        e.preventDefault();
        setFormValidate(true);
        setTask(e.target.value);

        if (e.currentTarget.checkValidity() === true) {

            try {
                                            //id /tarefa /concluido
                const novaTarefa = new Task(null, task, false);//id é nullo pq eh gerado pela API usando UUID
                  

                await axios.post(API_URL_CADASTRAR, novaTarefa);
                setShowModal(true);

            }
            catch (error) {
                setShowModalErr(true);
               
            }
        }

    }

    function handleTxtTask(e) {
        setTask(e.target.value)
    }

    function closeModal(e) {
        setShowModal(false);
        navigate('/');
    }

    function closeModalErr(e) {
        setShowModalErr(false);
    }

    return (
        <div className="container">
            <h3 className="text-center">Cadastrar</h3>
            <div className="Jumbo">
                <Form
                    validated={formValidated}
                    noValidate
                    onSubmit={cadastrar}
                >
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="digite a tarefa"
                            minLength="5"
                            maxLength="100"
                            required
                            value={task}
                            onChange={handleTxtTask}
                            data-testid="txt-tarefa"
                        />
                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter no mínimo 5 caracteres
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="buttons text-center">
                        <Button
                            variant="success"
                            type="submit"
                            data-testid="btn-tarefa"
                        >
                            Cadastrar
                        </Button>
                        <A href='/' className="btn btn-light">Voltar</A>
                    </Form.Group>
                </Form>
                <Modal show={showModal} onHide={closeModal} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Tarefa adicionada com Sucesso!
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="success"
                            onClick={closeModal}
                        >Continuar</Button>
                    </Modal.Footer>

                </Modal>
                <Modal show={showModalErr} onHide={closeModalErr} data-testid="modal-err">
                    <Modal.Header closeButton>
                        <Modal.Title>Erro</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Erro ao adicionar tarefa! Tente novamente em instantes.
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="danger"
                            onClick={closeModalErr}
                        >Continuar</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        </div>
    )
}
export default CadastrarTarefas;