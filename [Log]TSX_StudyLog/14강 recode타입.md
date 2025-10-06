

## 📘 `Record` 타입이란?

`Record<키타입, 값타입>`
👉 **객체의 key와 value의 타입을 한 번에 정의할 수 있는 유틸리티 타입**

```ts
type StringNumberMap = Record<string, number>;
```

> 즉, **“키는 문자열, 값은 숫자”** 인 객체라는 뜻이에요.

```ts
const example: StringNumberMap = {
  apple: 3,
  orange: 5,
  mango: 5,
};
```

이처럼 **key-value 구조가 반복되지만 key 이름을 미리 알 수 없을 때**,
`Record`를 쓰면 편리합니다.

---

## 🍎 예제 1 — 고정된 키 이름이 있는 경우

```ts
type FruitColor = Record<"apple" | "orange" | "mango", string>;

const fruitColor: FruitColor = {
  apple: "red",
  orange: "orange",
  mango: "yellow",
};
```

> 💡 `"apple" | "orange" | "mango"` 이 3가지는 **고정된 키 집합**으로 동작하며,
> 누락되거나 잘못된 키를 쓰면 TypeScript가 **즉시 오류**를 알려줍니다.

---

## 🧠 이런 상황에 특히 유용해요

* 타입이 **동적으로 변할 때**
* 특정 타입이 **반복되어 정의될 때**
* enum, union 타입을 **객체 key로 사용할 때**
* 기존 타입이 **추가/변경될 수 있을 때 자동 반영**하고 싶을 때

---

## 👑 예제 2 — 역할(Role)에 따른 권한(Permission)

```ts
type UserRole = "admin" | "user" | "guest" | "owner";

// 기존 방식
type RolePermission = {
  admin: string;
  user: string;
  guest: string;
};

// Record로 개선
type RolePermission2 = Record<UserRole, string>;
```

이렇게 정의하면 새로운 Role이 추가되어도 자동으로 반영됩니다 👇

```ts
type UserRole = "admin" | "user" | "guest" | "owner";

const rolePermission: RolePermission2 = {
  admin: "모든 권한",
  user: "일반 접근",
  guest: "읽기 전용",
  owner: "관리자 설정 가능", // ✅ 새 role 자동 반영
};
```

> 🎯 **핵심 포인트:**
> `Record`를 사용하면 `UserRole`이 확장되어도 **모든 키를 빠짐없이 정의하도록 강제**하므로,
> 타입 안정성을 유지하면서 자동으로 업데이트됩니다.

---

## 📦 예제 3 — 상품 인벤토리 (이미지 내용)

```ts
type Product = {
  id: string;
  name: string;
  price: number;
};

type ProductInventory = Record<string, Product>;

const inventoryResponse: ProductInventory = {
  apple: { id: "2", name: "apple", price: 2000 },
  orange: { id: "3", name: "orange", price: 2000 },
};
```

* 키는 상품명(`string`)
* 값은 `Product` 타입 객체
  → 즉, **“상품 이름 → 상품 정보”** 구조를 정확히 표현

---

## ✅ 요약 정리표

| 구문             | 설명                            | 예시                                     |                    |
| -------------- | ----------------------------- | -------------------------------------- | ------------------ |
| `Record<K, T>` | K를 key, T를 value로 하는 객체 타입    | `Record<string, number>`               |                    |
| 키를 모를 때        | 자유로운 문자열 키                    | `{ [key: string]: number }` 대신 사용      |                    |
| 키를 알 때         | 리터럴 유니온 키                     | `Record<'apple'                        | 'orange', string>` |
| 확장 가능성         | 유니온 타입 변경 시 자동 반영             | `UserRole` 늘어나면 자동 업데이트                |                    |
| 주용도            | 반복되는 객체 구조, 맵핑 타입, 권한/카테고리 관리 | `RolePermission`, `ProductInventory` 등 |                    |

