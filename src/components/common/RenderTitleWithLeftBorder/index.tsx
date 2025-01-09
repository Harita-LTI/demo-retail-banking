import "./index.css";

interface RenderTitleWithLeftBorderProps {
  param: any;
}

function RenderTitleWithLeftBorder(fn:RenderTitleWithLeftBorderProps) {
  return(
    <>
      {
        fn.param ? <div className="renderTitle-main">
          <div className="border-left"></div>
          <div>{fn.param.title}</div>
        </div> : null
      }
    </>
  )
}

export default RenderTitleWithLeftBorder;