FROM node:18
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile 
RUN yarn build
EXPOSE 80
CMD [ "npx", "serve", "build" ]