"use strict";
const e1 = {
    name: "Kumar",
    privileges: ['Mad'],
    startDate: new Date()
};
console.log(e1);
function printEmpDetails(e) {
    if ('privileges' in e) {
        console.log("Privileges in emp : ", e.privileges);
    }
    if ('startDate' in e) {
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
    loadCargo(n) {
        console.log("Loading Cargo Amount.. ", n);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(v) {
    if (v instanceof Truck) {
        v.loadCargo(1000);
    }
}
useVehicle(v2);
const errorBag = {
    email: "Invalid email address",
    username: "First character must be a letter"
};
function add(a, b) {
    if (typeof a === 'string' && typeof b === 'string') {
        return a.toString() + b.toString();
    }
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
}
console.log(add(1, 2));
//# sourceMappingURL=advanced.js.map