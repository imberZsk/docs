## gsap 和 gsap/gsap-core

![alt text](gsap-core-1.png)

![alt text](gsap-core-2.png)

## gsap

umd

```js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, RoughEase)
```

esm

```js
import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
```
