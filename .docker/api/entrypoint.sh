#!/bin/sh
npm ci && \
npx prisma migrate deploy && \
npm run dev
