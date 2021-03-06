import { io } from "./deps_test.ts";
import { WorkerReader, WorkerWriter } from "./mod.ts";

async function main(): Promise<void> {
  // deno-lint-ignore no-explicit-any
  const worker = self as any;
  const reader = new WorkerReader(worker);
  const writer = new WorkerWriter(worker);

  for await (const data of io.iter(reader)) {
    await io.writeAll(writer, data);
  }
}

main().catch((e) => console.error(e));
