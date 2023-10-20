# Pulse

A simple tool for project managers to handle reports from different projects. You can simply upload users using a CSV file, and then an email will be sent to each respective user with a link for them to set up their account.
You can create projects with a start and end date, set the frequency of reports, and assign specific users to each or multiple projects. Project managers have a dashboard where they can view all reports that have been sent in, and so do team members, but they see which reports they need to do and when the due date is on those reports.

## Installation

### Prerequisites

- Linux/WSL
- Node >(Version 18.16.0)
- npm >(version 9.5.1)

### Clone the Repository

```bash
git clone https://github.com/Miyarima/pulse
```

### Install Dependencies

```bash
npm install
```

### Start the Server

```bash
npm run start
```
<br>
The server will be accessible at http://localhost:1337.

## Format

The CSV file should be in this format:

```
firstname,lastname,employeeid,address,number,email,role
john,doe,56,moon,555-555-666,test@email.com.se,user
...
```
