# Mobile Challenge — English Dictionary

Aplicativo móvel para consultar palavras em inglês, ouvir a pronúncia e organizar o histórico e os favoritos por conta de usuário.

> This is a challenge by [Coodesh](https://coodesh.com/).

## Funcionalidades

- Lista de palavras em inglês carregada do dicionário local do projeto.
- Busca de definições e fonética pela [Free Dictionary API](https://dictionaryapi.dev/).
- Reprodução de áudio da palavra.
- Cadastro e login com e-mail e senha pelo Firebase Authentication.
- Histórico de consultas e favoritos associados ao usuário e persistidos localmente.
- Cache local das definições consultadas.

## Tecnologias

- TypeScript
- React Native CLI 0.88.0 e React 19.3.0
- React Navigation
- Firebase Authentication
- AsyncStorage
- Free Dictionary API
- React Native Speech
- Jest e React Native Testing Library

## Requisitos

- Node.js 22.11 ou superior.
- Yarn 3.6.4 (versão indicada em `package.json`).
- Android: Android Studio, Android SDK e JDK compatível com a versão do React Native.
- iOS: macOS, Xcode e CocoaPods.
- Projeto Firebase com o provedor de autenticação por e-mail e senha habilitado.

## Instalação

Clone o repositório

Em seguida, execute:

```sh
yarn install
```

Para iOS, instale também os pods:

```sh
cd ios
pod install
cd ..
```

## Executar o aplicativo

Inicie o Metro:

```sh
yarn start
```

Em outro terminal, execute para a plataforma desejada:

```sh
yarn android
```

```sh
yarn ios
```

## Verificações

```sh
yarn lint
yarn typecheck
yarn test
```

As regras para ignorar dependências, builds e arquivos locais estão em [.gitignore](.gitignore).
