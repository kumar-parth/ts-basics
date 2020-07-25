type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: "Kumar",
    privileges: ['Mad'],
    startDate: new Date()
};

console.log(e1);

type UnknownEmployee = Admin | Employee;

function printEmpDetails(e: UnknownEmployee) {
    if('privileges' in e) {
        console.log("Privileges in emp : ", e.privileges);
    }
    if('startDate' in e) {
        console.log("Start Date in emp : ", e.startDate);
    }
}

printEmpDetails(e1);

class Car {
    drive() {
        console.log("Driving  a car");
    }
}
class Truck {
    drive() {
        console.log("Driving a truck");
    }
    loadCargo(n: number) {
        console.log("Loading Cargo Amount.. ", n);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(v: Vehicle) {
    if(v instanceof Truck) {
        v.loadCargo(1000);
    }
}

useVehicle(v2);


interface ErrorContainer {
    [props: string]: string;
}

const errorBag: ErrorContainer = {
    email: "Invalid email address",
    username: "First character must be a letter"
};

type Combinable =  string | number;

function add(a: string, b:string): string;
function add(a: number, b: number): number;
function add(a: Combinable, b: Combinable) {
    if(typeof a === 'string' && typeof b === 'string') {
        return a.toString() + b.toString();
    }
    if(typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
}

console.log(add(1,2));

