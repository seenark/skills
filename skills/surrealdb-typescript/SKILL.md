---
name: surrealdb-typescript
description: "Comprehensive type-safe guide for SurrealDB v2 TypeScript SDK. Covers connection management, type-safe CRUD with query builders, expression utilities for WHERE clauses, parameterized queries with surql, transactions, live queries, value types, and full-stack patterns. Use this skill whenever working with SurrealDB in a TypeScript or JavaScript project — including writing queries, defining schemas, building data layers, setting up connections, implementing real-time features, or any task involving SurrealDB operations. Also use when the user mentions SurrealDB, SurrealQL, surrealdb.js, or needs help with a database layer that could use SurrealDB."
---

# SurrealDB TypeScript SDK — Type-Safe Guide

This guide covers the **v2 SurrealDB JavaScript/TypeScript SDK** (`surrealdb` package). Every section emphasizes type safety, valid SurrealQL generation, and SQL injection prevention.

## Table of Contents

1. [Setup & Installation](#1-setup--installation)
2. [Connection Management](#2-connection-management)
3. [Type-Safe Foundation](#3-type-safe-foundation)
4. [Query Builders (CRUD)](#4-query-builders-crud)
5. [Expression Utilities (Type-Safe WHERE)](#5-expression-utilities-type-safe-where)
6. [Parameterized Queries (surql)](#6-parameterized-queries-surql)
7. [Transactions](#7-transactions)
8. [Value Types](#8-value-types)
9. [Live Queries (Real-Time)](#9-live-queries-real-time)
10. [Full-Stack Patterns](#10-full-stack-patterns)
11. [Best Practices](#11-best-practices)

---

## 1. Setup & Installation

```bash
# Using npm
npm install surrealdb

# Using bun
bun add surrealdb

# Using pnpm
pnpm add surrealdb
```

For embedded engines (optional):

```bash
# Node.js embedded engine
npm install @surrealdb/node

# WebAssembly embedded engine (browser)
npm install @surrealdb/wasm
```

Import the SDK:

```typescript
import {
  Surreal,
  RecordId,
  Table,
  DateTime,
  Duration,
  Decimal,
  Uuid,
  surql,
  BoundQuery,
  expr,
  eq,
  ne,
  gt,
  gte,
  lt,
  lte,
  and,
  or,
  not,
  contains,
  containsAny,
  containsAll,
  containsNone,
  matches,
  knn,
  raw,
} from "surrealdb";
```

---

## 2. Connection Management

### 2.1 Basic Connection

```typescript
import { Surreal } from "surrealdb";

const db = new Surreal();

await db.connect("ws://127.0.0.1:8000", {
  namespace: "my_app",
  database: "production",
});
```

### 2.2 Connection Protocols

| Protocol | Use Case | Example |
|----------|----------|---------|
| `ws://` / `wss://` | Long-lived connections (backend, frontend) | `ws://localhost:8000` |
| `http://` / `https://` | Stateless connections (SSR, serverless) | `http://localhost:8000` |
| `mem://` | In-memory embedded database | `mem://` |
| `rocksdb://` | File-backed embedded (Node.js) | `rocksdb://./data.db` |
| `surrealkv://` | File-backed embedded (SurrealKV) | `surrealkv://./data.db` |
| `indxdb://` | IndexedDB embedded (browser) | `indxdb://myapp` |

### 2.3 Authentication Patterns

**System user (root/namespace/database level):**

```typescript
await db.connect("ws://localhost:8000", {
  namespace: "my_app",
  database: "production",
  authentication: {
    username: "root",
    password: "root",
  },
});
```

**Record user (via access method):**

```typescript
await db.connect("ws://localhost:8000", {
  namespace: "my_app",
  database: "production",
});

// Sign in existing user
await db.signin({
  access: "user",
  variables: {
    email: "user@example.com",
    password: "password123",
  },
});

// Or sign up new user
await db.signup({
  access: "user",
  variables: {
    email: "new@example.com",
    password: "password123",
  },
});
```

**Token-based authentication:**

```typescript
await db.connect("ws://localhost:8000", {
  namespace: "my_app",
  database: "production",
});

// Authenticate with existing token
await db.authenticate("eyJhbGciOiJIUzI1NiIs...");

// Or with access + refresh token pair
await db.authenticate({
  access: "eyJhbGciOiJIUzI1NiIs...",
  refresh: "eyJhbGciOiJIUzI1NiIs...",
});
```

### 2.4 Connection with Embedded Engines

**Node.js embedded:**

```typescript
import { Surreal } from "surrealdb";
import { createNodeEngines } from "@surrealdb/node";

const db = new Surreal({
  engines: createNodeEngines(),
});

await db.connect("mem://");
// or
await db.connect("rocksdb://./data.db");
```

**Browser WASM embedded:**

```typescript
import { Surreal } from "surrealdb";
import { createWasmEngines } from "@surrealdb/wasm";

const db = new Surreal({
  engines: createWasmEngines(),
});

await db.connect("mem://");
// or
await db.connect("indxdb://myapp");
```

### 2.5 Reconnection Configuration

```typescript
await db.connect("ws://localhost:8000", {
  namespace: "my_app",
  database: "production",
  authentication: {
    username: "root",
    password: "root",
  },
  reconnect: {
    enabled: true,
    attempts: -1,
    retryDelay: 1000,
    retryDelayMax: 30000,
    retryDelayMultiplier: 2,
    retryDelayJitter: 0.1,
  },
});
```

### 2.6 Switching Namespace/Database

```typescript
await db.use({
  namespace: "other_ns",
  database: "other_db",
});
```

### 2.7 Connection Status & Events

```typescript
// Check status
if (db.status === "connected") {
  // ready to query
}

// Subscribe to events
db.subscribe("connected", (url: string) => {
  console.log("Connected to:", url);
});

db.subscribe("disconnected", () => {
  console.log("Disconnected");
});

db.subscribe("reconnecting", () => {
  console.log("Reconnecting...");
});
```

### 2.8 Closing Connections

```typescript
await db.close();
```

---

## 3. Type-Safe Foundation

### 3.1 Define TypeScript Interfaces for Records

Every record in SurrealDB should have a corresponding TypeScript interface. The `id` field is managed by the SDK, so exclude it from your data interfaces and use `RecordResult<T>` when reading.

```typescript
// types.ts

export interface User {
  name: string;
  email: string;
  age: number;
  role: "admin" | "user";
  active: boolean;
  created_at: string;
}

export interface Post {
  title: string;
  content: string;
  author: RecordId;
  tags: string[];
  created_at: string;
}

export interface Project {
  name: string;
  description: string;
  owner: RecordId;
  status: "active" | "archived" | "completed";
  budget: number;
}
```

### 3.2 Centralized Table Definitions

Define table references in a single file. This gives you a single source of truth for table names and makes refactoring safe.

```typescript
// tables.ts

import { Table } from "surrealdb";

export const users = new Table("users");
export const posts = new Table("posts");
export const projects = new Table("projects");
export const likes = new Table("likes");
```

### 3.3 RecordId Usage

`RecordId` represents a specific record in a table. It provides type-safe record addressing.

```typescript
import { RecordId } from "surrealdb";

// String ID
const userId = new RecordId("users", "john");

// Numeric ID
const postId = new RecordId("posts", 42);

// Composite ID (array)
const edgeId = new RecordId("likes", ["users:john", "posts:42"]);

// UUID as ID
import { Uuid } from "surrealdb";
const sessionId = new RecordId("sessions", new Uuid());
```

### 3.4 RecordResult Type

When reading records, the SDK adds an `id` field. Use the generic type parameter to get full type safety:

```typescript
import { RecordId, Table } from "surrealdb";

// The generic parameter <User> makes the result fully typed
const allUsers = await db.select<User>(users);
//    ^? User[] — but each item also has .id: RecordId

const oneUser = await db.select(new RecordId("users", "john"));
//    ^? User with .id: RecordId
```

### 3.5 Values<T> Helper

When creating or updating records, you typically don't include the `id`. Use the `Values<T>` utility concept:

```typescript
type Values<T> = Omit<T, "id">;

const userData: Values<User> = {
  name: "John",
  email: "john@example.com",
  age: 32,
  role: "user",
  active: true,
  created_at: new Date().toISOString(),
};
```

---

## 4. Query Builders (CRUD)

Query builders are the primary way to interact with SurrealDB. They generate valid SurrealQL and provide type-safe, chainable APIs.

### 4.1 SELECT — Reading Records

```typescript
import { Table, RecordId } from "surrealdb";
import { eq, gt, and } from "surrealdb";

// Select all records from a table
const allUsers = await db.select<User>(users);

// Select a specific record by ID
const user = await db.select<User>(new RecordId("users", "john"));

// Chain methods for filtering
const activeAdults = await db.select<User>(users)
  .fields("name", "email", "age")
  .where(and(eq("active", true), gte("age", 18)))
  .limit(10)
  .start(0)
  .fetch("posts");
```

### 4.2 CREATE — Creating Records

```typescript
// Create with random ID
const newUser = await db.create<User>(users).content({
  name: "Alice",
  email: "alice@example.com",
  age: 28,
  role: "user",
  active: true,
  created_at: new Date().toISOString(),
});

// Create with specific ID
const specificUser = await db.create<User>(new RecordId("users", "bob"))
  .content({
    name: "Bob",
    email: "bob@example.com",
    age: 35,
    role: "admin",
    active: true,
    created_at: new Date().toISOString(),
  });
```

### 4.3 INSERT — Bulk Insert

More efficient than calling `.create()` in a loop:

```typescript
const batch = await db.insert<User>(users, [
  { name: "Alice", email: "alice@example.com", age: 28 },
  { name: "Bob", email: "bob@example.com", age: 35 },
  { name: "Carol", email: "carol@example.com", age: 42 },
]);
```

### 4.4 UPDATE — Updating Records

There are multiple update strategies. Choose based on your needs:

**Replace entire content** (removes fields not included):

```typescript
await db.update<User>(new RecordId("users", "john"))
  .content({
    name: "John Smith",
    email: "john.smith@example.com",
    age: 33,
    role: "user",
    active: true,
    created_at: "2024-01-01T00:00:00Z",
  });
```

**Merge fields** (only updates specified fields, preserves the rest):

```typescript
await db.update<User>(new RecordId("users", "john"))
  .merge({ email: "new@example.com" });
```

**JSON Patch** (fine-grained RFC 6902 operations):

```typescript
await db.update<User>(new RecordId("users", "john"))
  .patch([
    { op: "replace", path: "/email", value: "new@example.com" },
    { op: "add", path: "/verified", value: true },
  ]);
```

**Conditional update on a table:**

```typescript
import { eq, gte } from "surrealdb";

await db.update<User>(users)
  .merge({ verified: true })
  .where(gte("age", 18));
```

### 4.5 UPSERT — Insert or Replace

```typescript
await db.upsert<User>(new RecordId("users", "john"))
  .content({
    name: "John",
    email: "john@example.com",
    age: 32,
    role: "user",
    active: true,
    created_at: new Date().toISOString(),
  });
```

### 4.6 DELETE — Deleting Records

```typescript
// Delete a specific record
await db.delete(new RecordId("users", "john"));

// Delete all records in a table
await db.delete(users);

// Conditional delete
import { eq, lt, and } from "surrealdb";

await db.delete(users)
  .where(and(eq("active", false), lt("last_login", "2024-01-01")));
```

### 4.7 RELATE — Creating Graph Edges

SurrealDB supports native graph relationships. Use `.relate()` to create edges between records:

```typescript
// Create a "likes" edge from user to post
await db.relate(
  new RecordId("users", "john"),
  likes,
  new RecordId("posts", "1"),
  { timestamp: new Date().toISOString() }
);
```

### 4.8 RUN — Executing Functions

```typescript
// Run a SurrealDB function
const result = await db.run("fn::calculate_total", [100, 0.2]);

// Run an ML model with version
const prediction = await db.run("ml::predict", "1.0.0", [inputData]);
```

---

## 5. Expression Utilities (Type-Safe WHERE)

The expression utilities generate valid SurrealQL conditions without string concatenation, preventing SQL injection and providing type safety.

### 5.1 Comparison Operators

```typescript
import { eq, eeq, ne, gt, gte, lt, lte } from "surrealdb";

// Equality: field = value
expr(eq("status", "active"))
// WHERE status = $bind__1

// Exact equality: field == value
expr(eeq("count", 0))
// WHERE count == 0

// Not equal: field != value
expr(ne("role", "admin"))
// WHERE role != $bind__1

// Greater than: field > value
expr(gt("age", 17))
// WHERE age > $bind__1

// Greater than or equal: field >= value
expr(gte("age", 18))

// Less than: field < value
expr(lt("age", 30))

// Less than or equal: field <= value
expr(lte("age", 29))
```

### 5.2 Logical Operators

```typescript
import { and, or, not } from "surrealdb";

// AND — all conditions must be true
expr(and(
  eq("tier", "premium"),
  gte("age", 18)
))
// WHERE tier = $bind__1 AND age >= $bind__2

// OR — at least one condition must be true
expr(or(
  eq("role", "admin"),
  eq("role", "moderator")
))
// WHERE role = $bind__1 OR role = $bind__2

// NOT — inverts the condition
expr(not(eq("status", "banned")))
// WHERE NOT status = $bind__1
```

### 5.3 Array/String Operators

```typescript
import { contains, containsAny, containsAll, containsNone } from "surrealdb";

// Field contains value
expr(contains("tags", "featured"))
// WHERE tags CONTAINS $bind__1

// Field contains any of the values
expr(containsAny("tags", ["new", "featured", "trending"]))
// WHERE tags CONTAINSANY $bind__1

// Field contains all of the values
expr(containsAll("badges", ["email-verified", "phone-verified"]))
// WHERE badges CONTAINSALL $bind__1

// Field contains none of the values
expr(containsNone("flags", ["spam", "inappropriate"]))
// WHERE flags CONTAINSNONE $bind__1
```

### 5.4 Full-Text Search

```typescript
import { matches } from "surrealdb";

// Basic text match
expr(matches("content", "search term"))
// WHERE content @@ $bind__1

// With reference number for multi-field search
expr(or(
  matches("title", searchQuery, 1),
  matches("content", searchQuery, 1)
))
```

### 5.5 Vector Search (KNN)

```typescript
import { knn } from "surrealdb";

const queryVector = [0.1, 0.2, 0.3, 0.4];

expr(knn("embedding", queryVector, 10, "cosine"))
// WHERE embedding <|10,COSINE|> $bind__1
```

### 5.6 Composable Expressions

Build small, reusable expressions and compose them:

```typescript
const isActive = expr(eq("active", true));
const isAdult = expr(gte("age", 18));
const isVerified = expr(eq("verified", true));

// Compose into complex conditions
const eligibleUser = expr(and(isActive, isAdult, isVerified));
const premiumOrAdmin = expr(or(
  and(isActive, eq("tier", "premium")),
  and(isActive, eq("role", "admin"))
));

// Use in queries
const users = await db.select<User>(users).where(eligibleUser);
```

### 5.7 Dynamic Filter Builder

A common pattern for building filters from user input:

```typescript
function buildUserFilter(options: {
  minAge?: number;
  maxAge?: number;
  role?: string;
  active?: boolean;
  tags?: string[];
}) {
  const conditions: ExprLike[] = [];

  if (options.minAge !== undefined) {
    conditions.push(gte("age", options.minAge));
  }
  if (options.maxAge !== undefined) {
    conditions.push(lte("age", options.maxAge));
  }
  if (options.role) {
    conditions.push(eq("role", options.role));
  }
  if (options.active !== undefined) {
    conditions.push(eq("active", options.active));
  }
  if (options.tags?.length) {
    conditions.push(containsAny("tags", options.tags));
  }

  return conditions.length > 0
    ? expr(and(...conditions))
    : undefined;
}

// Usage
const filter = buildUserFilter({ minAge: 18, role: "admin" });
if (filter) {
  const results = await db.select<User>(users).where(filter);
}
```

---

## 6. Parameterized Queries (surql)

### 6.1 The surql Template Tag

The `surql` tagged template literal is the recommended way to write SurrealQL with dynamic values. It automatically parameterizes interpolated values, preventing SQL injection:

```typescript
import { surql } from "surrealdb";

const minAge = 18;
const status = "active";

// All interpolated values become bound parameters
const [users] = await db.query<[User[]]>(
  surql`SELECT * FROM users WHERE age > ${minAge} AND status = ${status}`
);

// Internally becomes:
// query: "SELECT * FROM users WHERE age > $bind__1 AND status = $bind__2"
// bindings: { bind__1: 18, bind__2: "active" }
```

### 6.2 SQL Injection Prevention

```typescript
// User input is ALWAYS parameterized — never concatenated
const userInput = "'; DROP TABLE users; --";

// SAFE: treated as a parameter value
const query = surql`SELECT * FROM users WHERE name = ${userInput}`;
// Becomes: SELECT * FROM users WHERE name = $bind__1
// The malicious SQL is just a string value, not executed

// DANGEROUS: never do this
const bad = `SELECT * FROM users WHERE name = '${userInput}'`;
```

### 6.3 Multi-Statement Queries

```typescript
const userId = new RecordId("users", "john");

const [user, posts] = await db.query<[User, Post[]]>(
  surql`
    SELECT * FROM ${userId};
    SELECT * FROM posts WHERE author = ${userId};
  `
);
```

### 6.4 Dynamic Query Building with BoundQuery

```typescript
import { BoundQuery, surql } from "surrealdb";

function buildSearchQuery(filters: {
  status?: string;
  minAge?: number;
  category?: string;
}) {
  const query = new BoundQuery("SELECT * FROM users WHERE 1=1");

  if (filters.status) {
    query.append(surql` AND status = ${filters.status}`);
  }
  if (filters.minAge !== undefined) {
    query.append(surql` AND age >= ${filters.minAge}`);
  }
  if (filters.category) {
    query.append(surql` AND category = ${filters.category}`);
  }

  return query;
}

const q = buildSearchQuery({ status: "active", minAge: 18 });
const [results] = await db.query(q).collect();
```

### 6.5 Combining surql with Expressions

```typescript
const condition = expr(and(
  eq("verified", true),
  gte("age", 18)
));

const tier = "premium";

const [users] = await db.query<[User[]]>(
  surql`SELECT * FROM users WHERE ${condition} AND tier = ${tier}`
);
```

### 6.6 Collecting Specific Results

When running multi-statement queries, use `.collect()` to pick specific result indexes:

```typescript
const [foo, bar] = await db.query(`
  LET $a = 1;
  LET $b = 2;
  SELECT * FROM users;
  SELECT * FROM posts;
`).collect<[User[], Post[]]>(2, 3);
```

### 6.7 Accessing Response Metadata

```typescript
const responses = await db.query("SELECT * FROM users; SELECT * FROM posts").responses();

for (const response of responses) {
  if (response.success) {
    console.log("Result:", response.result);
    console.log("Duration:", response.stats?.duration);
  } else {
    console.error("Error:", response.error.message);
  }
}
```

### 6.8 Common Pitfall — Identifier Interpolation

Table names and field names cannot be parameterized. Use the `Table` class for tables and `escapeIdent` for field names:

```typescript
// WRONG: table name becomes a string parameter
const tableName = "users";
const wrong = surql`SELECT * FROM ${tableName}`;

// CORRECT: use Table class
const table = new Table("users");
const correct = surql`SELECT * FROM ${table}`;

// For field names, validate and use raw
import { escapeIdent, raw } from "surrealdb";
const fieldName = escapeIdent("age");
const safe = surql`SELECT * FROM users WHERE ${raw(fieldName)} > 18`;
```

---

## 7. Transactions

Transactions execute multiple queries atomically — either all succeed or none do.

### 7.1 Basic Transaction Pattern

```typescript
const txn = await db.beginTransaction();

try {
  // All operations within the transaction scope
  await txn.create<User>(new RecordId("users", "alice"))
    .content({ name: "Alice", email: "alice@example.com", age: 28 });

  await txn.create<User>(new RecordId("users", "bob"))
    .content({ name: "Bob", email: "bob@example.com", age: 35 });

  await txn.commit();
} catch (error) {
  await txn.cancel();
  throw error;
}
```

### 7.2 Transfer Pattern (Read-Modify-Write)

```typescript
const txn = await db.beginTransaction();

try {
  const from = await txn.select<Account>(new RecordId("accounts", "alice"));
  const to = await txn.select<Account>(new RecordId("accounts", "bob"));

  if (from.balance < 100) {
    throw new Error("Insufficient funds");
  }

  await txn.update<Account>(new RecordId("accounts", "alice"))
    .merge({ balance: from.balance - 100 });

  await txn.update<Account>(new RecordId("accounts", "bob"))
    .merge({ balance: to.balance + 100 });

  await txn.commit();
} catch (error) {
  await txn.cancel();
  throw error;
}
```

### 7.3 Transaction Rules

- Keep transactions short — perform validation before starting
- Always use try/catch with `cancel()` in the catch block
- Never reuse a transaction after commit or cancel — create a new one
- The transaction object has all the same query methods as `db`

---

## 8. Value Types

The SDK provides dedicated classes for SurrealDB's custom data types. Using these ensures correct serialization and deserialization.

### 8.1 RecordId

Represents a record address: `table:id`.

```typescript
import { RecordId } from "surrealdb";

const id = new RecordId("users", "john");
// Serializes as users:john

const numId = new RecordId("posts", 42);
// Serializes as posts:42

const arrayId = new RecordId("edges", ["users:a", "posts:1"]);
// Serializes as edges:[users:a,posts:1]
```

### 8.2 Table

Represents a table reference. Used in queries instead of raw table name strings.

```typescript
import { Table } from "surrealdb";

const users = new Table("users");

// Used as a parameter in surql
surql`SELECT * FROM ${users}`;
// Generates: SELECT * FROM users
```

### 8.3 DateTime

```typescript
import { DateTime } from "surrealdb";

const now = DateTime.now();
const specific = DateTime.from("2024-01-15T10:30:00Z");
```

### 8.4 Duration

```typescript
import { Duration } from "surrealdb";

const d = Duration.parse("30d");
const d2 = Duration.parse("1h30m");
const d3 = Duration.parse("2w3d");

// Use with DateTime
const cutoff = DateTime.now().minus(Duration.parse("30d"));
```

### 8.5 Decimal

```typescript
import { Decimal } from "surrealdb";

const price = new Decimal("19.99");
const tax = new Decimal("0.07");
```

### 8.6 Uuid

```typescript
import { Uuid } from "surrealdb";

const id = new Uuid();
const specific = new Uuid("550e8400-e29b-41d4-a716-446655440000");
```

### 8.7 Geometry

```typescript
import { GeometryPoint, GeometryPolygon } from "surrealdb";

const point = new GeometryPoint([13.50, 52.55]);
const polygon = new GeometryPolygon([/* coordinate arrays */]);
```

### 8.8 Range

```typescript
import { Range, RecordId } from "surrealdb";

// Range of record IDs
const range = new Range(new RecordId("users", "a"), new RecordId("users", "z"));

// Use in select to get a range of records
const results = await db.select<User>(range);
```

---

## 9. Live Queries (Real-Time)

Live queries let you subscribe to changes in the database and receive real-time updates. This is particularly useful for frontend applications.

### 9.1 Basic Subscription

```typescript
import { Table } from "surrealdb";

// Subscribe to all changes on a table
const subscription = await db.live(new Table("users"));

for await (const { action, result } of subscription) {
  switch (action) {
    case "CREATE":
      console.log("New user:", result);
      break;
    case "UPDATE":
      console.log("Updated user:", result);
      break;
    case "DELETE":
      console.log("Deleted user:", result);
      break;
  }
}
```

### 9.2 Subscribe to a Specific Record

```typescript
const sub = await db.live(new RecordId("users", "john"));

for await (const { action, result } of sub) {
  console.log(`${action}:`, result);
}
```

### 9.3 Live Query with Filtering

```typescript
import { eq } from "surrealdb";

const sub = await db.live(new Table("orders"));

for await (const { action, result } of sub) {
  if (action === "CREATE" && result.status === "pending") {
    console.log("New pending order:", result);
  }
}
```

---

## 10. Full-Stack Patterns

### 10.1 Backend — Connection Singleton

Create a single SurrealDB instance that can be reused across your server:

```typescript
// lib/db.ts

import { Surreal, Table, RecordId } from "surrealdb";

let db: Surreal | null = null;

export async function getDb(): Promise<Surreal> {
  if (db && db.status === "connected") {
    return db;
  }

  db = new Surreal();

  await db.connect(process.env.SURREAL_URL!, {
    namespace: process.env.SURREAL_NS!,
    database: process.env.SURREAL_DB!,
    authentication: {
      username: process.env.SURREAL_USER!,
      password: process.env.SURREAL_PASS!,
    },
  });

  return db;
}
```

### 10.2 Backend — Repository Pattern

```typescript
// repositories/base.repository.ts

import { Surreal, Table, RecordId, RecordIdValue } from "surrealdb";
import { getDb } from "../lib/db";

export class BaseRepository<T> {
  constructor(
    protected table: Table,
  ) {}

  protected async db(): Promise<Surreal> {
    return getDb();
  }

  async findById(id: RecordIdValue): Promise<T | undefined> {
    const db = await this.db();
    const results = await db.select<T>(new RecordId(this.table.toString(), id));
    return results;
  }

  async findAll(): Promise<T[]> {
    const db = await this.db();
    return db.select<T>(this.table);
  }

  async create(data: Omit<T, "id">): Promise<T> {
    const db = await this.db();
    return db.create<T>(this.table).content(data);
  }

  async update(id: RecordIdValue, data: Partial<T>): Promise<T> {
    const db = await this.db();
    return db.update<T>(new RecordId(this.table.toString(), id))
      .merge(data);
  }

  async deleteById(id: RecordIdValue): Promise<void> {
    const db = await this.db();
    await db.delete(new RecordId(this.table.toString(), id));
  }
}
```

```typescript
// repositories/user.repository.ts

import { Table } from "surrealdb";
import { BaseRepository } from "./base.repository";
import { User } from "../types";
import { users } from "../tables";
import { eq, gte, and, expr } from "surrealdb";
import { getDb } from "../lib/db";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(users);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const db = await this.db();
    const [result] = await db.select<User>(this.table)
      .where(eq("email", email))
      .limit(1);
    return result;
  }

  async findActiveAdults(minAge: number = 18): Promise<User[]> {
    const db = await this.db();
    return db.select<User>(this.table)
      .where(and(eq("active", true), gte("age", minAge)));
  }

  async deactivateInactive(sinceDays: number): Promise<number> {
    const db = await this.db();
    const cutoff = DateTime.now().minus(Duration.parse(`${sinceDays}d`));
    const deleted = await db.delete(this.table)
      .where(and(eq("active", false), lt("last_login", cutoff)));
    return deleted.length;
  }
}

export const userRepo = new UserRepository();
```

### 10.3 Backend — Using Repositories in API Routes

```typescript
// Example with Hono/Bun/Express-style handler

import { userRepo } from "../repositories/user.repository";

async function getUserHandler(req: Request) {
  const user = await userRepo.findById("john");
  if (!user) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json(user);
}

async function createUserHandler(req: Request) {
  const body = await req.json();
  const user = await userRepo.create({
    name: body.name,
    email: body.email,
    age: body.age,
    role: "user",
    active: true,
    created_at: new Date().toISOString(),
  });
  return Response.json(user, { status: 201 });
}
```

### 10.4 Frontend — Live Data with Record User Auth

```typescript
// Frontend: lib/db.ts

import { Surreal } from "surrealdb";

let db: Surreal | null = null;

export async function getDb(): Promise<Surreal> {
  if (db && db.status === "connected") {
    return db;
  }

  db = new Surreal();
  await db.connect("wss://my-instance.surreal.cloud", {
    namespace: "my_app",
    database: "production",
  });

  return db;
}

export async function login(email: string, password: string) {
  const db = await getDb();
  await db.signin({
    access: "user",
    variables: { email, password },
  });
}

export async function register(email: string, password: string) {
  const db = await getDb();
  await db.signup({
    access: "user",
    variables: { email, password },
  });
}
```

```typescript
// Frontend: hooks/useLiveUsers.ts
// Example pattern — adapt to your framework

import { getDb } from "../lib/db";
import { Table } from "surrealdb";

async function watchUsers(onUpdate: (users: any[]) => void) {
  const db = await getDb();
  const sub = await db.live(new Table("users"));

  // Initial load
  const initial = await db.select(new Table("users"));
  onUpdate(initial);

  // Listen for changes
  for await (const { action, result } of sub) {
    if (action === "CREATE") {
      onUpdate(prev => [...prev, result]);
    }
    if (action === "UPDATE") {
      onUpdate(prev => prev.map(u => u.id === result.id ? result : u));
    }
    if (action === "DELETE") {
      onUpdate(prev => prev.filter(u => u.id !== result.id));
    }
  }
}
```

---

## 11. Best Practices

### 11.1 Always Use surql or Query Builders for Dynamic Values

```typescript
// GOOD: parameterized via surql
const query = surql`SELECT * FROM users WHERE name = ${userName}`;

// GOOD: parameterized via query builder
const users = await db.select(users).where(eq("name", userName));

// BAD: string concatenation — SQL injection risk
const bad = `SELECT * FROM users WHERE name = '${userName}'`;
```

### 11.2 Avoid raw() When Possible

```typescript
// GOOD: typed expression
const condition = expr(gte("score", 80));

// BAD: raw string — bypasses parameterization
const condition = expr(raw(`score >= ${userInput}`));
```

### 11.3 Centralize Table Definitions

Keep all table references in one file. This prevents typos and makes renaming safe:

```typescript
// tables.ts
import { Table } from "surrealdb";
export const users = new Table("users");
export const posts = new Table("posts");
export const projects = new Table("projects");
```

### 11.4 Define Record Types Alongside Tables

```typescript
// types.ts — co-located or in a shared types file
export interface User {
  name: string;
  email: string;
  age: number;
  role: "admin" | "user";
  active: boolean;
  created_at: string;
}
```

### 11.5 Use the Repository Pattern

Wrap database operations in repository classes. This encapsulates query logic, makes testing easier, and provides a clean API surface:

```typescript
// Instead of scattering raw queries everywhere:
const user = await userRepo.findByEmail("john@example.com");

// Instead of:
const [users] = await db.query(surql`SELECT * FROM users WHERE email = ${email}`);
```

### 11.6 Use Transactions for Multi-Step Operations

Any time you need to read-then-modify, or modify multiple records that must be consistent, use a transaction:

```typescript
const txn = await db.beginTransaction();
try {
  // ... multiple operations ...
  await txn.commit();
} catch (error) {
  await txn.cancel();
  throw error;
}
```

### 11.7 Pass Auth to .connect() for Auto-Reconnect

When authentication details are passed to `.connect()`, the SDK can automatically re-authenticate on reconnection. If you use `.signin()` separately, reconnection won't re-authenticate:

```typescript
// PREFERRED: auth in connect options
await db.connect("ws://localhost:8000", {
  authentication: { username: "root", password: "root" },
});

// NOT PREFERRED: separate signin (no auto-reauth)
await db.connect("ws://localhost:8000");
await db.signin({ username: "root", password: "root" });
```

### 11.8 Use .merge() for Partial Updates

Avoid replacing entire records with `.content()` when you only need to update a few fields. `.merge()` preserves all existing fields:

```typescript
// GOOD: only updates email, preserves everything else
await db.update(new RecordId("users", "john")).merge({ email: "new@example.com" });

// RISKY: replaces entire record — any missing fields are lost
await db.update(new RecordId("users", "john")).content({ ... });
```

### 11.9 Schema Definition in SurrealQL

Define your schema in SurrealQL (run via migrations or Surrealist) and keep TypeScript types in sync:

```sql
-- Migration: define tables and fields in SurrealDB
DEFINE TABLE users SCHEMAFULL;
DEFINE FIELD name ON users TYPE string;
DEFINE FIELD email ON users TYPE string ASSERT string::is::lowercase($value);
DEFINE FIELD age ON users TYPE int ASSERT $value > 0;
DEFINE FIELD role ON users TYPE string DEFAULT "user";
DEFINE FIELD active ON users TYPE bool DEFAULT true;
DEFINE FIELD created_at ON users TYPE datetime DEFAULT time::now();

DEFINE INDEX idx_email ON users COLUMNS email UNIQUE;
DEFINE INDEX idx_role ON users COLUMNS role;
```

---

## Quick Reference

### Common Imports

```typescript
import { Surreal, RecordId, Table, surql, expr, eq, gt, and, or } from "surrealdb";
```

### Connection Cheat Sheet

| Method | Purpose |
|--------|---------|
| `new Surreal()` | Create client instance |
| `db.connect(url, opts)` | Connect to database |
| `db.use({ namespace, database })` | Switch namespace/database |
| `db.signin(credentials)` | Authenticate as user |
| `db.signup(credentials)` | Register new user |
| `db.authenticate(token)` | Auth with existing token |
| `db.close()` | Close connection |
| `db.status` | Current connection status |

### Query Builder Cheat Sheet

| Method | SurrealQL Equivalent |
|--------|---------------------|
| `db.select(table)` | `SELECT * FROM table` |
| `db.create(record).content(data)` | `CREATE record CONTENT data` |
| `db.insert(table, [data])` | `INSERT INTO table [data]` |
| `db.update(record).content(data)` | `UPDATE record CONTENT data` |
| `db.update(record).merge(data)` | `UPDATE record MERGE data` |
| `db.update(record).patch(ops)` | `UPDATE record PATCH ops` |
| `db.upsert(record).content(data)` | `UPSERT record CONTENT data` |
| `db.delete(record)` | `DELETE record` |
| `db.relate(from, edge, to)` | `RELATE from->edge->to` |
| `db.query(sql, bindings)` | Execute raw SurrealQL |

### Expression Cheat Sheet

| Function | Operator | Example |
|----------|----------|---------|
| `eq(f, v)` | `=` | `eq("age", 18)` |
| `ne(f, v)` | `!=` | `ne("role", "admin")` |
| `gt(f, v)` | `>` | `gt("age", 17)` |
| `gte(f, v)` | `>=` | `gte("age", 18)` |
| `lt(f, v)` | `<` | `lt("age", 30)` |
| `lte(f, v)` | `<=` | `lte("age", 29)` |
| `and(...c)` | `AND` | `and(eq("a", 1), eq("b", 2))` |
| `or(...c)` | `OR` | `or(eq("a", 1), eq("b", 2))` |
| `not(c)` | `NOT` | `not(eq("status", "banned"))` |
| `contains(f, v)` | `CONTAINS` | `contains("tags", "x")` |
| `containsAny(f, vs)` | `CONTAINSANY` | `containsAny("tags", ["a","b"])` |
| `containsAll(f, vs)` | `CONTAINSALL` | `containsAll("tags", ["a","b"])` |
| `matches(f, q)` | `@@` | `matches("content", "term")` |
| `knn(f, vec, k)` | `<|K|>` | `knn("emb", vec, 10)` |
