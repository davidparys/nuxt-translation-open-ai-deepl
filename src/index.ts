#!/usr/bin/env node

import { config } from 'dotenv';
import { setupCli } from './cli/cli.js';
import path from 'path';
import fs from 'fs';

// Try to load environment variables from .env file in current directory
try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
        config({ path: envPath });
    } else {
        config(); // Default behavior
    }
} catch (e) {
    console.warn('Warning: Unable to load .env file, using existing environment variables only.');
    config(); // Still try the default
}

// Check for required API key
if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === '') {
    console.error('Error: OPENAI_API_KEY environment variable is required but not found or empty.');
    console.error('Please set your OpenAI API key in your environment variables or .env file:');
    console.error('  export OPENAI_API_KEY="your-api-key-here"');
    console.error('  or add OPENAI_API_KEY=your-api-key-here to your .env file');
    process.exit(1);
}

// Initialize CLI
setupCli(); 