FROM node:10.15.3
WORKDIR /usr/src/app
COPY . .
RUN npm i yarn -g
RUN yarn
CMD [ "yarn", "start" ]
EXPOSE 3000
