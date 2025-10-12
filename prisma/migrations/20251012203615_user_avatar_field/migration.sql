-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" VARCHAR(255);

-- Update existing users' avatar URLs
UPDATE "users" SET "avatar" = 'https://api.dicebear.com/9.x/thumbs/svg?seed=Brian'     WHERE "email" = 'joao@example.com';
UPDATE "users" SET "avatar" = 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maria'     WHERE "email" = 'maria@example.com';
UPDATE "users" SET "avatar" = 'https://api.dicebear.com/9.x/thumbs/svg?seed=Mason'     WHERE "email" = 'carlos@example.com';
UPDATE "users" SET "avatar" = 'https://api.dicebear.com/9.x/thumbs/svg?seed=Alexander' WHERE "email" = 'ana@example.com';
