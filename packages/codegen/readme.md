# @syncify/codegen

A streamlined tool for extracting a normalized GraphQL introspection schema from the Shopify GraphQL API. This module serves as a drop-in replacement for generating clean, concise types when working with Shopify's GraphQL schema. It operates as a post-processing step, enabling selective extraction of only the types you need.

### Key Features

- **Selective Type Extraction**: Cherry-pick specific types from the GraphQL schema, reducing clutter.
- **Scalar Normalization**: Enforces native type narrowing for cleaner definitions.
- **Controlled Depth Extraction**: Includes sensible logic to limit schema depth.
- **Accurate Mutation Payloads**: Generates types that match actual response structures.
- **Query-Specific Types**: Tailors object types for read operations.

### Why Not Use Shopify’s Codegen Preset?

While Shopify’s open-source tools are commendable, their codegen preset falls short for practical use. It produces a bloated 55k-line definition file, overwhelming the TypeScript parser. Even with caching, this massive output slows down IntelliSense, hampering developer productivity. Native codegen lacks selective type extraction, forcing you to grapple with the full introspection schema when you may only need a handful of interfaces. This module addresses these pain points with a smarter, more efficient approach.

---

## Installation

Install `@syncify/codegen` as a devDependency in your project:

```bash
pnpm add @syncify/codegen -D
```

### Prerequisites

- **Node.js** (>= 14.x)
- **GraphQL Codegen** (`@graphql-codegen/cli`, `@graphql-codegen/typescript`)
- **TypeScript** (>= 4.x)
- **Prettier** (optional, for formatting output)

Ensure you have the GraphQL Codegen CLI installed globally or as a dev dependency:

```bash
pnpm install --save-dev @graphql-codegen/cli @graphql-codegen/typescript
```

# Configuration

`@syncify/codegen` accepts the following configuration options in your `codegen.yml`:

| Option           | Type       | Default    | Description                                                                                      |
| ---------------- | ---------- | ---------- | ------------------------------------------------------------------------------------------------ |
| `pickTypes`      | `string[]` | `[]`       | Array of type names to include in the output (e.g., `["Market", "Translation"]`).                |
| `depthInclusion` | `number`   | `Infinity` | Maximum depth for including type dependencies (e.g., `2` includes two levels of dependencies).   |
| `skipTypeName`   | `boolean`  | `false`    | Excludes `__typename` fields from the generated types (passed to `@graphql-codegen/typescript`). |

### Example Configuration

```yaml
generates:
  ./generated/types.ts:
    plugins:
      - 'typescript'
      - '@syncify/codegen'
    config:
      pickTypes: ['Market', 'Translation']
      depthInclusion: 1
      skipTypeName: true
```

- **`pickTypes`**: Includes `Market`, `Translation`, and default types (`DisplayableError`, `PageInfo`, `UserError`, `Node`).
- **`depthInclusion: 1`**: Includes direct dependencies of the picked types (depth 1).
- **`skipTypeName: true`**: Omits `__typename` fields from the output.

---

## Features in Detail

### Scalar Normalization

Maps GraphQL scalars to appropriate TypeScript types, reducing reliance on `any`:

- `ID`, `String`, `DateTime` → `string`
- `Int`, `Float` → `number`
- `Boolean` → `boolean`
- `JSON` → `Record<string, any>`

### Controlled Depth Extraction

Use `depthInclusion` to limit how deeply dependencies are extracted:

- `depthInclusion: 0`: Only the picked types.
- `depthInclusion: 1`: Picked types and their direct dependencies (default).
- `depthInclusion: Infinity`: All dependencies.

### Accurate Mutation Payloads

Transforms mutation payloads (e.g., `SomeMutationPayload`) into a normalized form (e.g., `MutationSomeMutation`), wrapping the response in a single property:

**Input**:

```typescript
type SomeTypeNamePayload = {
  someResult?: SomeType;
  userErrors: UserError[];
};
```

**Output**:

```typescript
export type MutationSomeTypeName = {
  someTypeName: { someResult: SomeType };
};
```

### Query-Specific Types

Generates query-specific types from `QueryRoot`, structuring them as single-property objects, unwrapping `Maybe` where appropriate:

**Input**:

```typescript
type QueryRoot = {
  product: Maybe<Product>;
};
```

**Output**:

```typescript
export type QueryProduct = {
  product: Product;
};
```

---

## Example

Here’s a complete example to generate types for a Shopify schema.

### `codegen.yml`

```yaml
schema: 'https://your-shopify-store.myshopify.com/api/2024-07/graphql.json'
generates:
  ./generated/types.ts:
    plugins:
      - 'typescript'
      - '@syncify/codegen'
    config:
      pickTypes: ['Product', 'Order']
      depthInclusion: 2
```

### Run the Command

```bash
npx graphql-codegen --config codegen.yml
```

### Output (`generated/types.ts`)

```typescript
/* eslint-disable no-use-before-define */

/**
 * Represents a product in the shop.
 */
export type Product = {
  id: string;
  title: string;
  variants: Variant[];
};

/**
 * Represents an order placed in the shop.
 */
export type Order = {
  id: string;
  totalPrice: string;
  lineItems: LineItem[];
};

/**
 * Default type always included.
 */
export type DisplayableError = {
  field?: Array<string>;
  message: string;
};

// ... other default types (PageInfo, UserError, Node)
```

---

## Troubleshooting

### "Type X not found in source"

- **Cause**: A type specified in `pickTypes` doesn’t exist in the schema.
- **Solution**: Verify the type name against the schema (case-sensitive). Check the API version in your `schema` URL.

### Output File Too Large

- **Cause**: High `depthInclusion` value or complex types with many dependencies.
- **Solution**: Reduce `depthInclusion` (e.g., `depthInclusion: 1`) or pick fewer types.

### Missing `__typename` Fields

- **Cause**: `skipTypeName: true` removes `__typename` from the output.
- **Solution**: Set `skipTypeName: false` if you need these fields.
