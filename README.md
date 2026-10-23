# Jenkins CI/CD Pipeline with Docker

A DevOps internship project demonstrating automated application testing, Docker image building, and deployment using Jenkins.

## Objective

Create a Jenkins pipeline that automates the build, test, and deployment process for a Node.js application.

## Technology Stack

- Node.js and Express.js
- Jenkins
- Docker and Docker-in-Docker
- Git and GitHub
- Jenkins Declarative Pipeline

## Application Routes

| Method | Path | Expected response |
|---|---|---|
| GET | `/` | `Hello! My DevOps CI/CD pipeline is working.` |
| GET | `/health` | `{"status":"healthy"}` |

## Pipeline Stages

1. **Checkout:** Fetch the application source code from GitHub.
2. **Test:** Install dependencies and run automated tests.
3. **Build:** Create a Docker image for the application.
4. **Deploy:** Start the application container and verify its health endpoint.

The pipeline is defined in the root-level `Jenkinsfile`.

## Run Locally

### Install dependencies

```bash
npm ci
```

### Run tests

```bash
npm test
```

### Build the Docker image

```bash
docker build -t nodejs-jenkins-app .
```

### Run the application

```bash
docker run -d --name nodejs-jenkins-app -p 3001:3000 nodejs-jenkins-app
```

The last command assumes the image has already been built. Port `3001` is used on the host to avoid the port used in the earlier internship task.

## Jenkins Configuration

- **Job:** `nodejs-jenkins-cicd`
- **Repository:** https://github.com/Omsaigulhane/nodejs-jenkins-cicd
- **Branch:** `main`
- **Pipeline definition:** Pipeline script from SCM
- **Script path:** `Jenkinsfile`
- **Trigger:** SCM polling

## Verification Results

The first successful Jenkins pipeline execution confirmed:

- Automated tests: 3 passed, 0 failed
- Docker image: `nodejs-jenkins-app:3` built successfully
- Deployment: Application container started successfully
- Health check: `{"status":"healthy"}`
- Final pipeline status: `SUCCESS`

## Repository Structure

```text
.
├── tests/
│   └── app.test.js
├── app.js
├── Dockerfile
├── .dockerignore
├── .gitignore
├── package.json
├── package-lock.json
├── Jenkinsfile
└── README.md
```

## Repository

https://github.com/Omsaigulhane/nodejs-jenkins-cicd

**DevOps Internship — Task 2: Create a Simple Jenkins Pipeline for CI/CD**
