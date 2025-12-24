import { QueryBlock } from "../tailwindsql.config";

export function UserList() {
  return (
    <QueryBlock query="select-[id,name,email] from-[User]">
      {(users) => (
        <ul className="space-y-2">
          {users.map((user: any) => (
            <li
              key={user.id}
              className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800"
            >
              <span className="font-medium">{user.name ?? "Anonymous"}</span>
              <span className="text-sm opacity-60 ml-2">{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </QueryBlock>
  );
}

export function AllUsers() {
  return <QueryBlock query="select-all from-[User]" />;
}

