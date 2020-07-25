function Logger(message: string) {
    return function (constructor: any) {
        console.log(message);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    return function <T extends { new(...args: any[]) : {name: string} }> (OrignalConstructor: T) { 
        return class extends OrignalConstructor {
            constructor(...args: any[]) {
                super();    
                const hookEl = document.getElementById(hookId);
                const p = new OrignalConstructor();
                console.log(hookEl);
                if(hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.innerHTML = this.name;
                }
            }
        } 
    }
}

@Logger('Logging Person')
@WithTemplate('<h1>Dummy name</h1>', 'app')
class Person {
    name: string = 'Max';
    constructor() {
        console.log('Create a new person');
    }
}

const per = new Person();

function Autolink(_: object, _2: string, descriptor: PropertyDescriptor) : any{
    const originalMethod = descriptor.value;
    const adjDescriptor : PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor;
}

class Printer {
    message =  'This works!';
    @Autolink
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();
const button = document.querySelector('button')!;

button.addEventListener('click', p.showMessage);


interface ValidatorConfig {
    [property: string] : {   // className: {properties: [validators]}
        [validatorProp: string] : string[]
    }  
}

const registeredValidators : ValidatorConfig  = {};

function Required(target: any, property: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [property]: ['required']
    };
}

function PositiveNumber(target: any, property: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [property]: ['positive']
    };
}

function validate(obj: any) : boolean {
    const objValidator = registeredValidators[obj.constructor.name]
    let isValid = true
    for(let prop in objValidator) {
        for(let validator of objValidator[prop]) {
            switch(validator) {
                case 'required':
                    isValid = !!obj[prop] && isValid
                break
                case 'positive':
                    isValid = obj[prop] > 0 && isValid
                break
            }
        }
    }
    return isValid
}


class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;
    const courseObj = new Course(title, price);
    if(!validate(courseObj)) {
        alert("Invalid values provided. Please try again.");
    }
    console.log(courseObj);
})