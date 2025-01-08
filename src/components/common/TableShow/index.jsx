import "./index.css";

function TableShow({ param }) {

  return (
    <>
      <table className="table-main">
        <tbody>
          {
            param.map((element, i) => {
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
