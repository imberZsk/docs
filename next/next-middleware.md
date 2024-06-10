## middleware

- 直接写 `NextResponse.redirect('/mobile')` 会报错的（如下图），必须是绝对路径 `NextResponse.redirect(url.origin + '/mobile')`
- 中间件因为是 `edge runtime` 无法直接访问数据库
