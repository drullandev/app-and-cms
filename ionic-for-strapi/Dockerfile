FROM node:14.16

COPY . /www/app

#ARG ssh_prv_key
#ARG ssh_pub_key

RUN npm install -g cordova ionic
RUN npm install -g bower
#RUN npm install -g gulp

# Setup for ssh onto github
#RUN mkdir -p /root/.ssh
#ADD id_rsa /root/.ssh/id_rsa
#RUN chmod 700 /root/.ssh/id_rsa
#RUN echo "Host github.com\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config

WORKDIR /www/app
RUN npm i --force

EXPOSE 8100 443

ENTRYPOINT ["ionic"]
CMD ["serve", "poll", "1000", "8100", "--address", "0.0.0.0"]