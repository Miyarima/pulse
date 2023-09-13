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
    role TEXT NOT NULL
);

-- Create the projects table
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_name TEXT NOT NULL,
    employeeid INTEGER NOT NULL,
    FOREIGN KEY (employeeid) REFERENCES users(employeeid)
);

-- Create the reports table
CREATE TABLE reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
    report_text TEXT NOT NULL,
    report_date DATE NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (employee_id) REFERENCES users(employeeid)
);

-- TEST DATA
INSERT INTO users (firstname, lastname, employeeid, address, number, email, password, role)
VALUES
    ('Admin', 'User', 1, '789 Oak St', '555-111-2222', 'admin@example.com', '$2b$10$xA4HOn.hqQu2lY6uvMbjHuYO8bb6ESYBvizuwyHEquW/nQJFLJQLa', 'admin');

-- Insert sample data into the projects table
INSERT INTO projects (project_name, employeeid)
VALUES
    ('Project A', 15),
    ('Project B', 16);

-- Insert sample data into the reports table
INSERT INTO reports (project_id, employee_id, report_text, report_date)
VALUES
    (1, 15, 'Report 1 for Project A', '2023-09-13'),
    (1, 16, 'Report 2 for Project A', '2023-09-14'),
    (2, 15, 'Report 1 for Project B', '2023-09-15');
