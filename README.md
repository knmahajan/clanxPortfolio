# Portfolio Tracking API

A portfolio tracking API that allows adding/deleting/updating trades and can do basic return calculations etc. The portfolio is essentially a collection of stocks, each stock having multiple trades (buy/sell). Each trade can have only one stock, a quantity and a date.


## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Base URL](#base-url)
  - [Endpoints](#endpoints)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Database](#database)

## Introduction

This is a portfolio tracking API that allows adding, deleting, and modifying trades for stocks within a portfolio. It also provides functionality to calculate average buying prices and cumulative returns.

## Getting Started

Instructions on how to set up and run the API locally.

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running locally.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/portfolio-tracking-api.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. Access the API endpoints using a tool like Postman or cURL.

## API Endpoints

List of all available API endpoints and their functionalities.

### Base URL:

The base URL for all API endpoints is `/portfolio`.

### Endpoints:

- `GET /`: Get the entire portfolio with trades.
- `GET /holdings`: Get holdings in an aggregate view.
- `GET /returns`: Get cumulative returns.
- `POST /addTrade`: Add a new trade.
- `POST /updateTrade`: Update an existing trade.
- `POST /removeTrade`: Remove a trade.

## Usage

Refer:
- [LinkText](Portfolio Management API Documentation.docx)

## Dependencies

- express: Web framework for Node.js
- mongoose: MongoDB object modeling tool
- body-parser: Middleware to parse request bodies

## Database

Refer:
- [LinkText](Database Documentation for Portfolio Management.docx)