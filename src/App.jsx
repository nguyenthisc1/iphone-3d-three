import { useEffect, useRef } from "react";
import DisplaySection from "./components/display-section";
import Jumbotron from "./components/jumbotron";
import Nav from "./components/nav";
import SoundSection from "./components/sound-section";
import WebglViewer from "./components/webgl-viewer";
import Loader from "./components/loader";
import { ReactLenis } from '@studio-freight/react-lenis'

function App() {
  const contentRef = useRef()
  const webglViewerRef = useRef()
  const lenisRef = useRef()

  const handlePreview = () => {
    webglViewerRef.current.triggerPreview()
  }


  return (
    <ReactLenis root ref={lenisRef}>
      <div className="App">
        <Loader />
        <div ref={contentRef} id="content">
          <Nav />
          <Jumbotron />
          <SoundSection />
          <DisplaySection triggerPreview={handlePreview} />
        </div>
        <WebglViewer contentRef={contentRef} ref={webglViewerRef} />
      </div>
    </ReactLenis>
  );
}

export default App;
