/**
 * Documentation Indexer
 * Reads all docs from src/content/docs and generates search index + Jekyll collections data
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(__dirname, '..', 'src', 'content', 'docs');
const OUTPUT_DIR = path.join(__dirname, '..', '_docs');
const INDEX_FILE = path.join(__dirname, '..', 'assets', 'js', 'search-index.json');

// Ensure output directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Parse frontmatter from markdown content
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content };
  
  const frontmatterText = match[1];
  const body = match[2];
  
  const frontmatter = {};
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  });
  
  return { frontmatter, content: body };
}

// Convert MDX to Markdown (remove JSX components)
function convertMDXtoMD(content) {
  // Remove JSX components (simple approach)
  return content
    .replace(/<[A-Z][a-zA-Z]*\s*[^>]*\/>/g, '')
    .replace(/<[A-Z][a-zA-Z]*\s*[^>]*>[^]*?<\/[A-Z][a-zA-Z]*>/g, '')
    .replace(/{[^}]+}/g, '');
}

// Process a single file
function processFile(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const ext = path.extname(filePath);
  
  let processedContent = content;
  if (ext === '.mdx') {
    processedContent = convertMDXtoMD(content);
  }
  
  const { frontmatter, content: body } = parseFrontmatter(processedContent);
  
  // Determine output path
  const outputSubdir = path.dirname(relativePath);
  const outputName = path.basename(relativePath, ext) + '.md';
  const outputPath = path.join(OUTPUT_DIR, outputSubdir, outputName);
  
  ensureDir(path.dirname(outputPath));
  
  // Generate Jekyll frontmatter
  const jekyllFrontmatter = `---
layout: doc
title: ${frontmatter.title || path.basename(relativePath, ext)}
description: ${frontmatter.description || ''}
permalink: /${relativePath.replace(ext, '')}/
---

${body}`;
  
  fs.writeFileSync(outputPath, jekyllFrontmatter);
  
  return {
    title: frontmatter.title || path.basename(relativePath, ext),
    description: frontmatter.description || '',
    path: `/${relativePath.replace(ext, '')}/`,
    content: body.slice(0, 200) + '...'
  };
}

// Recursively process directory
function processDirectory(dir, relativePath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const index = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = relativePath ? path.join(relativePath, entry.name) : entry.name;
    
    if (entry.isDirectory()) {
      const subIndex = processDirectory(fullPath, relPath);
      index.push(...subIndex);
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      const doc = processFile(fullPath, relPath);
      index.push(doc);
      console.log(`✓ Processed: ${relPath}`);
    }
  }
  
  return index;
}

// Generate search index
function generateSearchIndex(docs) {
  const searchIndex = docs.map(doc => ({
    title: doc.title,
    description: doc.description,
    url: doc.path,
    excerpt: doc.content
  }));
  
  ensureDir(path.dirname(INDEX_FILE));
  fs.writeFileSync(INDEX_FILE, JSON.stringify(searchIndex, null, 2));
  console.log(`\n✓ Generated search index: ${docs.length} documents`);
}

// Main
console.log('📚 Processing documentation...\n');

if (!fs.existsSync(DOCS_DIR)) {
  console.error('❌ Docs directory not found:', DOCS_DIR);
  process.exit(1);
}

ensureDir(OUTPUT_DIR);

const docs = processDirectory(DOCS_DIR);
generateSearchIndex(docs);

console.log('\n✅ Done!');
