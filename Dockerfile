### STAGE 1: Build

FROM node:latest as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build

### STAGE 2: Run

FROM nginx:latest
COPY --from=build /usr/local/app/dist/angular-itunes-player /usr/share/nginx/html
EXPOSE 80