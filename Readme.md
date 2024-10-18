#  Тестовое задание

Нужно сделать селект, который должен иметь следующий функционал:
- Множественный выбор + сохранение выбора
- Фильтрацию поиском
- Сортировку элементов  (DragAndDrop) и сохранение сортировки
- результаты сортировки и выбора должны хранится на сервере (База не нужна, достаточно хранить во время жизни приложения).
- При количестве элементов больше 20 он не должен загружать все сразу а подгружать их при скроле или поиске, то есть инфинити скролл и для уже выбранных полей и для результатов поиска.

Бэк: express

Фронт: не важно


## Project Setup Guide

Follow the steps below to set up the project for development:

### Step 1: Copy Environment File

Make a copy of the .env.example file and rename it to .env.

```shell
cp .env.example .env
```

### Step 2: Install Dependencies

To install all the necessary dependencies, run the following command:

```shell
npm install
```

### Step 3: Start Development Server

To start the development server, use the following command:

```shell
npm run dev
```
