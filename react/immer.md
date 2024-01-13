## useImmer

`pnpm i use-immer`

```js
const tar = arr.map(({ name, id }) => ({
  label: name,
  value: id
}))

setOptions((draft) => {
  const option = draft.find((option) => option.value === val[0])
  option.children = tar
})
```
