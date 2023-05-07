export class ErrorHandler extends Error{
    message: string;
    status: number;
    description: string;

    constructor(message: string, status: number = 500, additionalInfo?:string) {
        super();
        this.message = message;
        this.status = status;
        this.description =additionalInfo ?? "descripcion"
    }
}