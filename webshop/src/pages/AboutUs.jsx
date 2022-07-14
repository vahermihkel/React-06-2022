import { useRef } from "react";

function AboutUs() {
  const nameRef = useRef();
  const starsRef = useRef();
  const messageRef = useRef();

  const sendEmail = () => {
    window.Email.send({
      Host : "smtp.elasticemail.com",
      Username : "vahermihkel@gmail.com",
      Password : "35E77F060116876AC8ECDEA3E765295C96E7",
      To : 'vahermihkel@gmail.com', // kui saadan tagasisidet, siis saadan endale / tellimust tehakse, siis kliendi e-mail
      From : "vahermihkel@gmail.com", // millega sa konto tegid
      Subject : "This is the subject",
      Body : `Sulle kirjutas ${nameRef.current.value}, ta andis sulle ${starsRef.current.value} tärni. Sõnum:
              ${messageRef.current.value}`
  }).then(
    message => alert(message)
  );
  }

  return ( 
    <div>
        <label>Nimi</label> <br />
        <input ref={nameRef} type="text" /> <br />
        <label>Tärne</label> <br />
        <input ref={starsRef} min="1" max="5" type="range" /> <br />
        <label>Sõnum</label> <br />
        <input ref={messageRef} type="text" /> <br />
        <button onClick={sendEmail}>Saada e-mail</button>
    </div> 
    );
}

export default AboutUs;