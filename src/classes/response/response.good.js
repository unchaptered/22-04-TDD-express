import ResponseForm from "./response";

export default class GoodResponseForm extends ResponseForm {
    constructor(message, result) {
        super(message, result);

        this.isSuccess = true;
    }
}