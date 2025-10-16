import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import AddActForm from "./CreateUpdateActForm";
// import icons from "../../../ui/icons";

type ActToUpdateType = {
    name: string
}

function UpdateAct({ actToUpdate }: { actToUpdate: ActToUpdateType }) {
    return (
        <Modal>
            <Modal.Open>
                <Button variation="tileTitle">{actToUpdate.name}</Button>
            </Modal.Open>
            <Modal.Window>
                <AddActForm actToUpdate={actToUpdate} />
            </Modal.Window>
        </Modal>
    );
}

export default UpdateAct;
