import { useEffect } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonTextarea, IonInput, IonButton, IonCard, IonIcon, IonItem, IonList } from '@ionic/react';
import { useParams } from 'react-router';
import './Message.css';
import { arrowBack, paperPlaneOutline } from 'ionicons/icons';
import { useState } from 'react';
import socket from './socket';

interface Mess {
  numberTicket: number,
  name: string,
  description: string,
  message: string,
  type: number,
  destination: number
}
interface Notification {
  numberTicket: number,
  name: string,
  description: string
}
interface Message {
  message: string,
  type: number,
  numberTicket: number
}
const random = (min: number, max: number) => {
  let rand = Math.random() * (max - min) + min;
  return Math.floor(rand);
}

const Page = () => {

  const { name } = useParams<{ name: string; }>();
  const [isMessagePage, setIsMessagePage] = useState(false);
  const [username, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [numberTicket, setnumberTicket] = useState(0);
  const [message, setMessage] = useState("")
  const [sentOrReceivedMess, setSentOrReceivedMess] = useState([] as Message[])

  useEffect(() => {
    const savedMessages = sessionStorage.getItem("message");
    if (savedMessages) {
      const parsedMessages: Message[] = JSON.parse(savedMessages);
      setSentOrReceivedMess(parsedMessages);
    }
  }, []);
  useEffect(() => {
    socket.on('message' + numberTicket, (data: Mess) => {
      const mess: Mess = {
        message: data.message,
        type: 2,
        description: description,
        name: username,
        numberTicket: numberTicket,
        destination: 0
      }
      var arr: Mess[] = [];
      if (sessionStorage.getItem("message")) {
        arr = JSON.parse(sessionStorage.getItem("message")!) as Mess[];
      }
      arr.push(mess)
      sessionStorage.setItem("message", JSON.stringify(arr));
      setSentOrReceivedMess(arr);
    });
    return () => {
      socket.off('message' + numberTicket);
    }
  }, [numberTicket, socket]);
  const sendMessages = () => {
    const mess: Message = {
      message: message,
      type: 1,
      numberTicket
    }
    var arr: Message[] = [];
    if (sessionStorage.getItem("message")) {
      arr = JSON.parse(sessionStorage.getItem("message")!) as Message[];
    }
    arr.push(mess)
    sessionStorage.setItem("message", JSON.stringify(arr));
    setSentOrReceivedMess(arr);
    let mes: Mess = {
      description: description,
      name: username,
      numberTicket: numberTicket,
      message: message,
      type: 2,
      destination: 0
    }
    setMessage("")
    socket.emit('message', mes);
  }
  const createTicket = () => {
    if (description !== "" && username != "") {
      setIsMessagePage(true); setnumberTicket(random(1, 100))
    }
  }
  useEffect(() => {
    const data: Notification = {
      name: username,
      numberTicket: numberTicket,
      description: description
    };
    if (numberTicket !== 0) {
      socket.emit('notification', data);
    }

  }, [numberTicket]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {(isMessagePage === false) &&
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>}
          {(isMessagePage === true) &&
            <IonButtons
              onClick={() => setIsMessagePage(false)}
              slot="start">
              <IonIcon
                aria-hidden="true"
                slot="start"
                ios={arrowBack}
                md={arrowBack} />
            </IonButtons>}
          {isMessagePage === false && <IonTitle style={{ color: '#0080FF' }}>Message</IonTitle>}
          {isMessagePage === true && <IonTitle style={{ color: '#0080FF' }}>TICKET NUMBER {numberTicket}</IonTitle>}
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ background: 'silver' }}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" style={{ color: '#0080FF' }}>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {(isMessagePage === false) && <IonCard className='box'>
          <IonInput
            onIonChange={(txt) => { setUserName(txt.target.value!.toString()) }}
            className='input'
            labelPlacement="floating"
            label='Enter your name'
            fill='solid'
            placeholder='Enter your name'>
          </IonInput>
          <br />
          <IonTextarea
            onIonChange={(txt) => { setDescription(txt.target.value!.toString()) }}
            className='input' label="Little description"
            labelPlacement="floating"
            fill="solid"
            placeholder="Little description">
          </IonTextarea>
          <br />
          <IonButton
            onClick={() => { createTicket() }}
            className='btn'
            expand='block'
            style={{ background: '#0080FF' }}>
            Create ticket
          </IonButton>
        </IonCard>}

        {(isMessagePage === true) &&
          <IonContent style={{ background: 'silver' }}>
            {(sentOrReceivedMess !== null &&
              <IonList style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
                {sentOrReceivedMess.map((mess, index) => (
                  < span key={index}>{mess.numberTicket === numberTicket && <IonItem
                    lines='none'
                    color={"#fff"}
                    className={mess.type === 1 ? 'yourMessage' : 'receivedMessage'}
                  >
                    {mess.message}
                  </IonItem>}</span>))}
              </IonList>)}
            <div className='card' style={{ backgroundColor: "silver", color: "#0080FF", padding: "20px", borderRadius: "10px", boxShadow: "0px 3px 6px #00000029" }}>
              <div className="input-container" style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
                <input
                value={message}
                  onChange={(e) => setMessage(e.target.value!.toString())}
                  placeholder='Send a Message...'
                  style={{ backgroundColor: "#fff", color: "#0080FF", borderRadius: "20px", padding: "10px", width: "100%", marginRight: "10px", border: "none" }}
                />
                <button
                  onClick={() => { sendMessages() }}
                  color={"rgb(89, 45, 177)"}
                  style={{ backgroundColor: "#fff", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0px 3px 6px #00000029", cursor: "pointer" }}>
                  <IonIcon
                    ios={paperPlaneOutline}
                    md={paperPlaneOutline}
                    style={{ color: "#0080FF" }}
                  />
                </button>
              </div>
            </div>
          </IonContent>}
      </IonContent>
    </IonPage>
  );
};

export default Page;