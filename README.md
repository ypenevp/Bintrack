# Bintrack
> Real-time bin monitoring with IoT sensors, GPS tracking and optimized routing

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
- Waste collectors don’t know when bins are full.
- Bins can overflow or be emptied too early.
- Companies lack real-time location and status of bins.
- Collection routes are inefficient and waste fuel.
- No easy navigation to bins that need emptying.
- Limited updates and monitoring in the application.

---

**Our solution:**

- Smart sensors track how full each bin is.
- Real-time location and status of every bin.
- Optimized navigation to bins that need emptying.
- Reduces unnecessary routes and fuel use.
- App provides updates and system monitoring.

---

## Features

### Core Features
- Real-time bin fill-level monitoring via VL53L0X time-of-flight sensor.
- GPS tracking with live bin location updates via NEO-6M GPS module.
- GSM connectivity for remote data transmission using SIM800L module.
- OLED display on device showing current bin status and sensor readings.
- Movement and tilt detection via MPU6050 accelerometer/gyroscope.
- REST API backend for data ingestion, retrieval, and management.
- React Native mobile app with live map view and navigation to bins.
- Automated route optimization to prioritize full or near-full bins.

### Extra Features
- Full user authentication with email verification.
- JWT session management for secure API access.
- Role access with three roles: USER, WORKER, ADMIN.
- Admin panel for managing user roles and system configuration.
- News/updates with image.
- User profiles with customizable themes and role-specific fields.
- Phone number field restricted to ADMIN and WORKER roles only.

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
| `GET`  | `/auth/getall` | Get all authenticated users from DB. |

---

### User Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST`   | `/userprofile/createuserprofile` | Create a user profile. Requires JWT. Supports photo upload via multipart/form-data. |
| `GET`    | `/userprofile/getuserprofile/{id}` | Return a user profile by ID. |
| `PATCH`  | `/userprofile/updateuserprofile/{id}` | Update user profile fields by ID. |
| `DELETE` | `/userprofile/deleteuserprofile/{id}` | Delete a user profile by ID. |

---

### Bin

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/bins/get/{id}` | Return a single bin by its ID, including location and fill-level data. |
| `GET` | `/bins/get/all` | Return all bins from the database with their current status. |

---

### Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| `PATCH` | `/admin/users/role` | Update user's role. |

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
- Push notifications to workers when a bin exceeds a fill threshold.
- Historical fill-level analytics and reporting dashboard.
- Integration with third-party mapping APIs for advanced route optimization.
- Machine learning model to predict fill rates and schedule collections.
- Web admin dashboard in addition to the mobile app.

---

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
