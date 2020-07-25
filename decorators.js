"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger(message) {
    return function (constructor) {
        console.log(message);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    return function (OrignalConstructor) {
        return class extends OrignalConstructor {
            constructor(...args) {
                super();
                const hookEl = document.getElementById(hookId);
                const p = new OrignalConstructor();
                console.log(hookEl);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').innerHTML = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = 'Max';
        console.log('Create a new person');
    }
};
Person = __decorate([
    Logger('Logging Person'),
    WithTemplate('<h1>Dummy name</h1>', 'app')
], Person);
const per = new Person();
function Autolink(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = 'This works!';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autolink
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector('button');
button.addEventListener('click', p.showMessage);
const registeredValidators = {};
function Required(target, property) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [property]: ['required'] });
}
function PositiveNumber(target, property) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [property]: ['positive'] });
}
function validate(obj) {
    const objValidator = registeredValidators[obj.constructor.name];
    let isValid = true;
    for (let prop in objValidator) {
        for (let validator of objValidator[prop]) {
            switch (validator) {
                case 'required':
                    isValid = !!obj[prop] && isValid;
                    break;
                case 'positive':
                    isValid = obj[prop] > 0 && isValid;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const courseObj = new Course(title, price);
    if (!validate(courseObj)) {
        alert("Invalid values provided. Please try again.");
    }
    console.log(courseObj);
});
//# sourceMappingURL=decorators.js.map