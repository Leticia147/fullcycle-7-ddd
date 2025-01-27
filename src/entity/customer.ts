import Address from "./address";

export default class Customer {
    _id: string;
    _name: string;
    _address!: Address;
    _active: boolean = true;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validade();
    }

    validade() {
        if (this._name === '') {
            throw new Error('Name is required');
        }

        if (this._id === '') {
            throw new Error('Id is required');
        }
    }

    changeName(name: string) {
        this._name = name;
    }

    activate() {
        if(this._address !== undefined) {
            throw new Error('Address is required');
        }
        this._active = true;
    }

    deactive() {
        this._active = false;
    }
    
    set Address(address: Address) {
        this._address = address;
    }
}