#!/usr/bin/env node

/**
 * Test script for the practice feature implementation
 * This script tests the key components and API connections
 */

const http = require('http');
const https = require('https');

// Configuration
const BACKEND_URL = 'http://localhost:3000';
const MEDIAPIPE_CDN_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe';

// Test functions
async function testBackendConnection() {
  console.log('🔍 Testing backend connection...');
  
  return new Promise((resolve) => {
    const req = http.get(`${BACKEND_URL}/health`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          console.log('✅ Backend is running:', result);
          resolve(true);
        } catch (e) {
          console.log('❌ Backend response invalid:', data);
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      console.log('❌ Backend connection failed:', err.message);
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ Backend connection timeout');
      req.destroy();
      resolve(false);
    });
  });
}

async function testMediaPipeCDN() {
  console.log('🔍 Testing MediaPipe CDN availability...');
  
  const testFiles = [
    'hands/hands.js',
    'camera_utils/camera_utils.js',
    'drawing_utils/drawing_utils.js'
  ];
  
  let allAvailable = true;
  
  for (const file of testFiles) {
    try {
      await new Promise((resolve, reject) => {
        const req = https.get(`${MEDIAPIPE_CDN_URL}/${file}`, (res) => {
          if (res.statusCode === 200) {
            console.log(`✅ ${file} - available`);
            resolve(true);
          } else {
            console.log(`❌ ${file} - status ${res.statusCode}`);
            allAvailable = false;
            resolve(false);
          }
        });
        
        req.on('error', (err) => {
          console.log(`❌ ${file} - error: ${err.message}`);
          allAvailable = false;
          resolve(false);
        });
        
        req.setTimeout(5000, () => {
          console.log(`❌ ${file} - timeout`);
          req.destroy();
          allAvailable = false;
          resolve(false);
        });
      });
    } catch (error) {
      console.log(`❌ ${file} - exception: ${error.message}`);
      allAvailable = false;
    }
  }
  
  return allAvailable;
}

async function testAPIEndpoints() {
  console.log('🔍 Testing API endpoints...');
  
  const endpoints = [
    { method: 'GET', path: '/api/config', name: 'Config endpoint' },
    { method: 'POST', path: '/api/compare', name: 'Compare endpoint' },
    { method: 'POST', path: '/api/validate-constraints', name: 'Constraints endpoint' },
    { method: 'POST', path: '/api/analyze-hand', name: 'Hand analysis endpoint' }
  ];
  
  let allWorking = true;
  
  for (const endpoint of endpoints) {
    try {
      await new Promise((resolve) => {
        const options = {
          hostname: 'localhost',
          port: 3000,
          path: endpoint.path,
          method: endpoint.method,
          headers: {
            'Content-Type': 'application/json'
          }
        };
        
        const req = http.request(options, (res) => {
          console.log(`✅ ${endpoint.name} - status ${res.statusCode}`);
          resolve(true);
        });
        
        req.on('error', (err) => {
          console.log(`❌ ${endpoint.name} - error: ${err.message}`);
          allWorking = false;
          resolve(false);
        });
        
        req.setTimeout(5000, () => {
          console.log(`❌ ${endpoint.name} - timeout`);
          req.destroy();
          allWorking = false;
          resolve(false);
        });
        
        if (endpoint.method === 'POST') {
          req.write(JSON.stringify({}));
        }
        
        req.end();
      });
    } catch (error) {
      console.log(`❌ ${endpoint.name} - exception: ${error.message}`);
      allWorking = false;
    }
  }
  
  return allWorking;
}

async function runTests() {
  console.log('🚀 Starting practice feature tests...\n');
  
  const backendOk = await testBackendConnection();
  console.log('');
  
  const cdnOk = await testMediaPipeCDN();
  console.log('');
  
  const apiOk = await testAPIEndpoints();
  console.log('');
  
  // Summary
  console.log('📊 Test Results:');
  console.log(`Backend Connection: ${backendOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`MediaPipe CDN: ${cdnOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`API Endpoints: ${apiOk ? '✅ PASS' : '❌ FAIL'}`);
  
  if (backendOk && cdnOk && apiOk) {
    console.log('\n🎉 All tests passed! Practice feature is ready to use.');
    console.log('\nNext steps:');
    console.log('1. Start the frontend: npm run dev');
    console.log('2. Navigate to /practice');
    console.log('3. Click "Start Practice Session"');
    console.log('4. Allow camera permissions');
    console.log('5. Start practicing!');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the issues above.');
    console.log('\nTroubleshooting:');
    if (!backendOk) {
      console.log('- Start the backend: cd sightsee-mediapipe-backend && npm start');
    }
    if (!cdnOk) {
      console.log('- Check internet connection and CDN availability');
    }
    if (!apiOk) {
      console.log('- Verify backend API endpoints are implemented');
    }
  }
}

// Run tests
runTests().catch(console.error);
