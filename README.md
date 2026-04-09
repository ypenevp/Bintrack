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

## Updates

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST`   | `/updates/createupdate` | Add a update with GPS coordinates and speed. |
| `GET`    | `/updates/getall` | Get all update from DB. |
| `GET`    | `/updates/getupdate/{id}` | Get a single update by ID. |
| `PATCH`  | `/updates/updateupdate/{id}` | Update update parameters. |
| `DELETE` | `/updates/deleteupdate/{id}` | Delete a updates by ID. |

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

### Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| `PATCH` | `/admin/users/role` | Update user's role . |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Firmware** | C++ (Arduino framework), ESP32 S3 |
| **Sensors** | NEO-6M GPS, SIM800L GSM, MPU6050, VL53L0X |
| **Display** | SSD1306 OLED display |
| **Backend** | Spring Boot |
| **Database** | PostgreSQL |
| **Authentication** | JWT |
| **Frontend** | React Native (Expo) |
| **Build tools** | Maven, PlatformIO |

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

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
