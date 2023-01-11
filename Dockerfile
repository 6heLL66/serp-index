FROM node:18
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile 
RUN yarn build
EXPOSE ${PORT:8080}
CMD [ "npx", "serve", "build" ]