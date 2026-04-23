import unittest
from fastapi.testclient import TestClient
from orchestrator import app

class TestCors(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_cors_allowed_origin(self):
        headers = {
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "GET"
        }
        response = self.client.options("/system/status", headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers.get("access-control-allow-origin"), "http://localhost:5173")

    def test_cors_disallowed_origin(self):
        headers = {
            "Origin": "http://evil.com",
            "Access-Control-Request-Method": "GET"
        }
        response = self.client.options("/system/status", headers=headers)
        self.assertEqual(response.status_code, 400) # fast api cors middleware returns 400 for disallowed origins

if __name__ == '__main__':
    unittest.main()
