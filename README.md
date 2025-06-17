# 📬 Mailer Service — Async Email Sender with S3 & RabbitMQ

A scalable and flexible microservice for handling email delivery using pre-uploaded HTML templates and attachments via MinIO. Built with NestJS, RabbitMQ, Docker, and Mustache for templating.

## 🧠 Features

- 📨 **Async Email Queueing** via RabbitMQ
- 🧰 **S3-powered Templates & Attachments**
- 🗃️ **DB-powered Templates**
- 🧠 **Mustache-based dynamic templating**
- 📂 Upload attachments via API
- 🚀 Dockerized & CI-ready
- 🔒 JWT authentication for secure API access, `Bearer token` required

---

## 🚀 Quick Start

```bash
git clone https://github.com/Tony-Milukov/mailer_service_rabbitMq.git
cd mailer_service_rabbitMq
fill .env with your environment variables
docker-compose up --build
```

> The service includes two containers: `mailer-api` and `mailer-worker`.

---

## 📦 Swagger Api
The API documentation is available at:
``` http(s)://[APP]:[PORT]/api/docs```


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