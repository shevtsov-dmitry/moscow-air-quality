FROM ghcr.io/graalvm/jdk:21 AS build

RUN microdnf install -y \
    maven \
    gcc \
    glibc-devel \
    zlib-devel \
    tar \
    gzip

WORKDIR /app
COPY . .

RUN ./mvnw -Pnative native:compile -DskipTests
