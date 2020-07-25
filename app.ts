class Department {
    private emp: string[]  = [];
    constructor(private readonly id: string, private name: string) {
    }

    describe() {
        console.log(`Dept ${this.id} : ${this.name}`);
    }
    addEmployee(employee: string) {
        this.emp.push(employee);
    }
}

class ITDepartment extends Department {
    private static instance: ITDepartment;
    private admins: string[];
    private constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }
    static getInstance() {
        if(this.instance) {
            return this.instance;
        }
        this.instance = new ITDepartment('d1', ['Manu']);
        return this.instance;
    }
}

class AccountingDept extends Department {
    private lastReport: string;
    
    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[reports.length - 1];
    }

    get recentReport() {
        if(this.lastReport) {
            return this.lastReport;
        }
        throw new Error("Report not found");
    }

    set recentReport(value: string) {
        if(!value) {
            throw new Error("Please set a valid value");
        }
        this.addReport(value);
    }

    addReport(report: string) {
        this.reports.push(report);    
        this.lastReport = this.reports[this.reports.length - 1];
    }

    printReport() {
        console.log("ALL reports",  this.reports);
    }
}

const it = ITDepartment.getInstance();
console.log("ITDepartment dept => ", it);


const accounts = new AccountingDept('d2', ['Report 1', 'Report 2']);
accounts.addReport("Something went wrong");
accounts.recentReport = "New Report";
accounts.printReport();
console.log(accounts.recentReport);
