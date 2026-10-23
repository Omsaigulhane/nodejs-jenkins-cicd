'use strict';

/**
 * Tests for app.js using Node.js built-in test runner (node:test) and
 * the built-in assert module. No external test framework is required.
 *
 * Compatible with Node.js >= 18.
 *
 * Run with:  node --test tests/app.test.js
 * Or via:   npm test
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('../app');

// Start the server on a random free port before running tests,
// then close it after all tests complete.
let server;
let baseUrl;

// Using test hooks via a wrapper test suite
test('App route tests', async (t) => {
  // --- Setup: start server on a random port ---
  await new Promise((resolve) => {
    server = http.createServer(app);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });

  // Helper: perform an HTTP GET and return { statusCode, headers, body }
  function get(path) {
    return new Promise((resolve, reject) => {
      http.get(`${baseUrl}${path}`, (res) => {
        let raw = '';
        res.on('data', (chunk) => { raw += chunk; });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, headers: res.headers, body: raw });
        });
      }).on('error', reject);
    });
  }

  // --- Test 1: GET / ---
  await t.test('GET / returns 200 and the expected message', async () => {
    const { statusCode, body } = await get('/');
    assert.equal(statusCode, 200, `Expected status 200 but got ${statusCode}`);
    assert.equal(
      body,
      'Hello! My DevOps CI/CD pipeline is working.',
      `Unexpected body: "${body}"`
    );
  });

  // --- Test 2: GET /health ---
  await t.test('GET /health returns 200 and { status: "healthy" } JSON', async () => {
    const { statusCode, headers, body } = await get('/health');
    assert.equal(statusCode, 200, `Expected status 200 but got ${statusCode}`);
    assert.ok(
      headers['content-type'] && headers['content-type'].includes('application/json'),
      `Expected Content-Type application/json but got "${headers['content-type']}"`
    );
    const json = JSON.parse(body);
    assert.deepEqual(json, { status: 'healthy' }, `Unexpected JSON: ${body}`);
  });

  // --- Teardown: close the server ---
  await new Promise((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});
