interface Lengthy {
    length: number;
}
function countAndDesc<T extends Lengthy>(element: T): [T, string] {
    let descText = 'Got no value';
    if(element.length === 1) {
        descText = 'Got 1 value';
    }
    else if( element.length > 1 ) {
        descText = `Got ${element.length} values`;
    }
    return [element, descText];
}

console.log(countAndDesc('Hi there !'));

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];
    
    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if(this.data.indexOf(item) !== -1) {
            this.data.splice(this.data.indexOf(item),1);
        }
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Kumar');
textStorage.addItem('Parth');

console.log(textStorage.getItems());

//const objStorage  = new DataStorage<object>();
//objStorage.addItem({name: 'Kumar'});
//objStorage.addItem({name: 'Parth'});
//objStorage.removeItem({name: 'Parth'});
//console.log(objStorage.getItems());
