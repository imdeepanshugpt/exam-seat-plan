import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

function Seats({ data }) {
  const [row, setRow] = useState(data.row);
  const [col, setCol] = useState(data.col);
  const [start1, setStart1] = useState(data.start1);
  const [end1, setEnd1] = useState(data.end1);
  const [start2, setStart2] = useState(data.start2);
  const [end2, setEnd2] = useState(data.end2);

  useEffect(() => {
    setRow(data.row);
    setCol(data.col);
    setStart1(data.start1);
    setStart2(data.start2);
    setEnd1(data.end1);
    setEnd2(data.end2);
  }, [data]);

  const generateColumns = () => {
    let arrayValues = Array.from(Array(row), () => new Array(col).fill(0));

    let count1 = 0;
    let count2 = 0;
    for(let i = 0; i < row; i++){
        for(let j = 0; j< col ; j++){
            if(j % 2 === 0 ){
                arrayValues[i][j] = (start1 + count1 ) <= end1 ?  (start1 + count1++ ) : 0;
            } else {
                arrayValues[i][j] = (start2 + count2 ) <= end2 ?  (start2 + count2++ ) : 0;
            }
            
        }
    }

    return (
      <>
        {Array.from({ length: col }).map((_, index1) => (
          <tr>
            <td>{index1 + 1}</td>
            {Array.from({ length: row }).map((_, index) => (
              <td key={index}>
                {arrayValues[index][index1] > 0 ? arrayValues[index][index1] : '_'}
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          {Array.from({ length: row }).map((_, index) => (
            <th key={index}>Students Roll No</th>
          ))}
        </tr>
      </thead>
      <tbody>{generateColumns()}</tbody>
    </Table>
  );
}

export default Seats;
