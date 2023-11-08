## Tworzenie środowiska wirtualnego:

``` python -m venv taxi_backend ```

Uruchomienie środowiska wirtualnego linux:

``` source taxi_backend/bin/activate ```

Uruchomienie środowiska wirtualnego Windows:

``` .\taxi_backend\Scripts\Activate.ps1  ```

## Instalacja

Aby zainstalować wszystkie niezbędne biblioteki Pythona, użyj następującej komendy:

``` pip install -r requirements.txt ```

### Uruchomienie projektu

#### Docker
1. Uruchom środowisko symulatora (docker-compose). Zawarty jest w nim broker MQTT, który jest potrzebny do działania backendu.
2. Będąc w katalogu `taxi-backend/taxi-backend` w którym znajduje się plik `docker-compose-yaml` wywołaj komendę:
```sudo docker-compose up ```

#### Lokalnie

``` python manage.py runserver ```

Po wykonaniu tej komendy, serwer deweloperski Django zostanie uruchomiony, 
a Twój projekt będzie dostępny pod adresem http://127.0.0.1:8000/ lub http://localhost:8000/ w przeglądarce.

## Dodawanie nowych bibliotek

Jeśli dodajesz nową bibliotekę do projektu, zaktualizuj plik requirements.txt za pomocą komendy pip freeze:

``` pip install nowa_biblioteka ```
``` pip freeze > requirements.txt ```


## Narzędzia do zarządzania kodem źródłowym

### `isort .`

- **Kiedy używać**: Narzędzie `isort` służy do sortowania importów w plikach źródłowych Pythona.
- **Dlaczego używać**: Sortowanie importów sprawia, że kod jest bardziej zorganizowany i zgodny z konwencją PEP 8. Używaj go, gdy chcesz uporządkować importy w swoim kodzie.

### `black .`

- **Kiedy używać**: Narzędzie `black` służy do automatycznego formatowania kodu źródłowego Pythona w jednolitym stylu.
- **Dlaczego używać**: Jednolity format kodu ułatwia czytanie i zarządzanie kodem. Używaj `black`, aby zachować spójność formatowania w projekcie.

### `flake8 .`

- **Kiedy używać**: Narzędzie `flake8` służy do sprawdzania kodu źródłowego Pythona pod kątem zgodności z konwencją PEP 8 i wykrywania błędów w kodzie.
- **Dlaczego używać**: `flake8` pomaga w utrzymaniu wysokiej jakości kodu i przestrzeganiu konwencji PEP 8. Używaj go, aby znaleźć potencjalne problemy w kodzie.

Używaj tych narzędzi, aby zadbać o jakość i spójność swojego kodu źródłowego.

## Migracje

Aby stworzyć migracje i zaktualizować bazę danych, wykonaj następujące kroki:

Utwórz migracje:

 ``` python manage.py makemigrations ```

Wykonaj migracje:

``` python manage.py migrate ```

## Uruchamianie testów

``` python manage.py test ```
