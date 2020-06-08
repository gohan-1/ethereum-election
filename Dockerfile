FROM node:8

USER root

####################################################################################################################
# Env
ENV VERSION "0.8"
ENV COMMAND "migrate"
ENV API_HOST "0.0.0.0"
ENV API_PORT "3000"
ENV NETWORK "development"
ENV SRC_DIR "./"
# ENV GIT_BRANCH "master"
# ENV GIT_FOLDER "/"
# ENV TRUFFLE_VERSION "5.0.5"
# ENV GIT_URL "https://github.com/gohan-1/Ethereumtoken.git"

####################################################################################################################
# Install
RUN npm install -g truffle@$TRUFFLE_VERSION && npm config set bin-links false

####################################################################################################################
# Create project directory
RUN mkdir -p $SRC_DIR


####################################################################################################################
# Scripts
ADD ./run.sh /run.sh
ADD ./package.json /package.json
# ADD ./.scripts/api.js /scripts/api.js

RUN chmod +x /run.sh

####################################################################################################################
# Run

HEALTHCHECK --interval=5s \
            --timeout =5s \
            RUN curl -f http://127.0.0.1:8000|| exit 1 

EXPOSE $API_PORT

WORKDIR $SRC_DIR

CMD ["/scripts/run.sh"]



MAINTAINER vishnu: $VERSION