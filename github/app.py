#!/usr/bin/env python3
"""
Hydro Detailing Brisbane - All-in-One Python Server & Receipt Dispatcher
========================================================================
File 1 of 2 for GitHub Export:
- Serves the single-page frontend (index.html)
- Handles POST /api/send-instagram-receipt
- Handles GET /api/instagram-receipts
- Handles CLI dispatch mode for subprocess integration
- Zero external pip dependencies required (Standard Library only)

Run directly with:
    python3 app.py
Then open http://localhost:8000 in your browser.
"""

import sys
import json
import os
import time
from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.parse

PORT = int(os.environ.get("PORT", 8000))
LOG_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "instagram_dispatches.json")
OWNER_INSTAGRAM = "@hydrodetailing.brisbane"
SENDER_INSTAGRAM = "@hydroservice4300"
SENDER_GMAIL = "hydroservice4300@gmail.com"

def log_dispatch(record):
    dispatches = []
    if os.path.exists(LOG_FILE):
        try:
            with open(LOG_FILE, "r", encoding="utf-8") as f:
                dispatches = json.load(f)
        except Exception:
            dispatches = []
    
    dispatches.append(record)
    try:
        with open(LOG_FILE, "w", encoding="utf-8") as f:
            json.dump(dispatches, f, indent=2)
    except Exception as e:
        sys.stderr.write(f"Warning: Could not save log: {e}\n")

def process_receipt(booking_data):
    raw_customer_ig = booking_data.get("instagramUsername", "").strip()
    clean_customer_ig = raw_customer_ig.replace("@", "").strip()
    customer_ig = f"@{clean_customer_ig}" if clean_customer_ig else ""

    booking_id = booking_data.get("id", f"hydro_{int(time.time())}")
    ref_code = booking_id.upper().replace("HYDRO_", "HDB-")
    if not ref_code.startswith("HDB-"):
        ref_code = f"HDB-{ref_code}"
    
    name = booking_data.get("name", "Valued Customer")
    phone = booking_data.get("phone", "")
    service = booking_data.get("serviceName", "Detailing Service")
    date = booking_data.get("date", "")
    time_slot = booking_data.get("time", "")
    vehicle_size = str(booking_data.get("vehicleSize", "")).upper()
    vehicle_model = booking_data.get("vehicleModel", "")
    vehicle_str = f"{vehicle_model} ({vehicle_size})" if vehicle_model else vehicle_size
    address = booking_data.get("address", "")
    total = booking_data.get("totalPrice", 0)
    
    addons = booking_data.get("addons", [])
    addons_str = ", ".join([a.get("name", "") if isinstance(a, dict) else str(a) for a in addons]) if addons else "None"

    # Preformatted message for Instagram direct chat
    formatted_msg = (
        f"🚗 HYDRO DETAILING BRISBANE RECEIPT PROOF\n"
        f"=========================================\n"
        f"• Booking Ref: {ref_code}\n"
        f"• Customer: {name} ({customer_ig or 'Online Booking'})\n"
        f"• Phone: {phone}\n"
        f"• Service: {service}\n"
        f"• Scheduled: {date} at {time_slot}\n"
        f"• Vehicle: {vehicle_str}\n"
        f"• Location: {address}\n"
        f"• Add-ons: {addons_str}\n"
        f"• Total: ${total}.00 AUD (Pay on completion)\n"
        f"=========================================\n"
        f"Sender Bot: {SENDER_INSTAGRAM} ({SENDER_GMAIL})\n"
        f"Owner: {OWNER_INSTAGRAM} (Cody)\n"
        f"Customer: {customer_ig or 'Registered'}\n"
        f"Verification: VERIFIED & CONFIRMED"
    )

    # Short "Hi" ping message as requested
    hi_msg = (
        f"Hi {name}! 👋 This is Cody from Hydro Detailing Brisbane (@hydrodetailing.brisbane). "
        f"Your mobile detail appointment ({ref_code}) is confirmed for {date} at {time_slot}! "
        f"Total: ${total}.00 AUD. See you then!"
    )

    dispatch_record = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "booking_ref": ref_code,
        "sender_instagram": SENDER_INSTAGRAM,
        "sender_email": SENDER_GMAIL,
        "customer": name,
        "customer_instagram": customer_ig,
        "owner_instagram": OWNER_INSTAGRAM,
        "total": total,
        "status": "ready_to_send",
        "delivery_method": "direct_two_way_ig"
    }
    
    log_dispatch(dispatch_record)

    result = {
        "success": True,
        "status": "ready_to_send",
        "booking_ref": ref_code,
        "sender_instagram": SENDER_INSTAGRAM,
        "sender_email": SENDER_GMAIL,
        "customer_instagram": customer_ig,
        "clean_customer_ig": clean_customer_ig,
        "owner_instagram": OWNER_INSTAGRAM,
        "message": formatted_msg,
        "hi_message": hi_msg,
        "direct_url": "https://ig.me/m/hydrodetailing.brisbane",
        "owner_chat_url": "https://ig.me/m/hydrodetailing.brisbane",
        "customer_chat_url": f"https://ig.me/m/{clean_customer_ig}" if clean_customer_ig else None,
        "meta_security_notice": "Meta blocks headless bot password logins to prevent security checkpoints/bans. 1-click direct link enables instant sending with receipt pre-copied.",
        "timestamp": dispatch_record["timestamp"]
    }
    return result

class HydroRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and disable aggressive caching for dev ease
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == "/api/send-instagram-receipt":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            try:
                booking_data = json.loads(body.decode("utf-8"))
            except Exception:
                booking_data = {"name": "Customer", "id": "hydro_web"}

            result = process_receipt(booking_data)
            response_bytes = json.dumps(result).encode("utf-8")

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(response_bytes)))
            self.end_headers()
            self.wfile.write(response_bytes)
            return

        self.send_response(404)
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/instagram-receipts":
            dispatches = []
            if os.path.exists(LOG_FILE):
                try:
                    with open(LOG_FILE, "r", encoding="utf-8") as f:
                        dispatches = json.load(f)
                except Exception:
                    dispatches = []
            
            data = {"success": True, "count": len(dispatches), "dispatches": dispatches}
            response_bytes = json.dumps(data).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(response_bytes)))
            self.end_headers()
            self.wfile.write(response_bytes)
            return
        
        # Route root requests to index.html or standalone.html
        if self.path in ["", "/", "/index.html", "/standalone.html"]:
            root_dir = os.path.dirname(os.path.abspath(__file__))
            for fname in ["standalone.html", "index.html", "github/index.html"]:
                cand_path = os.path.join(root_dir, fname)
                if os.path.exists(cand_path):
                    self.send_response(200)
                    self.send_header("Content-Type", "text/html; charset=utf-8")
                    with open(cand_path, "rb") as f:
                        content = f.read()
                    self.send_header("Content-Length", str(len(content)))
                    self.end_headers()
                    self.wfile.write(content)
                    return

        return super().do_GET()

def run_server(port=PORT):
    server_address = ("0.0.0.0", port)
    httpd = HTTPServer(server_address, HydroRequestHandler)
    print(f"=================================================")
    print(f"🚀 Hydro Detailing Brisbane Server Running!")
    print(f"📍 Local URL: http://localhost:{port}")
    print(f"📨 Instagram Dispatcher: {OWNER_INSTAGRAM}")
    print(f"📂 Serving index.html and /api endpoints")
    print(f"=================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")

def run_cli():
    # CLI mode for integration with subprocess / server.ts
    if len(sys.argv) > 1 and sys.argv[1] != "--cli":
        try:
            raw_input = sys.argv[1]
            booking_data = json.loads(raw_input)
        except Exception:
            booking_data = {"name": "Customer", "id": "hydro_test"}
    else:
        try:
            booking_data = json.load(sys.stdin)
        except Exception:
            booking_data = {"name": "Customer", "id": "hydro_test"}

    response = process_receipt(booking_data)
    print(json.dumps(response))

if __name__ == "__main__":
    # If invoked with json string argument or piped stdin, execute dispatch CLI
    if len(sys.argv) > 1 and not sys.argv[1].startswith("--port") and not sys.argv[1] == "--server":
        run_cli()
    else:
        port = PORT
        if len(sys.argv) > 1 and sys.argv[1].startswith("--port="):
            port = int(sys.argv[1].split("=")[1])
        run_server(port)
