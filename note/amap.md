<!-- 上线后写文章 -->

高德提取坐标

https://lbs.amap.com/tools/picker

##

- [展示地图](https://lbs.amap.com/api/javascript-api-v2/tutorails/display-a-map)
- [添加点标记](https://lbs.amap.com/api/javascript-api-v2/tutorails/add-marker)
- [定位](https://lbs.amap.com/api/javascript-api-v2/guide/services/geolocation)
- [JS API 安全密钥使用](https://lbs.amap.com/api/javascript-api-v2/guide/abc/jscode)
- [地理编码与逆地理编码](https://lbs.amap.com/api/javascript-api-v2/guide/services/geocoder)
- [地理/逆地理编码 api](https://lbs.amap.com/api/webservice/guide/api/georegeo)

lat 是 Latitude 的简写，表示经度
lng 是 Longitude 的简写，表示纬度

```js
const filterUndefinedParams = (params: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined)
  )
}

const params = new URLSearchParams(
  filterUndefinedParams({
    storeType: 'SELL',
    provinceId,
    cityId,
    lng,
    lat
  })
)
```
