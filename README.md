# AIVOA — AI-Powered Customer Complaint Management System

An AI-powered customer complaint management system designed for pharmaceutical Quality Management Systems (QMS). The application helps convert raw customer complaints into structured complaint records and provides an AI-assisted risk assessment.

## Overview

The system provides a complaint intake workflow where a user can enter a raw customer complaint and use the AI Copilot to extract structured information.

The extracted information is displayed in the **Log Customer Complaint** form, while the AI Copilot provides a **Risk Assessment** including severity, risk level, rationale, and recommended action.

The backend also supports complaint processing through a FastAPI API and AI workflow.

## Key Features

* AI-assisted customer complaint extraction
* Structured complaint form auto-population
* Customer type classification
* Product and batch information extraction
* Complaint description extraction
* AI-based risk assessment
* Severity assessment
* Risk-level assessment
* Risk rationale generation
* Recommended action generation
* Editable complaint form
* React-based frontend
* Redux state management
* FastAPI backend
* LangGraph-based AI workflow
* PDF complaint processing through the backend API

## Technology Stack

### Frontend

* React
* TypeScript
* Redux
* Vite
* Tailwind CSS

### Backend

* Python
* FastAPI
* Pydantic
* LangGraph

### AI

* LLM-based complaint extraction
* AI-assisted risk assessment
* Structured AI response generation

## Project Structure

```text
AIVOA-Complaint-System/
│
├── backend/
│   ├── ai_graph.py
│   ├── create_env.py
│   ├── main.py
│   ├── requirements.txt
│   ├── schemas.py
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── services/
│       │   ├── store/
│       │   └── types/
│       ├── package.json
│       ├── index.html
│       └── vite.config.ts
│
└── README.md
```

## Application Workflow

```text
Customer Complaint
       ↓
Raw Complaint Input
       ↓
AI Copilot
       ↓
Complaint Information Extraction
       ↓
Log Customer Complaint
       ↓
AI Risk Assessment
       ↓
Severity + Risk Level + Rationale + Recommended Action
```

## Example Complaint

Example input:

> Apollo Pharmacy reported discoloration of Metformin 500 mg capsules from batch CHB260712A. The affected quantity is 50 capsules. The capsules appear different from the normal product appearance. Customer requested a quality investigation.

The system can extract structured information such as:

* Customer Name: Apollo Pharmacy
* Product: Metformin 500
* Batch Number: CHB260712A
* Complaint Type: Quality Issue — Discoloration
* Severity: Major
* Risk Level: High

## Backend API

The backend is implemented using FastAPI.

The complaint processing API can be accessed through the FastAPI Swagger interface when the backend is running locally.

Example local API documentation:

```text
http://127.0.0.1:8000/docs
```

The backend supports complaint/PDF processing and returns structured complaint information together with AI risk assessment results.

## Running the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a Python virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI application:

```bash
uvicorn main:app --reload
```

Then open:

```text
http://127.0.0.1:8000/docs
```

## Running the Frontend

Navigate to the frontend directory:

```bash
cd backend/frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Vite development server will provide the local frontend URL.

## AI Risk Assessment

The AI Copilot provides a risk assessment based on the complaint information.

The assessment includes:

* **Severity**
* **Risk Level**
* **Rationale**
* **Recommended Action**

For example, a complaint involving product discoloration may be assessed as a major/high-risk quality issue requiring further QA investigation.

## Purpose

This project was developed as a technical demonstration of how AI can assist pharmaceutical complaint intake and risk assessment workflows.

It is intended for research, demonstration, and evaluation purposes and does not replace qualified Quality Assurance, Pharmacovigilance, or regulatory decision-making.

## Author

**Sadaf Mughees**

AI Product Engineer / Data Analytics & AI

