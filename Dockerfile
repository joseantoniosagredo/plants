FROM node
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install
