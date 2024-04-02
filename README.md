# Grab.js

> Creating hold and drag effects for across devices

## Getting started

### Options

| Name                             | Default    | Description                                   |
| -------------------------------- | ---------- | --------------------------------------------- |
| `id`                             | `unique`   | id for clarifying each instance               |
| `grab`                           | `true`     | enable grab event                             |
| `type`                           | `all`      | support "mouse", "touch" or "all" for both    |
| ---                              | --         | --                                            |
| `events.mousedown:(self) => {}`  | `function` |                                               |
| `events.mousemove:(self) => {}`  | `function` |                                               |
| `events.mouseup:(self) => {}`    | `function` |                                               |
| ---                              | --         | --                                            |
| `events.touchstart:(self) => {}` | `function` |                                               |
| `events.touchmove:(self) => {}`  | `function` |                                               |
| `events.touchend:(self) => {}`   | `function` |                                               |
| ---                              | --         | --                                            |
| `events.down:(self) => {}`       | `function` | shared events, for both mouse or touch events |
| `events.move:(self) => {}`       | `function` |                                               |
| `events.up:(self) => {}`         | `function` |                                               |
| ---                              | --         | --                                            |
| `events.grab:(self) => {}`       | `function` | grab events                                   |

### Methods of Grab

| Name      | Parameter  | Description          |
| --------- | ---------- | -------------------- |
| `create`  | `object`   | create the instance  |
| `get`     | `id`       | get the instance     |
| `destroy` | `instance` | destroy the instance |

### Methods of instance

| Name      | Parameters         |                  |
| --------- | ------------------ | ---------------- |
| `on`      | `(name, callback)` | trigger events   |
| `destroy` | `()`               | destroy instance |

## Deployment

Run `./dev` in live server

```shell
npm run dev
```

Build files from `./src` to `./dist` for production

```shell
npm run prod
```

Build files from `./src` and `./dev` to `./dist` for production

```shell
npm run build
```
