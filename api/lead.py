"""
POST /api/lead

Captures an email from the eligibility checker (or any other lead-gen point
on the site) along with the answers given and the computed result, so a
preparer can follow up. Requires DATABASE_URL (a Neon Postgres connection
string) to be set as an environment variable.
"""

import json
import os
import re
from http.server import BaseHTTPRequestHandler

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def insert_lead(email, phone, source, answers, result):
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        raise RuntimeError(
            "DATABASE_URL is not set. Add a Neon Postgres connection string as an "
            "environment variable (see .env.example)."
        )

    import psycopg2  # imported lazily so the module still loads without the dep during local UI work

    conn = psycopg2.connect(database_url)
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO leads (email, phone, source, answers, result)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (email, phone, source, json.dumps(answers), json.dumps(result)),
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

            email = (body.get("email") or "").strip()
            if not EMAIL_RE.match(email):
                self._send(400, {"error": "A valid email address is required."})
                return

            insert_lead(
                email=email,
                phone=(body.get("phone") or "").strip() or None,
                source=body.get("source") or "eligibility-checker",
                answers=body.get("answers") or {},
                result=body.get("result") or {},
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
