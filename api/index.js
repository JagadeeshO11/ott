// api/index.js - Vercel serverless function proxying TMDB API
// This file is placed at the project root under the `api` directory.
// It uses the same logic as src/api.js but runs on the server side.
// Environment variable TMDB_API_KEY must be configured in Vercel.

import { URL } from 'url';

/**
 * Helper to construct full TMDB URL with proper auth handling.
 */
function buildTmdbUrl(endpoint, searchParams = {}) {
  const base = 'https://api.themoviedb.org/3';
  const url = new URL(`${base}${endpoint}`);
  // Always request English language
  url.searchParams.append('language', 'en-US');
  // Append any additional query parameters from the client request
  for (const [key, value] of Object.entries(searchParams)) {
    url.searchParams.append(key, String(value));
  }
  const apiKey = process.env.TMDB_API_KEY;
  const isV4Token = apiKey && apiKey.length > 50; // heuristic
  if (!isV4Token && apiKey) {
    url.searchParams.append('api_key', apiKey);
  }
  return { url: url.toString(), isV4Token, apiKey };
}

/**
 * Vercel serverless function entry point.
 * It proxies the request to TMDB, adds minimal caching headers,
 * and returns JSON data to the client.
 */
export default async function handler(req, res) {
  try {
    // Extract the TMDB endpoint from the request URL.
    // Vercel strips the leading '/api' from the path.
    const requestPath = req.url.split('?')[0];
    const endpoint = requestPath === '/' ? '/trending/movie/week' : requestPath;

    // Parse query parameters sent by the client.
    const query = new URLSearchParams(req.url.split('?')[1] || '');
    const queryObj = {};
    for (const [k, v] of query.entries()) {
      queryObj[k] = v;
    }

    const { url, isV4Token, apiKey } = buildTmdbUrl(endpoint, queryObj);

    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        ...(isV4Token ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
    };

    const tmdbRes = await fetch(url, fetchOptions);
    if (!tmdbRes.ok) {
      res.status(tmdbRes.status).json({ error: `TMDB error ${tmdbRes.status}` });
      return;
    }
    const data = await tmdbRes.json();

    // Simple caching – let Vercel edge cache the response for 5 minutes.
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json(data);
  } catch (err) {
    console.error('Vercel API handler error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
