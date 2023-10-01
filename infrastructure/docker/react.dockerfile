FROM node:18-alpine as builder

COPY ./react /app
WORKDIR /app

RUN yarn install && \
    yarn run build

# Production
FROM node:18-alpine

COPY --from=builder /app /app
WORKDIR /app

ENTRYPOINT [ "yarn" ]
CMD [ "run", "start" ]
