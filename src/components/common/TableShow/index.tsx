import "./index.css";

interface TableShowProps {
  param: any;
}

function TableShow(fn:TableShowProps) {

  return (
    <>
      <table className="table-main">
        <tbody>
          {
            fn.param.map((element:any, i:number) => {
              return <tr key={i} className="row-container">
                <td className="text">{element.first}</td>
                {
                  element.second ? <td className="text">{element.second}</td> : null
                }
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default TableShow;
