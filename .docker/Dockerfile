# build stage
FROM node as build-stage

# working folder
RUN mkdir -p build
COPY ./code /build
WORKDIR /build

RUN npm install -g @angular/cli &&\
    npm install &&\
    ng build &&\
    rm -rf node_modules

# deploy stage
FROM nginx

# delete all into html nginx folder
RUN rm -rf /usr/share/nginx/html/*

# copy build to nginx
COPY --from=build-stage /build/dist/makerskills /usr/share/nginx/html

# run server
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
