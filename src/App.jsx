import { useRef } from "react";
import DisplaySection from "./components/display-section";
import Jumbotron from "./components/jumbotron";
import Nav from "./components/nav";
import SoundSection from "./components/sound-section";
import WebglViewer from "./components/webgl-viewer";
import Loader from "./components/loader";

function App() {
  const contentRef = useRef()
  const webglViewerRef = useRef()

  const handlePreview = () => {
    webglViewerRef.current.triggerPreview()
  }
  return (
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
  );
}

export default App;
