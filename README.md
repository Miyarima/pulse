# Pulse

A simple tool for project managers to handle reports from different projects. You can simply upload users using a CSV file, and then an email will be sent to each respective user with a link for them to set up their account.
You can create projects with a start and end date, set the frequency of reports, and assign specific users to each or multiple projects. Project managers have a dashboard where they can view all reports that have been sent in, and so do team members, but they see which reports they need to do and when the due date is on those reports.

## Usage

Open a terminal and move to a folder where you would like to store the cloned repo. In the terminal, type `git clone https://github.com/Miyarima/pulse`.

First run `npm install` to install all dependencies.

Lastly, type `npm run start` to start the server, and you'll be able to reach it on `http://localhost:1337`.

## Format

The CSV file should be in this format:

```
firstname,lastname,employeeid,address,number,email,role
jonathan,göransson,56,moon,555-555-666,jogo19@student.bth.se,user
```
