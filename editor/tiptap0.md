## 扩展现有扩展

```js
// 1. Import the extension
import BulletList from '@tiptap/extension-bullet-list'

// 2. Overwrite the keyboard shortcuts
const CustomBulletList = BulletList.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-l': () => this.editor.commands.toggleBulletList()
    }
  }
})

// 3. Add the custom extension to your editor
new Editor({
  extensions: [
    CustomBulletList()
    // …
  ]
})
```
