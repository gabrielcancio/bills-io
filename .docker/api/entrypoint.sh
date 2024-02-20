#!/bin/sh
npm ci && \
npx prisma migrate dev && \
npm run dev