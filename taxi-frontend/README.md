# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Instalacja pakietów
``` npm install ```

## Uruchomienie aplikacji

``` npm run dev ```

Po wykonaniu tej komendy, serwer deweloperski będzie dostępny pod adresem http://localhost:5173/ w przeglądarce ().

## Linter + formatowanie

Uruchomienie lintera: (ESLint)

``` npm run lint ```

Ustawienia ESLint są zdefiniowane w pliku `.eslintrc.cjs`

Uruchomienie formatera (Prettier):
``` npm run prettier ```

Ustawienia Prettier są zdefiniowane w pliku `.prettierrc`

## Docker

Zbudowanie kontenera:

``` docker build -t vite-app . ```

Uruchomienie kontenera:

``` docker run -p 80:80 vite-app ```

Docker compose (z pominięciem cache):

``` docker-compose up --build --force-recreate --no-deps ```

## Zmienne środowiskowe

W folderze root projektu frontendowego znajduje się plik `.env.template`. Do poprawnego działania aplikacji należy stworzyć jego kopię i zmienić nazwę na `.env`.

Opis zmiennych środowiskowych:
- VITE_APP_API_URL - pełny adres aplikacji backendowej

Przykładowa zawartość pliku `.env`:
```
   VITE_APP_API_URL=http://localhost:8000
```
