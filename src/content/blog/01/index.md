---
title: "🗂️ 프로젝트 공통 유틸리티 (1)"
description: ""
date: "2024-08-02"
---

---

## ⚙️ swagger

![](https://velog.velcdn.com/images/leemiyeonn/post/768e1f90-c402-4ec9-adde-3fd35af03c84/image.png)

### 🔗

http://localhost:8080/swagger-ui/index.html

## ⚙️ api 표준 응답 형식

### 🤔❔

표준화된 응답 형식:
API 응답을 일관된 형식으로 제공하여 클라이언트가 응답을 예측하고 처리하기 쉽게 합니다.

명확한 성공 및 오류 처리:
성공 및 오류 상황에 대한 명확한 처리를 통해 코드의 가독성과 유지보수성을 높입니다.

제네릭 타입 지원:
제네릭 타입을 사용하여 다양한 타입의 데이터를 유연하게 처리할 수 있습니다.

유효성 검사:
@Valid 어노테이션을 사용하여 응답 데이터의 유효성을 검증합니다.

![](https://velog.velcdn.com/images/leemiyeonn/post/631c234b-1ba1-499a-becf-0af1bd3a372c/image.png)
![](https://velog.velcdn.com/images/leemiyeonn/post/6e5b429f-bf20-4981-bf25-11e27eb0d4ed/image.png)

### 🤔❓

```
public class Api<T> {

    private Result result; // 응답 결과를 나타내는 Result 객체입니다.

    @Valid
    private T body; // 실제 응답 데이터가 담기는 제네릭 타입 T의 객체입니다.


```

## ⚙️ custom annotation

### 🤔❔

스프링의 @Service 어노테이션을 기반으로 생성해 스프링의 의존성 주입 기능을 그대로 활용하면서,
커스텀 어노테이션을 통해 해당 클래스가 어떤 역할을 하는지 명확히 표시할 수 있습니다.

![](https://velog.velcdn.com/images/leemiyeonn/post/c6ea1fa8-d1ff-4db4-a2b8-d909e3ff0e71/image.png)

### 🤔❓

#### @Service

##### 역할:

@Service는 Spring에서 서비스 레이어를 표시하는 데 사용됩니다.
Spring이 해당 클래스를 서비스 빈으로 등록하도록 합니다.

##### 적용 대상:

클래스.

##### 기본 동작:

Spring 컨텍스트에서 자동으로 빈으로 등록됩니다.

#### @Target(ElementType.TYPE)

##### 역할:

어노테이션을 어디에 적용할 수 있는지 지정합니다.
여기서는 클래스, 인터페이스, 그리고 enum 타입에 적용할 수 있습니다.

##### 적용 대상:

클래스, 인터페이스, enum.

#### @Retention(RetentionPolicy.RUNTIME)

##### 역할:

어노테이션이 언제까지 유지될지를 지정합니다.
RUNTIME으로 설정하면, 어노테이션 정보가 런타임 시까지 유지되며 리플렉션을 통해 접근할 수 있습니다.

##### 적용 대상:

런타임.

#### @AliasFor(annotation = Service.class)

##### 역할:

이 어노테이션은 다른 어노테이션의 속성을 대리(alias)할 수 있게 합니다.
여기서는 @Service 어노테이션의 value 속성을 대리합니다.

##### 적용 대상:

어노테이션 속성.

##### 기본 동작:

@Service 어노테이션의 value 속성과 연결되어,
@UserSession, @Converter, @Business 어노테이션의 value 속성을 설정하면
자동으로 @Service 어노테이션의 value 속성도 설정됩니다.
