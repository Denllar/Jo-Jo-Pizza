import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader: React.FC = () => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 531"
    backgroundColor="#ffffff"
    foregroundColor="#dbdbdb"
  >
    <rect x="0" y="281" rx="3" ry="3" width="260" height="24" /> 
    <circle cx="130" cy="130" r="125" /> 
    <rect x="1" y="435" rx="5" ry="5" width="90" height="27" /> 
    <rect x="104" y="435" rx="17" ry="17" width="155" height="27" /> 
    <rect x="0" y="324" rx="10" ry="10" width="260" height="85" />
  </ContentLoader>
)

export default MyLoader