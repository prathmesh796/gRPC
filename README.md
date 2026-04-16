# gRPC — How It Works & How It's Used

## What is gRPC?

gRPC (Google Remote Procedure Call) is a high-performance, open-source RPC framework originally developed by Google. It lets you call functions on a remote server as if they were local functions, hiding all the networking complexity behind a clean, typed API.

---

## How gRPC Works Under the Hood

### 1. Protocol Buffers (Protobuf)
gRPC uses **Protocol Buffers** as its Interface Definition Language (IDL) and serialisation format. You define your messages and services in a `.proto` file. The tooling then generates strongly-typed client and server stubs in your target language.

Protobuf serialises data into a compact **binary wire format** — far smaller and faster to parse than JSON or XML.

### 2. HTTP/2 Transport
All gRPC traffic runs over **HTTP/2**, which gives it several advantages over plain HTTP/1.1:

| Feature | Benefit |
|---|---|
| Multiplexing | Multiple RPC calls share a single TCP connection without head-of-line blocking |
| Header compression | Reduces per-request overhead |
| Binary framing | Efficient encoding/decoding |
| Server push / bidirectional streaming | Enables streaming RPCs natively |

### 3. Call Types
gRPC supports four interaction patterns:

- **Unary** — one request, one response (like a regular function call).
- **Server streaming** — one request, a stream of responses.
- **Client streaming** — a stream of requests, one response.
- **Bidirectional streaming** — both sides stream simultaneously.

### 4. Service Contract & Code Generation
The `.proto` file acts as the service contract. Running `protoc` (or language-specific generators such as `protoc-gen-ts`) produces:

- **Server stubs** — abstract handlers you implement.
- **Client stubs** — strongly-typed proxies that make remote calls look like local method calls.

### 5. End-to-End Flow

```
Client                                    Server
  |                                          |
  |-- serialize request (Protobuf binary) -->|
  |         [ HTTP/2 frame ]                 |
  |                                          |--> dispatch to handler
  |                                          |<-- handler returns response
  |<- serialize response (Protobuf binary) --|
  |         [ HTTP/2 frame ]                 |
```

---

## Practical Usage in Software

gRPC is commonly used for:

- **Microservices communication** — services talk to each other over internal gRPC APIs instead of REST, gaining type safety, smaller payloads, and better performance.
- **Mobile / backend** — mobile clients call backend services with generated stubs that handle serialisation automatically.
- **Real-time streaming** — chat, telemetry, live updates — where bidirectional streaming shines.
- **Polyglot systems** — a Python service can call a Go service seamlessly because both sides share the same `.proto` contract.

---

## This Repository

This project is a minimal **TypeScript gRPC server** that demonstrates the unary RPC pattern.

### Tech Stack

| Package | Role |
|---|---|
| `@grpc/grpc-js` | Pure-JS gRPC runtime (no native binaries required) |
| `@grpc/proto-loader` | Loads `.proto` files at runtime |
| `google-protobuf` | Protobuf runtime support |
| `typescript` | Type-safe implementation |

### Project Structure

```
src/
├── a.proto          # Service contract (messages + service definition)
├── index.ts         # Server implementation
└── generated/       # Auto-generated TypeScript types from a.proto
    ├── a.ts
    ├── Person.ts
    ├── AddPersonResponse.ts
    ├── GetPersonByNameRequest.ts
    ├── GetPersonByNameResponse.ts
    └── PersonService.ts
```

### The Proto Contract (`src/a.proto`)

```protobuf
message Person {
  string name = 1;
  int32  age  = 2;
}

service PersonService {
  rpc addPerson        (Person)                  returns (AddPersonResponse);
  rpc getPersonByName  (GetPersonByNameRequest)  returns (GetPersonByNameResponse);
}
```

Two unary RPCs are defined:

- **`addPerson`** — accepts a `Person` (name + age) and stores it in an in-memory array.
- **`getPersonByName`** — accepts a name string and returns all matching `Person` records.

### Server (`src/index.ts`)

1. The `.proto` file is loaded at runtime via `protoLoader.loadSync`.
2. A `grpc.Server` is created and the `PersonService` handlers (`addPerson`, `getPersonByName`) are registered.
3. The server listens on `0.0.0.0:50051` with insecure credentials (suitable for local development).

### Running the Server

```bash
npm install
npm run dev   # compiles TypeScript then runs dist/index.js
```

The server starts on port **50051**. A gRPC client (generated from the same `a.proto`) can then call `addPerson` and `getPersonByName` against that address.
