/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    token\n    user {\n      username\n    }\n  }\n}": types.LoginDocument,
    "\n  mutation Register($input: UserInput!) {\n    register(input: $input) {\n      token\n      user {\n        username\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      id\n      userId\n      title\n      description\n      notes\n      createdAt\n      dueDate\n      priority\n      updatedAt\n      completedTask\n    }\n  }\n": types.CreateTaskDocument,
    "\n  mutation DeleteTask($input: DeleteTaskInput!) {\n    deleteTask(input: $input)\n  }\n": types.DeleteTaskDocument,
    "\n  query Tasks {\n    tasks {\n      id\n      title\n      description\n      notes\n      createdAt\n      dueDate\n      priority\n      updatedAt\n      completedTask\n    }\n  }\n": types.TasksDocument,
    "mutation UpdateTask($input: UpdateTaskInput!) {\n  updateTask(input: $input) {\n    id\n  }\n}": types.UpdateTaskDocument,
    "\n    query CurrentUser {\n  currentUser {\n    id\n    username\n    password\n    avatar\n    createdAt\n    updatedAt\n    admin\n    email\n  }\n}": types.CurrentUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    token\n    user {\n      username\n    }\n  }\n}"): (typeof documents)["mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    token\n    user {\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($input: UserInput!) {\n    register(input: $input) {\n      token\n      user {\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($input: UserInput!) {\n    register(input: $input) {\n      token\n      user {\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      id\n      userId\n      title\n      description\n      notes\n      createdAt\n      dueDate\n      priority\n      updatedAt\n      completedTask\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      id\n      userId\n      title\n      description\n      notes\n      createdAt\n      dueDate\n      priority\n      updatedAt\n      completedTask\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTask($input: DeleteTaskInput!) {\n    deleteTask(input: $input)\n  }\n"): (typeof documents)["\n  mutation DeleteTask($input: DeleteTaskInput!) {\n    deleteTask(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Tasks {\n    tasks {\n      id\n      title\n      description\n      notes\n      createdAt\n      dueDate\n      priority\n      updatedAt\n      completedTask\n    }\n  }\n"): (typeof documents)["\n  query Tasks {\n    tasks {\n      id\n      title\n      description\n      notes\n      createdAt\n      dueDate\n      priority\n      updatedAt\n      completedTask\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateTask($input: UpdateTaskInput!) {\n  updateTask(input: $input) {\n    id\n  }\n}"): (typeof documents)["mutation UpdateTask($input: UpdateTaskInput!) {\n  updateTask(input: $input) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query CurrentUser {\n  currentUser {\n    id\n    username\n    password\n    avatar\n    createdAt\n    updatedAt\n    admin\n    email\n  }\n}"): (typeof documents)["\n    query CurrentUser {\n  currentUser {\n    id\n    username\n    password\n    avatar\n    createdAt\n    updatedAt\n    admin\n    email\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;