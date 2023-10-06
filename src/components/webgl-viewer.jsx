import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useCallback, forwardRef, useImperativeHandle, useState } from 'react'
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    addBasePlugins,
    mobileAndTabletCheck,
    CanvasSnipperPlugin,
    Triangle
} from "webgi";
gsap.registerPlugin(ScrollTrigger)
import { scrollAnimation } from '../libs/scroll-animation';

const WebglViewer = forwardRef((props, ref) => {
    const canvasRef = useRef(null)


    const [viewerRef, setViewerRef] = useState(null)
    const [positionRef, setpositionRef] = useState(null)
    const [targetRef, settargetRef] = useState(null)
    const [cameraRef, setcameraRef] = useState(null)
    const canvasContainerRef = useRef(null)

    const [previewMode, setPreivewMode] = useState(false)

    const isMobileOrTablet = mobileAndTabletCheck()
    const [isMobile, setIsMobile] = useState(isMobileOrTablet || false)

    useImperativeHandle(ref, () => ({
        triggerPreview() {
            setPreivewMode(true)
            props.contentRef.current.style.opacity = "0"
            canvasContainerRef.current.style.pointerEvents = "all"

            gsap.to(positionRef, {
                x: 13.04,
                y: -2.01,
                z: 2.29,
                duration: 2,
                onUpdate: () => {
                    viewerRef.setDirty()
                    cameraRef.positionTargetUpdated(true)
                }
            })

            gsap.to(targetRef, {
                x: 0.11, y: 0.0, z: 0.0, duration: 2
            })

            viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: true })
        }
    }))

    const memoizedScrollAnimation = useCallback((position, target, isMobile, onUpdate) => {
        if (position && target && onUpdate) {
            scrollAnimation(position, target, isMobile, onUpdate)
        }
    }, [])

    const setupViewer = useCallback(async () => {

        // Initialize the viewer
        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        })

        setViewerRef(viewer)


        // Add some plugins
        const manager = await viewer.addPlugin(AssetManagerPlugin)

        const camera = viewer.scene.activeCamera
        const position = camera.position
        const target = camera.target


        setcameraRef(camera)
        setpositionRef(position)
        settargetRef(target)

        // Add plugins individually.
        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)
        // and many more...

        // // or use this to add all main ones at once.
        // await addBasePlugins(viewer)

        // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
        // await viewer.addPlugin(CanvasSnipperPlugin)

        // This must be called once after all plugins are added.
        viewer.renderer.refreshPipeline()

        await manager.addFromPath('scene-black.glb')

        viewer.getPlugin(TonemapPlugin).config.clipBackground = true

        viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false })


        if (isMobile) {
            position.set(-16.7, 1.17, 11.7)
            target.set(0, 1.37, 0)
            props.contentRef.current.className = 'mobile-or-tablet'
        }


        window.scrollTo(0, 0)

        let needsUpdate = true

        const onUpdate = () => {
            needsUpdate = true
            viewer.setDirty()
        }


        viewer.addEventListener('preFrame', () => {
            if (needsUpdate) {
                camera.positionTargetUpdated(true)
                needsUpdate = false
            }
        })
        memoizedScrollAnimation(position, target, isMobile, onUpdate)
    }, [])

    useEffect(() => {
        setupViewer()
    }, [])

    const handleExitPreviewMode = useCallback(() => {
        setPreivewMode(false)
        props.contentRef.current.style.opacity = "1"
        canvasContainerRef.current.style.pointerEvents = "none"

        gsap.to(positionRef, {
            x: !isMobile ? 3.19 : 9.36,
            y: !isMobile ? 5.5 : 10.95,
            z: !isMobile ? -0.01 : 0.09,

            onUpdate: () => {
                viewerRef.setDirty()
                cameraRef.positionTargetUpdated(true)
            }
        })
        gsap.to(targetRef, {
            x: !isMobile ? -0.85 : -1.62,
            y: !isMobile ? 0.32 : 0.02,
            z: !isMobile ? 0.0 : -0.06,

        })
        viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: false })
    }, [canvasContainerRef, positionRef, targetRef, cameraRef, viewerRef])

    return (
        <div id='webgi-canvas-container' ref={canvasContainerRef}>
            <canvas id='webgi-canvas' ref={canvasRef}></canvas>
            {previewMode ? (
                <button className='button' onClick={handleExitPreviewMode}>Exit</button>
            ) : null}
        </div>
    )
})



export default WebglViewer