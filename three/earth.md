## 地球模型

![earth](./earth.gif)

```js
import { useEffect } from 'react'
import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Section1 = () => {
  useEffect(() => {
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/gltf/')
    loader.setDRACOLoader(dracoLoader)
    loader.load(
      '/earthnew.glb',
      (gltf) => {
        // 获取模型
        const earth = gltf.scene

        // 设置模型的位置和大小
        earth.position.set(0, 0, 0)
        earth.scale.set(1, 1, 1)

        // 创建场景
        const scene = new THREE.Scene()
        scene.add(earth)

        // 创建相机
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
        camera.position.z = 5

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.querySelector('.three')?.appendChild(renderer.domElement)

        // 渲染
        const animate = function () {
          requestAnimationFrame(animate)
          earth.rotation.y += 0.01
          renderer.render(scene, camera)
        }
        animate()
      },
      (xhr) => {
        console.log(`加载中... ${(xhr.loaded / xhr.total) * 100}%`)
      },
      (error) => {
        console.log('加载失败', error)
      }
    )
  }, [])

  return (
    <section>
      <div className="three"></div>
    </section>
  )
}

export default Section1
```
