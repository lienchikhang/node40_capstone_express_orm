from node:22

WORKDIR /home/clone-pinterest
COPY package*.json .

RUN yarn install --frozen-lockfile
COPY prisma ./prisma
RUN yarn prisma generate
COPY . .

RUN yarn run build


EXPOSE 8080

CMD ["node", "dist/main"]