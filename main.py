from http.server import BaseHTTPRequestHandler, HTTPServer
import os


HOST = "127.0.0.1"
PORT = int(os.environ.get("PORT", "8000"))


class AppHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        body = (
            "Verum Node local app is running.\n"
            "Open README.md for project details.\n"
        ).encode("utf-8")

        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        return


def main():
    server = HTTPServer((HOST, PORT), AppHandler)
    print(f"Starting Verum Node local app on http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping Verum Node local app.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
