# Тестовое задание "Effective Mobile"

## Перед запуском

Перед запуском убедитесь, что сервер PostgreSQL включен. Переменные окружения добавлены как .env.example файлах для каждого сервиса.

## Структура проекта

- **/products_history_service** — Сервис для сохранения истории изменений товаров и остатков.
- **/remaining_goods_service** — Сервис для работы с магазинами, продуктами и остатками.
- **/user_service** — Сервис для работы с пользователями.

## Установка и команды

В корне проекта выполните команду:

```bash
npm run install
```

Миграция базы данных:

```bash
npm run migrate
```

## Запуск приложения

В одном консольном окне выполните команду для запуска сервиса истории:

```bash
npm run start-history
```

В другом консольном окне выполните команду для запуска сервиса остатков:

```bash
npm run start-products
```

Сервис для сохранения истории будет запущен на порту 4000, а сервис для работы с магазинами,продкутами и остатками на порту 3333.

## Документация

- Postman: [Документация API](https://documenter.getpostman.com/view/29443735/2sAYBUCXmW)

## Эндпоинты

### Работа с товарами

- **Создание товара**

  - `POST http://localhost:3333/products`
    ```json
    {
      "PLU": "325128",
      "name": "test22"
    }
    ```

- **Получение товаров по фильтрам**
  - По имени:
    - `GET http://localhost:3333/products/show?NAME=test2`
  - По PLU:
    - `GET http://localhost:3333/products/show?PLU=325125`

### Работа с остатками

- **Создание остатка**

  - `POST http://localhost:3333/inventories`
    ```json
    {
      "PLU": "325128",
      "shop_id": "1",
      "quantity_on_shelf": 15,
      "quantity_in_order": 10
    }
    ```

- **Увеличение остатка**
  - `PUT http://localhost:3333/inventories`
    ```json
    {
      "PLU": "325128",
      "shop_id": 1,
      "quantity_on_shelf": 22,
      "quantity_in_order": 10
    }
    ```
- **Уменьшение остатка**
  - `PUT http://localhost:3333/inventories`
    ```json
    {
      "PLU": "325128",
      "shop_id": 1,
      "quantity_on_shelf": 22,
      "quantity_in_order": 10
    }
    ```
- **Получение остатков по фильтрам**
  - По PLU:
    - `GET http://localhost:3333/inventories?PLU=325125`
  - По shop_id:
    - `GET http://localhost:3333/inventories?SHOP_ID=1`
  - По количеству остатков на полке (с-по):
    - `GET http://localhost:3333/inventories?quantity_shelf_min=10&quantity_shelf_max=100`
  - По количеству остатков в заказе (с-по):
    - `GET http://localhost:3333/inventories?quantity_order_min=5&quantity_order_max=50`

### Работа с пользователями

- **Изменение флага `hasProblems` и подсчёт количества пользователей с значением `True`**
  - `PUT http://localhost:5000/user/update-problems`

### История действий

- **Получение истории по фильтрам**
  - По shop_id:
    - `GET http://localhost:4000/api/history-by-shop/1`
  - По PLU:
    - `GET http://localhost:4000/api/history-by-plu?plu=325125`
  - По дате (с-по):
    - `GET http://localhost:4000/api/history-by-date?start_date=2024-11-20&end_date=2024-11-25`
  - По действию:
    - `GET http://localhost:4000/api/history-by-action?action=update_inventory`
  - Общий роут (фильтрация через параметры `?` и `&`):
    - `GET http://localhost:4000/api/history`
