import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={150}
    viewBox="0 0 400 150"
    backgroundColor="#ddd4d4"
    foregroundColor="#fcfcf7"
    {...props}
  >
    <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />     
    <rect x="25" y="45" rx="5" ry="5" width="220" height="10" />     
    <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />     
    <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
  </ContentLoader>
)

export default MyLoader

