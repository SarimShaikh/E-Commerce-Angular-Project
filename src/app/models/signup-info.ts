export class SignUpInfo {
    userId: number;
    username: string;
    email: string;
    password: string;
    contact: string;
    isActive: number;
    role:string[];
 
    constructor(username: string, email: string, password: string, contact: string, ){
        this.username=username;
        this.email=email;
        this.password=password;
        this.contact=contact;
        this.role=['user'];
    }
    
}
