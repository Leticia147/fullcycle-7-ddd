import EventInterface from "../event.interface";

export default class CustomerChangedAddressEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: any;
    constructor(eventData: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }
}