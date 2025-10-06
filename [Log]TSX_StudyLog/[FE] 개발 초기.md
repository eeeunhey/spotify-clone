
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime

{
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ],
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}

npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin dotenv-webpack babel-loader style-loader css-loader file-loader @svgr/webpack clean-webpack-plugin


const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                icon: true,
              },
            },
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?ver=[hash]",
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|jpeg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?ver=[hash]",
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      chunkFilename: "[name].js?ver=[hash]",
      filename: "[name].js?ver=[hash]",
      publicPath: "/",
    },
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      minimize: isProduction,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      new Dotenv({
        allowEmptyValues: true,
        systemvars: true,
      }),
    ],
  };
};

{
  "compilerOptions": {
    "target": "es6",
    "lib": [
      "dom",
      "dom.iterable",
      "es6",
      "esnext"
    ],
    "outDir": "./dist",
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "jsx": "react-jsx",
    "sourceMap": true
  },
  "include": [
    "src"
  ]
}


---
바벨 설치

npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime

---


### 🔍 에러 요약

```
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! Found: react@19.0.0
npm ERR! Could not resolve dependency:
npm ERR! peer react@"18.0.0" from @testing-library/react@13.4.0
```

즉,

* 프로젝트(spotify-demo)는 **React 19.0.0**을 설치하려고 함
* 그런데 **@testing-library/react@13.4.0** 패키지는

  > “난 React 18이 필요해요!”
  > 라고 명시해놨음

그래서 npm이 “이 둘은 맞지 않는다”고 판단하고 설치를 멈춘 거예요.

---

### 💡 원인 정리

| 원인                   | 설명                            |
| -------------------- | ----------------------------- |
| ✅ React 버전           | React 19 (최신)                 |
| ❌ Testing Library 버전 | React 18용만 지원                 |
| 결과                   | peerDependency 충돌 (버전 호환 안 됨) |

---

### 🧩 해결 방법 3가지

#### ✅ 방법 1. React 버전 낮추기 (안정적)

```bash
npm install react@18 react-dom@18
```

> 대부분의 라이브러리들이 아직 React 19를 완벽 지원하지 않아서,
> React 18로 내리는 게 제일 안전한 방법이에요.

그 다음 다시:

```bash
npm install
```

---

#### ✅ 방법 2. 강제로 설치하기 (임시 방편)

```bash
npm install --legacy-peer-deps
```

> “버전 충돌이 있어도 그냥 무시하고 설치해줘”라는 뜻이에요.
> 개발용 실험 프로젝트에는 쓸 수 있지만,
> 팀 프로젝트나 배포용에서는 **비추천**이에요.
> (나중에 예기치 못한 런타임 오류 날 수 있음)

---

#### ✅ 방법 3. Testing Library 버전 업데이트 (React 19 지원 여부 확인)

React 19를 쓰고 싶다면 아래 명령으로 최신 버전 확인:

```bash
npm info @testing-library/react
```

> 만약 `14.x` 이상에서 React 19 지원이 추가됐다면:

```bash
npm install @testing-library/react@latest
```

으로 최신 버전 맞춰주면 해결돼요.

---

### ⚙️ 추천 조합

| 상황                  | React 버전 | Testing Library 버전 | 명령어                                   |
| ------------------- | -------- | ------------------ | ------------------------------------- |
| **안정적 프로젝트용**       | 18.x     | 13.x               | `npm i react@18 react-dom@18`         |
| **최신 React 19 실험용** | 19.x     | 14.x 이상            | `npm i @testing-library/react@latest` |

---

### 🚀 요약

* 문제: React 19 ↔ Testing Library(React 18용) 호환 안 됨
* 해결책:

  1. React를 18로 낮춘다 (**가장 안정적**)
  2. Testing Library를 최신으로 올린다
  3. 급하면 `--legacy-peer-deps` 옵션으로 무시
