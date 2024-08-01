---
title: "🗂️ 프로젝트 공통 유틸리티 (2)"
description: ""
date: "2024-08-03"
---

---

## ⚙️ custom error code

### 🤔❔

일관성:
애플리케이션 전체에서 사용할 수 있는 표준화된 에러 코드 세트를 제공합니다.

명확성:
각 에러 상황에 대해 구체적인 코드와 설명을 제공하여, 클라이언트가 에러의 원인을 쉽게 이해할 수 있습니다.

유지보수성:
중앙에서 관리되는 에러 코드는 수정과 추가가 용이하며, 전체 애플리케이션에 일관되게 적용될 수 있습니다.

문서화:
API 문서 작성 시 이 enum을 기반으로 가능한 모든 에러 응답을 명확하게 문서화할 수 있습니다.

![](https://velog.velcdn.com/images/leemiyeonn/post/219f0265-92e7-4265-b54f-f42ed6041f01/image.png)

## ⚙️ custom exception

### 🤔❔

에러 정보 캡슐화:
ErrorCodeIfs와 함께 사용하여, 예외가 발생한 상황에 대한 모든 필요한 정보를 한 곳에 모을 수 있습니다.

일관된 예외 처리:
글로벌 예외 핸들러에서 이 커스텀 예외를 처리함으로써, 일관된 형식의 에러 응답을 생성할 수 있습니다.

비즈니스 로직과 에러 처리 분리:
비즈니스 로직에서 이 예외를 던지고, 별도의 계층에서 처리함으로써 관심사를 분리할 수 있습니다.

세밀한 예외 처리:
애플리케이션의 특정 상황에 맞는 예외를 정의하여, 더 정확하고 의미 있는 에러 처리가 가능합니다.

추적성 향상:
커스텀 예외를 사용하면 예외가 발생한 정확한 지점과 원인을 더 쉽게 추적할 수 있습니다.

![](https://velog.velcdn.com/images/leemiyeonn/post/43c5c92d-c980-4fbd-8b26-e2671978133b/image.png)

## ⚙️ custom exception handler

### 🤔❔

커스텀 예외 우선 처리:
ApiExceptionHandler에 Integer.MIN_VALUE를 지정함으로써, 이 핸들러가 가장 먼저 실행됩니다.
이는 애플리케이션에서 정의한 특정 API 예외들을 가장 먼저, 그리고 더 세밀하게 처리할 수 있게 합니다.

폴백 메커니즘:
GlobalExceptionHandler에 Integer.MAX_VALUE를 지정하여, 이 핸들러가 가장 마지막에 실행되도록 합니다.
이는 다른 모든 예외 처리기에서 잡지 못한 예외들을 최종적으로 처리하는 '안전망' 역할을 합니다.

예외 처리의 계층화:
이러한 구조는 예외 처리를 계층화하여, 더 구체적인 예외부터 처리하고 점점 일반적인 예외로 넘어가는 구조를 만듭니다.

![](https://velog.velcdn.com/images/leemiyeonn/post/edddf9e6-37d0-4f08-894d-8ba1489f98b1/image.png)
![](https://velog.velcdn.com/images/leemiyeonn/post/d25ac4df-3aa6-402a-974b-09fd37f69f81/image.png)

### 🤔❓

#### @RestControllerAdvice

전역 예외 처리:
애플리케이션 전체에서 발생하는 예외를 중앙에서 처리할 수 있게 해줍니다.
@ExceptionHandler 메서드를 사용하여 특정 예외 타입에 대한 처리 로직을 정의할 수 있습니다.

REST API 응답 형식:
@RestControllerAdvice는 @ControllerAdvice와 @ResponseBody를 결합한 것입니다.
이는 메서드의 반환값이 자동으로 HTTP 응답 본문으로 변환됨을 의미합니다.

애플리케이션 전체 범위:
기본적으로 모든 컨트롤러에 적용됩니다.
특정 패키지나 클래스에만 적용되도록 설정할 수도 있습니다.
