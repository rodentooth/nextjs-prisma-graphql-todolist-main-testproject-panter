import { makeSchema, queryType } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";

import * as userTypes from "./types/User";
import * as todoListTypes from "./types/TodoList";
import * as todoItemTypes from "./types/TodoItem";
import * as todoItemTypesInput from "./types/TodoItemsInput";
import { join } from "path";
export const schema = makeSchema({
  types: [userTypes, todoListTypes, todoItemTypes, todoItemTypesInput],
  plugins: [nexusPrisma()],

  contextType: {
    module: join(process.cwd(), "src", "graphql", "context.ts"),
    export: "Context",
  },
  outputs: {
    schema: true, // means schema.graphql in the root
    typegen: join(
      process.cwd(),
      "node_modules/@types/nexus-typegen-custom/index.d.ts"
    ),
  },
});
