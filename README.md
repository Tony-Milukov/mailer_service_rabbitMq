# 📬 Mailer Service — Async Email Sender with MinIO & RabbitMQ

A scalable and flexible microservice for handling email delivery using pre-uploaded HTML templates and attachments via MinIO. Built with NestJS, RabbitMQ, Docker, and Mustache for templating.

## 🧠 Features

- 📨 **Async Email Queueing** via RabbitMQ
- 🧰 **MinIO-powered Templates & Attachments**
- 🧠 **Mustache-based dynamic templating**
- 📂 Upload attachments via API
- 🚀 Dockerized & CI-ready

---

## 🚀 Quick Start

```bash
git clone https://github.com/Tony-Milukov/mailer_service_rabbitMq.git
cd mailer_service_rabbitMq
docker-compose up --build
```

> The service includes two containers: `producer` and `consumer`

---

## 📦 API Endpoints

### `POST /api/mailer/send`

Send an email using a MinIO-hosted template and optional attachments.

#### Body:

```json
{
  "to": "user@example.com",
  "subject": "Welcome!",
  "emailTemplate": "templates/welcome.html",
  "emailTemplateData": {
    "name": "Tony"
  },
  "fromName": "Mailer Service",
  "attachments": [
    "mail-attachments/invoice_123.pdf"
  ]
}
```

---

### `POST /api/mailer/upload/attachments`

Upload one or more files to MinIO for use in future emails.

#### FormData:

```
files: [File, File, ...]
```

#### Response:

```json
[
  "http://minio.local/attachments/file1.pdf",
  "http://minio.local/attachments/file2.png"
]
```

---

## 📦 Environment Variables

The project relies on the following environment variables (e.g., using a `.env` file):

### 🔗 RabbitMQ
| Variable           | Description                                 |
|--------------------|---------------------------------------------|
| `RABBIT_MQ_URL`    | Full RabbitMQ connection URL                |
| `RABBIT_MQ_QUEUE`  | Queue name to consume email messages from   |

### ☁️ MinIO
| Variable                          | Description                                 |
|-----------------------------------|---------------------------------------------|
| `MINIO_HOST`                      | MinIO host (e.g., `http://localhost`)       |
| `MINIO_PORT`                      | MinIO port (typically `9000`)               |
| `MINIO_ACCESS_KEY`               | MinIO access key                            |
| `MINIO_SECRET_KEY`               | MinIO secret key                            |
| `MINIO_EMAIL_TEMPLATES_BUCKET`   | Bucket name containing email HTML templates |
| `MINIO_EMAIL_ATTACHMENTS_BUCKET` | Bucket name for email attachments           |

### ✉️ SMTP (Email)
| Variable            | Description                                 |
|---------------------|---------------------------------------------|
| `SMTP_HOST`         | SMTP server (e.g., `smtp.gmail.com`)        |
| `SMTP_PORT`         | SMTP port (`587` or `465`)                  |
| `SMTP_USER`         | SMTP username                               |
| `SMTP_TOKEN`        | SMTP password or app-specific token         |
| `SMTP_MAIL_ADDRESS` | Sender's email address                      |
| `SMTP_SECURE`       | `true` or `false` for SSL/TLS connection    |

### 🌐 Misc
| Variable | Description                     |
|----------|---------------------------------|
| `PORT`   | Port where the service runs     |


## 📁 Folder Structure (Simplified)

```
mailer_service/
│
├── mailer-api/              # API to accept send/upload requests
├── mailer-worker/              # Worker for processing emails
├── docker-compose.yml
├── README.md
```

---

## 👨‍💻 Author

**Tony Milukov**  
[GitHub](https://github.com/Tony-Milukov)
## 📄 License

MIT — do what you want.
