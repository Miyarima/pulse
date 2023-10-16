-- Drop tables if they exist
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    employeeid INTEGER NOT NULL,
    address TEXT,
    number TEXT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    first TEXT
);

-- Create the projects table
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_name TEXT NOT NULL,
    employeeid INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (employeeid) REFERENCES users(employeeid)
);

-- Create the reports table
CREATE TABLE reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
    report_text TEXT NOT NULL,
    report_date DATE NOT NULL,
    report_updated DATE,
    report_marked TEXT "no",
    report_comment TEXT "",
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (employee_id) REFERENCES users(employeeid)
);

-- TEST DATA
INSERT INTO users (firstname, lastname, employeeid, address, number, email, password, role, first)
VALUES
    ('boss', 'man', 1, '789 Oak St', '555-111-2222', 'admin@example.com', '$2b$10$xA4HOn.hqQu2lY6uvMbjHuYO8bb6ESYBvizuwyHEquW/nQJFLJQLa', 'admin', '');
