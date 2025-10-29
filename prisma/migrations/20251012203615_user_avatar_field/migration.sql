-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" VARCHAR(255);

-- Update existing users' avatar URLs
UPDATE "users" SET "avatar" = 'https://api.dicebear.com/9.x/thumbs/svg?seed=joao@example.com'     WHERE "email" = 'joao@example.com';
UPDATE "users" SET "avatar" = 'https://api.dicebear.com/9.x/thumbs/svg?seed=maria@example.com'     WHERE "email" = 'maria@example.com';
UPDATE "users" SET "avatar" = 'https://api.dicebear.com/9.x/thumbs/svg?seed=carlos@example.com'     WHERE "email" = 'carlos@example.com';
UPDATE "users" SET "avatar" = 'https://api.dicebear.com/9.x/thumbs/svg?seed=ana@example.com' WHERE "email" = 'ana@example.com';
