from http.server import BaseHTTPRequestHandler, HTTPServer
import os


HOST = "127.0.0.1"
PORT = int(os.environ.get("PORT", "8000"))
APP_NAME = "Verum Node local app"


class AppHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path != "/":
            self.send_error(404, "Not Found")
            return

        body = (
            f"{APP_NAME} is running.\n"
            "Open README.md for project details.\n"
        ).encode("utf-8")

        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

def main():
    server = HTTPServer((HOST, PORT), AppHandler)
    print(f"Starting {APP_NAME} on http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print(f"\nStopping {APP_NAME}.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
