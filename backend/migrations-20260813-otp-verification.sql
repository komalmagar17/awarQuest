-- OTP verification support for AwarQuest
-- Run once against your PostgreSQL database.

ALTER TABLE "Users" ADD COLUMN IF NOT EXISTS "emailVerified" BOOLEAN NOT NULL DEFAULT false;

CREATE TABLE IF NOT EXISTS "OtpCodes" (
  "id" UUID PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES "Users"("id") ON DELETE CASCADE,
  "email" VARCHAR(255) NOT NULL,
  "codeHash" VARCHAR(255) NOT NULL,
  "purpose" VARCHAR(255) NOT NULL CHECK ("purpose" IN ('login', 'register')),
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "maxAttempts" INTEGER NOT NULL DEFAULT 5,
  "expiresAt" TIMESTAMPTZ NOT NULL,
  "consumedAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "otp_codes_user_purpose" ON "OtpCodes" ("userId", "purpose");
CREATE INDEX IF NOT EXISTS "otp_codes_expires_at" ON "OtpCodes" ("expiresAt");
