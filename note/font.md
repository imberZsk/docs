## 衬线和非衬线

首先区别两类字体，无衬线字体（`Sans-serif`） 和 有衬线字体（`Serif`）

定义

- 无衬线字体（Sans-serif）：字符的笔画末端没有额外的装饰性线条。常见的无衬线字体包括 Arial、Helvetica 和 Verdana。
- 有衬线字体（Serif）：字符的笔画末端带有额外的小装饰线或笔画。常见的有衬线字体包括 Times New Roman、Georgia 和 Garamond。

视觉效果

- 无衬线字体：看起来更加简洁、现代，适合用于标题、标志和屏幕显示。
- 有衬线字体：给人一种传统、正式的感觉，常用于印刷品中的正文文本，因为衬线有助于引导阅读视线。

应用场景

- 无衬线字体：广泛应用于网页设计、移动应用和现代品牌标识中，尤其是在需要简洁明了传达信息的地方。
- 有衬线字体：常见于书籍、报纸等长篇幅的印刷材料中，因其被认为更有利于长时间阅读。

![字体图片](font.webp)

## tailwind 默认字体设置

`font-family: "ui-sans-serif", system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";`

这个字体设置是一个现代且全面的设置，确保在不同操作系统和浏览器上提供一致且美观的无衬线字体体验。

ui-sans-serif：

- 这是一个 CSS 系统字体关键字，表示系统默认的无衬线用户界面字体。
- 在苹果设备上，这通常是 San Francisco；在 Windows 上，这通常是 Segoe UI；在 Linux 上，这通常是 Noto Sans 或其他类似的字体。

system-ui：

- 另一个 CSS 系统字体关键字，表示系统的用户界面字体，通常与 ui-sans-serif 类似，但更广泛地涵盖了所有类型的用户界面元素。
- 这个关键字可以确保使用系统的默认字体，提高一致性。

sans-serif：

- 通用的无衬线字体族，作为回退选项，确保即使前面的字体不可用，也能有一个合理的默认无衬线字体。

Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji：

- 这些是用于显示彩色表情符号的字体。
- Apple Color Emoji：适用于 macOS 和 iOS 设备。
- Segoe UI Emoji 和 Segoe UI Symbol：适用于 Windows 设备。
- Noto Color Emoji：适用于 Android 和其他平台。

## next/font 字体优化

`https://nextjs.org/docs/app/building-your-application/optimizing/fonts`

```jsx
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  {children}
</body>
```
