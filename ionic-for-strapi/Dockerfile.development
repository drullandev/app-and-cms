FROM node:14.16

COPY . /www/app

# ADD . $app_port
# ARG app_port
# ENV APP_PORT=$app_port

ARG ssh_prv_key
ARG ssh_pub_key

RUN npm install -g cordova @ionic/cli  @ionic/cli @ionic-native/core @ionic-native/geolocation @awesome-cordova-plugins/core @awesome-cordova-plugins/core
RUN npm install -g bower
RUN npm install -g gulp

WORKDIR /www/app

# Install dependencies, fund and fix
RUN npm install --force
RUN npm fund
RUN npm audit fix

RUN npm i serve -g
ENV NODE_ENV production
RUN ionic build --prod

EXPOSE 3000

CMD ["serve", "-s", "build", "-p", "3000"]