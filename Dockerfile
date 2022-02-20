FROM node:14-alpine
COPY . /app
WORKDIR /app
RUN ls
ENV NODE_ENV=production
RUN npm install --production --silent
EXPOSE 5000
WORKDIR /app/client
RUN npm run install --production --silent
RUN npm run build
WORKDIR /app
CMD ["npm", "start"]
