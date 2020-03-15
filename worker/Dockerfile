FROM node:13.0-alpine
WORKDIR '/app'
COPY ./package.prod.json ./package.json
RUN npm install
COPY ./[^P]* ./
CMD ["npm", "run", "start"]