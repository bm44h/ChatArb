# =================================================================
# المرحلة الأولى: مرحلة الاعتماديات (Dependencies Stage)
# =================================================================
FROM node:20-slim AS deps

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev


# =================================================================
# المرحلة الثانية: مرحلة البناء (Builder Stage)
# =================================================================
FROM node:20-bookworm AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN apt-get update && apt-get install -y libgbm-dev libnss3 libasound2 libatk-bridge2.0-0 libgtk-3-0
RUN npx playwright install --with-deps chromium

# ✅ [الحل] أعدنا أمر بناء Next.js لإنشاء مجلد .next
RUN npm run build


# =================================================================
# المرحلة النهائية: مرحلة الإنتاج (Production Stage)
# =================================================================
FROM node:20-slim AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=10000

# انسخ فقط الملفات الضرورية من مرحلة البناء
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next  # <-- هذا السطر سيعمل الآن بنجاح
COPY --from=builder /root/.cache/ms-playwright /root/.cache/ms-playwright

EXPOSE 10000
CMD ["npm", "start"]
