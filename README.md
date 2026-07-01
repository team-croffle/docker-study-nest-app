# Memo App Backend (Docker Study)

이 프로젝트는 팀원들과 **Docker 및 Docker Compose**를 스터디하기 위해 만들어진 간단한 메모장(Memo) 백엔드 애플리케이션입니다. [NestJS](https://nestjs.com/) 프레임워크를 기반으로 작성되었으며, 메모리 기반(In-memory)으로 동작하도록 구현되어 있어 별도의 데이터베이스 셋업 없이 바로 실행하고 테스트해 볼 수 있습니다.

## 🚀 기술 스택

- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Package Manager**: Yarn (Berry)
- **Containerization**: Docker

## 🐳 Docker로 컨테이너 실행하기 (과제)

이 프로젝트는 Docker 스터디를 위해 `Dockerfile`이 `.gitignore`에 추가되어 있어 저장소에 포함되어 있지 않습니다.
여러분이 직접 `Dockerfile`을 작성하여 빌드하고 실행해 보세요!

### 1. Dockerfile 작성하기

프로젝트 루트 디렉토리(`nest-app`)에 `Dockerfile`을 생성하고, Node.js 환경에서 NestJS 앱이 실행될 수 있도록 스크립트를 작성합니다.

### 2. Docker 이미지 빌드하기

작성한 `Dockerfile`을 바탕으로 다음 명령어를 실행하여 이미지를 빌드합니다.

```bash
docker build -t memo-backend .
```

### 3. Docker 컨테이너 실행하기

빌드된 이미지를 기반으로 컨테이너를 실행합니다.

```bash
docker run -p 3000:3000 -d --name memo-backend-container memo-backend
```

컨테이너가 정상적으로 실행되면 `http://localhost:3000` 에서 서버가 동작합니다.

---

## 💻 로컬(Local) 개발 환경에서 실행하기

Docker 환경이 아닌 로컬에서 직접 개발 및 실행하는 방법입니다. Node.js 환경이 필요합니다.

### 1. 패키지 설치

이 프로젝트는 패키지 매니저로 Yarn을 사용합니다.

```bash
yarn install
```

### 2. 애플리케이션 실행

```bash
# 개발 모드 (코드 변경 감지 시 자동 재시작)
yarn start:dev

# 프로덕션 빌드 후 실행
yarn build
yarn start:prod
```

---

## 📖 API 명세 (Endpoints)

Base URL: `http://localhost:3000/api/v1/notes`

| HTTP Method | Endpoint | 설명                | Request Body (JSON)                          |
| ----------- | -------- | ------------------- | -------------------------------------------- |
| **GET**     | `/`      | 모든 메모 목록 조회 | -                                            |
| **GET**     | `/:id`   | 특정 메모 단건 조회 | -                                            |
| **POST**    | `/`      | 새 메모 생성        | `{"title": "string", "content": "string"}`   |
| **PATCH**   | `/:id`   | 특정 메모 수정      | `{"title"?: "string", "content"?: "string"}` |
| **DELETE**  | `/:id`   | 특정 메모 삭제      | -                                            |

### API 테스트 예시 (cURL)

**새로운 메모 작성하기 (POST)**

```bash
curl -X POST http://localhost:3000/api/v1/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "Docker 스터디 준비", "content": "docker-compose.yml 파일 작성하기"}'
```

**모든 메모 조회하기 (GET)**

```bash
curl http://localhost:3000/api/v1/notes
```

---

## 🎯 Docker Compose 스터디 목표 추천

이 백엔드 애플리케이션을 활용하여 팀원들과 다음과 같은 실습을 진행해 보세요!

1. **단일 서비스 띄우기**: `docker run` 명령어를 `docker-compose.yml` 파일로 변환하여 백엔드 서버를 띄워보기.
2. **프론트엔드와 연결하기**: `react-app`과 같은 프론트엔드 컨테이너와 백엔드 컨테이너를 하나의 `docker-compose.yml`에 구성해보기.
3. **네트워크(Network) 설정**: Compose 내에서 생성되는 디폴트 브릿지 네트워크를 확인하고, 컨테이너 간 이름으로 통신(`http://backend:3000`)해보기.
