# 📬 Mailer Service — Async Email Sender with S3 & RabbitMQ

A scalable and flexible microservice for handling email delivery using pre-uploaded HTML templates and attachments via MinIO. Built with NestJS, RabbitMQ, Docker, and Mustache for templating.

## 🧠 Features

- 📨 **Async Email Queueing** via RabbitMQ
- 🧰 **S3-powered Templates & Attachments**
- 🗃️ **DB-powered Templates**
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

> The service includes two containers: `mailer-api` and `mailer-worker`.

---

## 📦 API Endpoints

### `POST /api/mailer/send`

Send an email:
##### you can send an email with a `pre-uploaded HTML template` OR `plain text content`, and attachments.
##### You can also use Mustache syntax for dynamic content in the HTML template or in plain text.
##### If both `emailTemplateS3Path` and `emailTemplatePlain` are provided, the Plain Text template will be used.
##### there is an option to delete attachments after sending the email, by default it is set to `true`.
### Body:

```json
{
  "to": "user@example.com",
  "subject": "Welcome!",
  "emailTemplateS3Path": "templates/welcome.html",
  "emailTemplatePlain": "Welcome to our service {{name}!",
  "emailTemplateData": {
    "name": "Tony"
  },
  "fromName": "Mailer Service",
  "deleteAttachmentsAfterSending": true,
  "attachments": [
    "mail-attachments/invoice_123.pdf"
  ]
}
```

---

### `POST /api/mailer/upload/attachments`

Upload one or more files to S3 for use in future emails.

#### FormData:

```
files: [File, File, ...]
```

#### Response:

```json
[
  "attachments/file1.pdf",
  "attachments/file2.png"
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

### ☁️ S3
| Variable                      | Description                                 |
|-------------------------------|---------------------------------------------|
| `S3_ENDPOINT`                 | S3 host (e.g., `http://localhost`)          |
| `S3_PORT`                     | S3 port (typically `9000`)                  |
| `S3_ACCESS_KEY`               | S3 access key                               |
| `S3_SECRET_KEY`               | S3 secret key                               |
| `S3_EMAIL_TEMPLATES_BUCKET`   | Bucket name containing email HTML templates |
| `S3_EMAIL_ATTACHMENTS_BUCKET` | Bucket name for email attachments           |

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

### 🌐 Db
| Variable           | Description                                                                                                  |
|--------------------|--------------------------------------------------------------------------------------------------------------|
| `DATABASE_URL`     | Database url for postgresql like in [prisma](https://www.prisma.io/docs/orm/reference/connection-urls) style |

If you want to use other database types, such as `MySQL` or `MSSQL`, you can change the provider in the `prisma/schema.prisma` to match your database type and update the `DATABASE_URL` accordingly.
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
