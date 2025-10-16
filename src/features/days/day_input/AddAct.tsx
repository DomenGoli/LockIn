import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import CreateUpdateActForm from "./CreateUpdateActForm";

function AddAct() {
    return (
        <Modal>
            <Modal.Open>
                <Button>Dodaj aktivnost</Button>
            </Modal.Open>
            <Modal.Window>
                <CreateUpdateActForm />
            </Modal.Window>
        </Modal>
    );
}

export default AddAct;
