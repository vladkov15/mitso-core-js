## Задание
Реализовать функции по разным темам Core JS. Есть десять модулей с разными задачами. Каждый модуль состоит из задач по заданной теме:

- [Strings](https://github.com/hardzeichyksiarhei/mitso-core-js/blob/main/src/01-strings-tasks.js)
- [Numbers](https://github.com/hardzeichyksiarhei/mitso-core-js/blob/main/src/02-numbers-tasks.js)
- [Arrays](https://github.com/hardzeichyksiarhei/mitso-core-js/blob/main/src/03-arrays-tasks.js)
- [Date](https://github.com/hardzeichyksiarhei/mitso-core-js/blob/main/src/04-date-tasks.js)
- [Regexp](https://github.com/hardzeichyksiarhei/mitso-core-js/blob/main/src/05-regex-tasks.js)
- [Objects](https://github.com/hardzeichyksiarhei/mitso-core-js/blob/main/src/06-objects-tasks.js)
- [Promises](https://github.com/hardzeichyksiarhei/mitso-core-js/blob/main/src/07-promises-tasks.js)
- [Conditions and Loops](https://github.com/hardzeichyksiarhei/mitso-core-js/blob/main/src/08-conditions-n-loops-tasks.js)
- [Functions and Closures](https://github.com/hardzeichyksiarhei/mitso-core-js/blob/main/src/09-functions-n-closures-tasks.js)
- [OOP](https://github.com/hardzeichyksiarhei/mitso-core-js/blob/main/src/10-opp-tasks.js)

Настоятельно рекомендуется активное использование **[документации](https://developer.mozilla.org/en-US/)**!

## Подготовка и тестирование

1. Установите [Node.js](https://nodejs.org/en/)

2. Создайте fork репозитория: https://github.com/hardzeichyksiarhei/mitso-core-js

3. Склонировать только что созданный репозиторий:<br>
   `git clone https://github.com/<%your_github_username%>/mitso-core-js`

4. Переходим в папку mitso-core-js: `cd mitso-core-js`

5. Чтобы установить все зависимости, используйте: `npm i` или `npm install`

6. Каждая задача обычно представляет собой обычную функцию:
    ```js
    /**
    * Returns the result of concatenation of two strings.
    *
    * @param {string} value1
    * @param {string} value2
    * @return {string}
    *
    * @example
    *   'aa', 'bb' => 'aabb'
    *   'aa',''    => 'aa'
    *   '',  'bb'  => 'bb'
    */
    function concatenateStrings(value1, value2) {
        throw new Error('Not implemented');
    }
    ```
    Прочтите описание задачи в комментарии над функцией. Вы можете увидеть подготовленные тесты, если не понимаете условие задачи.

7. Напишите свой код в src/*.js.

   Удалите строку с генерацией ошибки из тела функции:
   ```js
   throw new Error('Not implemented'); 
   ```
   
   Реализуйте функцию любым способом и проверьте свое решение, запустив тесты до тех пор, пока не пройденный тест не будет пройден (зеленый).

8. Запустите `npm test` в командной строке. Если все в порядке и задача решена, то:
   - добавить содержимое измененного файла в index:
   <br>`git add .` (все измененные файлы попадут в index) или `git add ./src/<название файда>.js`
   - записать изменения в локальный репозиторий:
   <br>`git commit -m "текст коммита"`, например `git commit -m "feat: concatenateStrings completed"`
   - выгрузить новые коммиты из локальной ветки на удаленный репозиторий:
   <br>`git push origin main`

    **!!! ВАЖНО !!!**
    - Изменение тестов приравнивается к 0 баллов!
    - Коммит === решение **ОДНОЙ** задачи.
