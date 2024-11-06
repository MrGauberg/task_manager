FROM node:18
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . . 

RUN yarn build

RUN yarn global add http-server

CMD ["http-server", "-p", "9000", "/app/build"]
