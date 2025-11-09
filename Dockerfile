# =================================================================
# المرحلة الأولى: مرحلة الاعتماديات (Dependencies Stage)
# هذه المرحلة الآن فقط لتسريع التخزين المؤقت
# =================================================================
FROM node:20-slim AS deps

WORKDIR /app
COPY package*.json ./
# سنقوم بتثبيت كل شيء هنا للاستفادة من التخزين المؤقت
RUN npm install


# =================================================================
# المرحلة الثانية: مرحلة البناء (Builder Stage)
# =================================================================
FROM node:20-bookworm AS builder

WORKDIR /app

# ✅ [الحل] انسخ كل شيء من المرحلة السابقة، بما في ذلك جميع الاعتماديات
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# لا حاجة لتشغيل npm install مرة أخرى هنا

RUN apt-get update && apt-get install -y libgbm-dev libnss3 libasound2 libatk-bridge2.0-0 libgtk-3-0
RUN npx playwright install --with-deps chromium

# هذا الأمر سيعمل الآن لأن typescript مثبت
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
# 🔴 [تعديل مهم] سننسخ node_modules من مرحلة البناء، ولكن يجب أن نعيد تشغيل npm install --omit=dev
# الحل الأفضل هو نسخ package.json وتشغيل npm install --omit=dev هنا
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /root/.cache/ms-playwright /root/.cache/ms-playwright

EXPOSE 10000
CMD ["npm", "start"]
