"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.emp = [];
    }
    describe() {
        console.log(`Dept ${this.id} : ${this.name}`);
    }
    addEmployee(employee) {
        this.emp.push(employee);
    }
}
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ITDepartment('d1', ['Manu']);
        return this.instance;
    }
}
class AccountingDept extends Department {
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[reports.length - 1];
    }
    get recentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("Report not found");
    }
    set recentReport(value) {
        if (!value) {
            throw new Error("Please set a valid value");
        }
        this.addReport(value);
    }
    addReport(report) {
        this.reports.push(report);
        this.lastReport = this.reports[this.reports.length - 1];
    }
    printReport() {
        console.log("ALL reports", this.reports);
    }
}
const it = ITDepartment.getInstance();
console.log("ITDepartment dept => ", it);
const accounts = new AccountingDept('d2', ['Report 1', 'Report 2']);
accounts.addReport("Something went wrong");
accounts.recentReport = "New Report";
accounts.printReport();
console.log(accounts.recentReport);
//# sourceMappingURL=app.js.map