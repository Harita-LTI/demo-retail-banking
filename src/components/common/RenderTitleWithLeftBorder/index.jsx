import "./index.css";

function RenderTitleWithLeftBorder({param}) {
  return(
    <>
      {
        param ? <div className="renderTitle-main">
          <div className="border-left"></div>
          <div>{param.title}</div>
        </div> : null
      }
    </>
  )
}

export default RenderTitleWithLeftBorder;