FROM node:14-alpine
COPY . /app
WORKDIR /app
RUN ls
ENV NODE_ENV=production
RUN npm install --production
EXPOSE 5000
WORKDIR /app/client
RUN npm install --production
ENV REACT_APP_API_ENDPOINT=https://wsusn.nlaha.com
RUN npm run build
WORKDIR /app
CMD ["npm", "start"]
