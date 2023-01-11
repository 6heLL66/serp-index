FROM node:18
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile 
RUN yarn build
EXPOSE ${PORT}
CMD [ "npx", "serve", "build" ]