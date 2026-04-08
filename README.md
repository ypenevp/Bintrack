# Bintrack
> 

---

## Table of Contents
- [Introduction](#-introduction)
- [Features](#-features)
- [API Documentation](#-api-documentation)
- [Hardware Schematics](#-schematic)
- [Tech Stack](#-tech-stack)
- [Installation Guide](#-installation-guide)
- [Usage](#-usage)
- [Future Improvements](#-future-improvements)

---

## Introduction

**The problem:**
- 

**Our solution:**

---

## Features

### Core Features
- 

### Extra Features
- User authentication.
- 

---
## Schematic

---


## API Documentation

Base URL: `http://localhost:7070/api`

---

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register user with email, username, phone, password and default role - user |
| `POST` | `/auth/verify` | Verify user with a code sent to their email. |
| `POST` | `/auth/login` | Login a verified user with email and password. |
| `GET`  | `/auth/me` | Get the currently authenticated user. |
| `GET`  | `/auth/getallusers` | Get all authenticated users from DB. |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|

---

## Installation Guide

### Prerequisites
- Java 25+
- Maven 3.9+
- PostgreSQL
- PlatformIO
- Node.js 24+ (for mobile app)

---

## Future Improvements
- 

---
