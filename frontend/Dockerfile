# Node.js 이미지 버전을 업데이트하고 Yarn을 사용하여 의존성을 설치하는 Dockerfile

FROM node:14.18.0-alpine

# 이미지 내에서 명령을 실행할 디렉토리 설정
WORKDIR /react-to-do/frontend

# package.json 및 package-lock.json 파일을 복사한 후 의존성 설치
COPY package.json package-lock.json ./
RUN yarn install

# 소스 코드 복사
COPY . ./

# 애플리케이션이 사용할 포트 노출
EXPOSE 3000
