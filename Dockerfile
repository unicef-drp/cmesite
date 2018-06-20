FROM node:latest

RUN apt-get update && apt-get install -y git vim-tiny

RUN npm install -g yarn

ENV HOME /root

RUN mkdir -p ~/.ssh
RUN ssh-keyscan -H gitlab.com >> ~/.ssh/known_hosts
RUN echo 'host gitlab.com' >> ~/.ssh/config
RUN echo '     identityfile /root/.ssh/gitlab' >> ~/.ssh/config
ADD etc/gitlab /root/.ssh/
RUN chmod 600 /root/.ssh/*


RUN git clone git@gitlab.com:eric-basley/childmortality.git /cm
WORKDIR /cm
RUN git checkout develop
RUN yarn
RUN yarn build
EXPOSE 80
CMD npx serve -s build
