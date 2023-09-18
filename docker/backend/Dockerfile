FROM node:16

WORKDIR /app/backend

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend /app/backend/

EXPOSE 5000

CMD [ "npm", "start" ]
