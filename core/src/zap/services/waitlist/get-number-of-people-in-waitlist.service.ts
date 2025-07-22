import "server-only";

import { Effect } from "effect";

import { getNumberOfPeopleInWaitlistQuery } from "@/zap/db/queries/waitlist.query";

export async function getNumberOfPeopleInWaitlistService() {
  const effect = Effect.gen(function* () {
    const result = yield* Effect.tryPromise(() =>
      getNumberOfPeopleInWaitlistQuery.execute(),
    );

    const record = result[0];

    if (!record) {
      return yield* Effect.fail(new Error("Error fetching waitlist count"));
    }

    return record.count;
  });

  return await Effect.runPromise(effect);
}
