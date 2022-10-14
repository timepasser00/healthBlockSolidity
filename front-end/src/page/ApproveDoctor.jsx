import React from "react";
import { useState, useEffect } from "react";


const ApproveDoctor = () => {
  const [docCount, setDocCount] = useState(0);
  // const [cntArr,setcntArr]=useState([]);
  const [docId, setDocId] = useState("");
  const [rcnt, setrCnt] = useState(0);
    const [rId, setrId] = useState(0);
    const[pCnt,setPCnt]=useState(0);
    const [msg,setMsg] = useState("");
    const [rcntArr , setrcntArr] = useState([])
    const [flag , setFlag] = useState(false);
    const [account,setAccount]=useState("");// patient id
  let cntArr = [];
  let docArr=[];
  const handleSubmit = async (e) => {
e.preventDefault();
    const curr_account={docId,rId};

 const response = await fetch('http://localhost:3001/approveRefferedDoctor', {
          method: 'POST',
          body: JSON.stringify(curr_account),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const txt = await response.text();
        setMsg(txt);
        console.log(txt); 
        if (response.ok) {
          // setStatus();
          console.log("success");
         
        }

  };
  useEffect(() => {
    const getDocCount = async () => {
      try {
        const response = await fetch("http://localhost:3001/doctorCnt", {
          method: "POST",
        });
        const actualOp = await response.text();
        setDocCount(parseInt(actualOp.substring(1, actualOp.length - 1)));
      } catch (error) {
        console.log("some Error!!");
      }
    };
    getDocCount();

    const patientCnt = async () => {
      try {
        const response = await fetch("http://localhost:3001/patientCnt", {
          method: "POST",
        });

        const actualOp = await response.text();
        setPCnt(parseInt(actualOp.substring(1, actualOp.length - 1)));
      } catch (error) {
        console.log("some Error!!");
      }
    };
    patientCnt();
  }, [docCount,pCnt]);

  for (let i = 1; i <= docCount; i++) {
    docArr.push({ value: `d${i}`, label: `d${i}` });
  }
  for (let i = 1; i <= pCnt; i++) {
    cntArr.push({ value: `p${i}`, label: `p${i}` });
  }

  const recordCnt = async (e) => {
    e.preventDefault();
    try {
      const details = {account};
      // console.log(details);
      const response = await fetch("http://localhost:3001/getMedRecordCnt", {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json",
        }
      });

      const actualOp = await response.text();
      console.log(actualOp);
      setFlag(true);
      const rCntval =  parseInt(actualOp.substring(1, actualOp.length - 1));
      setrCnt(rCntval);
      //  console.log(len);
      console.log(flag);
      var tmpArr = []
      console.log(rCntval);
      for (let i = 1; i <= rCntval; i++) {
        tmpArr.push({ value: i, label: i });
      }
      setrcntArr(tmpArr);
      
      console.log(rcntArr);
    } catch (error) {
      console.log("some Error!!");
    }
  };
  return (
    <>
      <h1>Approve refered Doctor</h1>

      {
        <form className="create" onSubmit={recordCnt}>
          <label> Patient Id : </label>
          <select
            name="type"
            onChange={(e) => setAccount(e.target.value)}
            value={account}
          >
            <option value="">select patient id</option>
            {cntArr.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button>Submit</button>
        </form>
      }

      {flag&&
        <form className="create" onSubmit={handleSubmit}>
          <label> Doctor Id : </label>
          <select
            name="type"
            onChange={(e) => setDocId(e.target.value)}
            value={docId}
          >
            <option value="">select doctor id</option>
            {docArr.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <label> Record Id : </label>
          <select
            name="type"

            onChange={(e) => setrId(e.target.value)}
            value={rId}
          >
            <option value="">select record id</option>
            {rcntArr.map(({ value, label }) => (
              <option key = {value} value={value}>{label}</option>
            ))}
          </select>

         
          <button>Submit</button>
        </form>
      }
     
    </>
  );
};

export default ApproveDoctor;
