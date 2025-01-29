import Address from "./address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validade();
    }

    validade() {
        if (this._id.length  === 0) {
            throw new Error('Id is required');
        }
        if (this._name.length === 0) {
            throw new Error('Name is required');
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validade();
    }

    activate() {
        if(this._address === undefined) {
            throw new Error('Address is required');
        }
        this._active = true;
    }

    deactive() {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }

    deactivate() {
        this._active = false;
    }
    
    set Address(address: Address) {
        this._address = address;
    }
    get name (): string { return this._name; }

}