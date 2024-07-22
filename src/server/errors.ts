export class UserAlreadyRegistered extends Error {
    constructor() {
        super("User already registered",{
        })
        this.name = "UserAlreadyRegistered"
    }

    

} 