# School Management Panel Development Documentation

This document outlines the development process and information related to the School Management Panel project, a software solution primarily focused on student events and participation. The software awards points to students based on their participation in events, and at the end of each quarter, the highest pointed student and four random students from different grade levels receive prizes based on their accumulated points.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Software Functionality](#software-functionality)
  - [Login / User Authentication](#login--user-authentication)
  - [Events](#events)
  - [Teacher Panel](#teacher-panel)
  - [Student Management](#student-management)
  - [Teacher Management](#teacher-management)
  - [Admin Management](#admin-management)

## Technologies Used

The following technologies have been employed in this project:

**Languages:**
- Python for database management
- JavaScript for events and communication
- HTML for design

**Libraries and Packages:**
- Eel: for communication between Python and frontend
- bcrypt: for hashing and salting passwords
- jQuery: for more efficient JavaScript code
- Tailwind CSS: for easier design and assembly

**Database:**
- MongoDB: chosen for its effectiveness and usability, including built-in database encryption and IP-based authorization

## Software Functionality

### Login / User Authentication

Authorized personnel can log in to the application using their email and password. Passwords are hashed and salted using bcrypt to ensure user security and software integrity. The application verifies user authorization before providing access to different panels.

### Events

Admins can create events and add attendees, awarding points to students who attend the events.

### Teacher Panel

Teachers can perform the following actions within their class:

- Add absences
- Add grades
- Add referrals to selected students

### Student Management

Admins can perform the following actions related to students:

- Add students
- Add students to classes
- Remove students from classes

### Teacher Management

Admins can perform the following actions related to teachers:

- Add teachers
- Assign break days for teachers

### Admin Management

Managers can perform the following actions related to admins:

- Add admins
- Assign break days for admins

# Installation Guide

This guide provides instructions on how to set up the School Management Panel project on your local machine.

## Step 1: Clone the Repository

Clone the School Management Panel project repository from GitHub to your local machine:

## Step 2: Install the following python libraries

- pip install bcrypt
- pip install eel
- pip install pymongo

## Step 3: Run main.py

