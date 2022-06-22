import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../styles/activation.scss'
import axios from "axios";
import { useActivationMutation } from '../../reduxTool/query/authApi';
const { REACT_APP_BACKEND_URL } = process.env;


axios.defaults.withCredentials = true;

const Activate = () => {
  const navigate = useNavigate();
  const [timerOn, setTimerOn] = useState(true);
  const [seconds, setSeconds] = useState(120);
  const [code, setCode] = useState({
    first: "",
    second: "",
    third: "",
    forth: "",
    fivth: "",
  });
  const { first, second, third, fivth, forth } = code;

  useEffect(() => {
    if (seconds > 0 && timerOn) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      setTimerOn(false);
    }
  }, [seconds, timerOn]);
  /////////////////////////////////////////////////////////////////////////////////
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(parseInt(e.target.value))) {
      setCode((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
      if (e.target.name !== "fivth") {
        if (e.target.nextSibling) {
          const zz: any = e.target.nextSibling;
          zz.focus();
        }
      }
    } else {
      setCode((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };
/////////////////////////////////////////////////////////////////////
  const [activateUser,res] = useActivationMutation()
  const {isSuccess} = res
  // console.log('isSuccess',isSuccess);
  
  useEffect(()=>{
    if(isSuccess){
      navigate('/auth/login')
    }
  },[isSuccess,navigate])

   /////////////////////////////////////////////////////////////////////////////
   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stringCode = first + second + third + forth + fivth;
    const activationCode = parseInt(stringCode);
    await activateUser(activationCode);
  };

  //////////////////////////////////////////////////////////////////////////
  const resendLink = async () => {
    const res = await axios(`${REACT_APP_BACKEND_URL}/auth/resendcode`, {
      method: "GET",
    });
    if (res.status === 200) {
      setTimerOn(true);
      setSeconds(120);
    }
  };
  ///////////////////////////////////////////////////////////////////////////
  const cleanCode = () => {
    setCode({
      first: "",
      second: "",
      third: "",
      forth: "",
      fivth: "",
    });
  };
  return (
    <div className="container">
    <section className="activation">
      <div className="activation_box">
        <h1>Please Enter the confirmation code</h1>
        <form action="" onSubmit={onSubmit}>
          <div className="row1">
            <button onClick={cleanCode} className="clean">
              clean &#8594;
            </button>
            <input
              autoFocus
              required
              autoComplete="off"
              type="text"
              onChange={onChange}
              value={first}
              name="first"
              maxLength={1}
            />
            <input
              required
              autoComplete="off"
              type="text"
              onChange={onChange}
              value={second}
              name="second"
              maxLength={1}
            />
            <input
              required
              autoComplete="off"
              type="text"
              onChange={onChange}
              value={third}
              name="third"
              maxLength={1}
            />
            <input
              required
              autoComplete="off"
              type="text"
              onChange={onChange}
              value={forth}
              name="forth"
              maxLength={1}
            />
            <input
              required
              autoComplete="off"
              type="text"
              onChange={onChange}
              value={fivth}
              name="fivth"
              maxLength={1}
            />
          </div>
          <div className="row1">
            <input type="submit" value="send" />
            {timerOn ? (
              <>
                <p>
                  {" "}
                  <span>link sent &#10004;</span> {seconds}{" "}
                </p>
              </>
            ) : (
              <button type="button" onClick={resendLink}>
                resend link ?
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  </div>
  )
}

export default Activate