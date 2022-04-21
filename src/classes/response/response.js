export default  class ResponseForm {
    isSuccess;
    message;
    result;

    constructor(message, result) {
        this.message = message;
        this.result = result;
    }

}