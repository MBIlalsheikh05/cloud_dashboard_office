// lib/types.ts

/**
 * Defines the structure for a single API log entry.
 */
export interface LogEntry {
    // --- TIMING & TRACE ---
    '@timestamp': string;      // Example: "2025-11-27T10:46:31.225073Z" (ISO 8601 string)
    creation_time: string;     // Example: "2025-11-27T10:46:31.225073Z"
    ending_time: string;       // Example: "2025-11-27T10:46:31.245911Z"
    request_id: string;        // Example: "59a6c12d-2231-44a5-a0b6-b63d7ae6f96f" (UUID string)
    duration_ms: number;       // Example: 23.75602722 (number for milliseconds)
    latency_bucket: string;    // Example: "fast", "medium", "slow"

    // --- SERVICE & ENVIRONMENT ---
    service: string;           // Example: "customvaluationruling-api"
    environment: 'prod' | 'sit' | 'dev' | string; // Example: "prod"
    module: string;            // Example: "CustomValuationRuling"

    // --- HTTP & OUTCOME ---
    endpoint: string;          // Example: "/api/v3/get_customvaluation_data"
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | string; // Example: "GET"
    status_code: number;       // Example: 500
    status_family: string;     // Example: "5xx"
    outcome: string;           // Example: "failed", "success"

    // --- CUSTOMER & USER CONTEXT ---
    customer_name: string;     // Example: "Jahangir Siddiqui Bank"
    license_key: string;       // Example: "c78f2e93-eb09-4783-bf3e-c0f450064cb9"
    user: string;              // Example: "js"
    ip: string;                // Example: "127.0.0.1" (or a public IP)

    // --- PAYLOAD & SIZING ---
    full_request: string;      // Example: "GET /api/v3/get_customvaluation_data?..." (Full URL/Request line)
    headers: string;           // Example: "{'X-Forwarded-For': '202.141.255.232', 'Host': '...'}" (Stringified JSON or text)
    body: string | null;       // The request body (empty string in your example, but can be JSON)
    request: string;           // Example: "{'invoice_hscode': '5807.9000', ...}" (Stringified JSON of request parameters)
    request_size_bytes: number;
    response_size_bytes: number;
    masked: boolean;           // Example: FALSE (boolean indicates if sensitive data was masked)
    
    // --- DATA & CACHE ---
    data_found: boolean;       // Example: FALSE
    hits_count: number;
    cache_event: string | null; // Nullable if no cache event occurred

    // --- ERROR DETAILS (Only present on failure) ---
    error_class: string | null;     // Example: "ValueError"
    error_message: string | null;   // Example: "Invoice currency is required."
    exception_stack: string | null; // Full stack trace (often a long string)
}