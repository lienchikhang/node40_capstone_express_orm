from node:22

WORKDIR /src
COPY package*.json ./

# RUN yarn install --frozen-lockfile
# RUN yarn add sharp --ignore-engines
# RUN npm install --os=linux --cpu=x64 sharp
RUN npm install --unsafe-perm --frozen-lockfile
RUN npm i @prisma/client@latest
RUN yarn prisma generate
COPY . .

RUN npm run build


EXPOSE 8080

CMD ["node", "dist/main"]