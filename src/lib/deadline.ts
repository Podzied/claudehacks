// Public deadline: 11:00 AM EST, Sunday April 19, 2026.
// Hard cutoff (5-minute grace period for in-flight submissions): 11:05 AM EST = 16:05 UTC.
export const SUBMISSION_DEADLINE = new Date("2026-04-19T16:05:00Z");

export function isSubmissionsClosed(now: Date = new Date()): boolean {
  return now.getTime() >= SUBMISSION_DEADLINE.getTime();
}
