FROM php:7.2-fpm-alpine

RUN docker-php-ext-install pdo pdo_mysql mysqli

ADD https://raw.githubusercontent.com/mlocati/docker-php-extension-installer/master/install-php-extensions /usr/local/bin/

RUN chmod uga+x /usr/local/bin/install-php-extensions && sync && \
    install-php-extensions imagick zip