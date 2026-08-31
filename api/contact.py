"""
POST /api/contact

Stores a contact-form submission (name, email, phone, service interest,
message) in Postgres, so a preparer can follow up. Same DATABASE_URL as
/api/lead.py.
"""

import json
import os
import re
from http.server import BaseHTTPRequestHandler

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def insert_message(name, email, phone, service_interest, message):
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        raise RuntimeError(
            "DATABASE_URL is not set. Add a Neon Postgres connection string as an "
            "environment variable (see .env.example)."
        )

    import psycopg2

    conn = psycopg2.connect(database_url)
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO contact_messages (name, email, phone, service_interest, message)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (name, email, phone, service_interest, message),
            )
        conn.commit()
    finally:
        conn.close()


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            raw = self.rfile.read(length) if length else b"{}"
            body = json.loads(raw or b"{}")

            name = (body.get("name") or "").strip()
            email = (body.get("email") or "").strip()
            message = (body.get("message") or "").strip()

            if not name or not EMAIL_RE.match(email) or not message:
                self._send(400, {"error": "Name, a valid email, and a message are required."})
                return

            insert_message(
                name=name,
                email=email,
                phone=(body.get("phone") or "").strip() or None,
                service_interest=(body.get("serviceInterest") or "").strip() or None,
                message=message,
            )
            self._send(200, {"ok": True})
        except Exception as exc:  # noqa: BLE001
            self._send(500, {"error": str(exc)})

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors_headers()
        self.end_headers()

    def _send(self, status, payload):
        self.send_response(status)
        self._cors_headers()
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode("utf-8"))

    def _cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
