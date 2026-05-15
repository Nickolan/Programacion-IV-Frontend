export class Usuario {
    id: number;
    username: string;
    password: string; 
    rol: string;

    constructor(data: {
        id: number;
        username: string;
        password: string;
        rol: string;
    }) {
        this.id = data.id;
        this.username = data.username;
        this.password = data.password;
        this.rol = data.rol;
    }
}

/**
 id PK autonumerica
username: cadena
password: cadena
rol: cadena
 */