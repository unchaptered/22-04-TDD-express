import ResponseForm from "./response";

export default class BadResponseForm extends ResponseForm {
    constructor(message, result) {
        super(message, result);

        this.isSuccess = false;
    }
}