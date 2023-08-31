FROM node:slim
RUN mkdir /dockerbook
COPY ./ /dockerbook
WORKDIR /dockerbook

RUN npm install

CMD npm run storybook

EXPOSE 6006
